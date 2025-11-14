from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route('/api/analyze', methods=['POST'])
def analyze_stock():
    try:
        data_input = request.json
        symbol = data_input.get('symbol', '').upper()
        current_price = data_input.get('currentPrice')
        budget = float(data_input.get('budget', 10000))
        
        if not symbol:
            return jsonify({'error': 'Stock symbol is required'}), 400
        
        # Date range
        end_date = datetime.today()
        start_date = end_date - timedelta(days=10*366)
        
        # Download data with better error handling
        try:
            stock_data = yf.download(
                symbol, 
                start=start_date, 
                end=end_date, 
                interval="1d",
                progress=False,
                auto_adjust=True
            )
        except Exception as e:
            return jsonify({'error': f'Failed to fetch data for {symbol}: {str(e)}'}), 400
        
        if stock_data is None or stock_data.empty:
            return jsonify({'error': f'No data found for symbol {symbol}. Please verify the symbol is correct and try again.'}), 404
        
        # Flatten columns if needed
        if isinstance(stock_data.columns, pd.MultiIndex):
            stock_data.columns = [col[0] if isinstance(col, tuple) else col for col in stock_data.columns]
        
        # Calculate moving average and percent changes
        stock_data["MA50"] = stock_data["Close"].rolling(window=50).mean()
        stock_data["PctChange_Close_vs_MA50"] = ((stock_data["Close"] - stock_data["MA50"]) / stock_data["MA50"]) * 100
        
        # Summary stats
        avg_positive = stock_data.loc[stock_data["PctChange_Close_vs_MA50"] > 0, "PctChange_Close_vs_MA50"].mean()
        avg_negative = stock_data.loc[stock_data["PctChange_Close_vs_MA50"] < 0, "PctChange_Close_vs_MA50"].mean()
        min_pct_change = stock_data["PctChange_Close_vs_MA50"].min(skipna=True)
        max_pct_change = stock_data["PctChange_Close_vs_MA50"].max(skipna=True)
        
        # Rolling averages
        stock_data["Avg_Positive_ToDate"] = (
            stock_data["PctChange_Close_vs_MA50"]
            .where(stock_data["PctChange_Close_vs_MA50"] > 0)
            .expanding()
            .mean()
        )
        
        stock_data["Avg_Negative_ToDate"] = (
            stock_data["PctChange_Close_vs_MA50"]
            .where(stock_data["PctChange_Close_vs_MA50"] < 0)
            .expanding()
            .mean()
        )
        
        stock_data["Min_PctChange_ToDate"] = (
            stock_data["PctChange_Close_vs_MA50"]
            .expanding()
            .min()
        )
        
        stock_data["Max_PctChange_ToDate"] = (
            stock_data["PctChange_Close_vs_MA50"]
            .expanding()
            .max()
        )
        
        # Calculate levels
        stock_data["second_highest_level"] = (stock_data["Max_PctChange_ToDate"] - stock_data["Avg_Positive_ToDate"])/2 + stock_data["Avg_Positive_ToDate"]
        stock_data["second_lowest_level"] = (stock_data["Min_PctChange_ToDate"] - stock_data["Avg_Negative_ToDate"])/2 + stock_data["Avg_Negative_ToDate"]
        stock_data["Zone0above0"] = (stock_data["Avg_Positive_ToDate"]/2)
        stock_data["Zone0below0"] = (stock_data["Avg_Negative_ToDate"]/2)
        
        conditions = [
            (stock_data["PctChange_Close_vs_MA50"] >= stock_data["Max_PctChange_ToDate"]),
            (stock_data["PctChange_Close_vs_MA50"] >= stock_data["second_highest_level"]) & (stock_data["PctChange_Close_vs_MA50"] < stock_data["Max_PctChange_ToDate"]),
            (stock_data["PctChange_Close_vs_MA50"] >= stock_data["Avg_Positive_ToDate"]) & (stock_data["PctChange_Close_vs_MA50"] < stock_data["second_highest_level"]),
            (stock_data["PctChange_Close_vs_MA50"] >= stock_data["Zone0above0"]) & (stock_data["PctChange_Close_vs_MA50"] < stock_data["Avg_Positive_ToDate"]),
            (stock_data["PctChange_Close_vs_MA50"] > stock_data["Zone0below0"]) & (stock_data["PctChange_Close_vs_MA50"] < stock_data["Zone0above0"]),
            (stock_data["PctChange_Close_vs_MA50"] <= stock_data["Zone0below0"]) & (stock_data["PctChange_Close_vs_MA50"] > stock_data["Avg_Negative_ToDate"]),
            (stock_data["PctChange_Close_vs_MA50"] <= stock_data["Avg_Negative_ToDate"]) & (stock_data["PctChange_Close_vs_MA50"] > stock_data["second_lowest_level"]),
            (stock_data["PctChange_Close_vs_MA50"] <= stock_data["second_lowest_level"]) & (stock_data["PctChange_Close_vs_MA50"] > stock_data["Min_PctChange_ToDate"]),
            (stock_data["PctChange_Close_vs_MA50"] <= stock_data["Min_PctChange_ToDate"])
        ]
        
        choices = [-4, -3, -2, -1, 0, 1, 2, 3, 4]
        stock_data["Levels"] = np.select(conditions, choices, default=0)
        
        # Buy/Sell parameters
        sell_1 = 0.10
        sell_2 = 0.15
        sell_3 = 0.25
        sell_4 = 0.40
        
        buy_1 = 0.25 * budget
        buy_2 = 0.50 * budget
        buy_3 = 0.75 * budget
        buy_4 = budget
        
        # Determine current recommendation
        last_pct_change = stock_data["PctChange_Close_vs_MA50"].iloc[-1]
        last_level = stock_data["Levels"].iloc[-1]
        
        recommendation = ""
        action_type = ""
        action_amount = 0
        
        if last_level == -4:
            recommendation = "Level -4: Sell 40% of holdings"
            action_type = "sell"
            action_amount = 40
        elif last_level == -3:
            recommendation = "Level -3: Sell 25% of holdings"
            action_type = "sell"
            action_amount = 25
        elif last_level == -2:
            recommendation = "Level -2: Sell 15% of holdings"
            action_type = "sell"
            action_amount = 15
        elif last_level == -1:
            recommendation = "Level -1: Sell 10% of holdings"
            action_type = "sell"
            action_amount = 10
        elif last_level == 0:
            recommendation = "Level 0: Hold - Do nothing"
            action_type = "hold"
            action_amount = 0
        elif last_level == 1:
            recommendation = f"Level 1: Buy with 25% of budget (${buy_1:,.2f})"
            action_type = "buy"
            action_amount = 25
        elif last_level == 2:
            recommendation = f"Level 2: Buy with 50% of budget (${buy_2:,.2f})"
            action_type = "buy"
            action_amount = 50
        elif last_level == 3:
            recommendation = f"Level 3: Buy with 75% of budget (${buy_3:,.2f})"
            action_type = "buy"
            action_amount = 75
        elif last_level == 4:
            recommendation = f"Level 4: Buy with 100% of budget (${buy_4:,.2f})"
            action_type = "buy"
            action_amount = 100
        
        # Calculate portfolio simulation
        stock_data.loc[stock_data['Levels'] == 0, 'Money to Spend'] = budget * 0
        stock_data.loc[stock_data['Levels'] == 1, 'Money to Spend'] = buy_1
        stock_data.loc[stock_data['Levels'] == 2, 'Money to Spend'] = buy_2
        stock_data.loc[stock_data['Levels'] == 3, 'Money to Spend'] = buy_3
        stock_data.loc[stock_data['Levels'] == 4, 'Money to Spend'] = buy_4
        
        stock_data['Shares Bought Daily'] = stock_data['Money to Spend']/stock_data['Close']
        stock_data['Accumulative Shares'] = stock_data['Shares Bought Daily'].shift(1).rolling(window=len(stock_data.index), min_periods=0).sum()
        
        stock_data = stock_data.reset_index(drop=True)
        
        for i in range(len(stock_data)):
            stock_data.loc[stock_data['Levels'] == -1, 'Shares Bought Daily'] = -sell_1 * stock_data["Accumulative Shares"]
            stock_data.loc[stock_data['Levels'] == -2, 'Shares Bought Daily'] = -sell_2 * stock_data["Accumulative Shares"]
            stock_data.loc[stock_data['Levels'] == -3, 'Shares Bought Daily'] = -sell_3 * stock_data["Accumulative Shares"]
            stock_data.loc[stock_data['Levels'] == -4, 'Shares Bought Daily'] = -sell_4 * stock_data["Accumulative Shares"]
            stock_data['Money to Spend'] = stock_data['Shares Bought Daily'] * stock_data['Close']
            stock_data['Accumulative Shares'] = stock_data['Shares Bought Daily'].shift(1).rolling(window=len(stock_data.index), min_periods=0).sum()
        
        # Calculate final metrics
        shares_remaining = stock_data["Accumulative Shares"].iloc[-1]
        money_put_in = stock_data.loc[stock_data["Money to Spend"] > 0, "Money to Spend"].sum()
        money_from_selling = -1 * stock_data.loc[stock_data["Money to Spend"] < 0, "Money to Spend"].sum()
        net_gains = (-1 * stock_data["Money to Spend"].sum()) + (shares_remaining * stock_data["Close"].iloc[-1])
        percent_made = (net_gains/money_put_in)*100 if money_put_in > 0 else 0
        
        # Prepare chart data (last 365 days for better visualization)
        recent_data = stock_data.tail(365).reset_index(drop=True)
        chart_data = []
        
        for idx, row in recent_data.iterrows():
            if pd.notna(row.get('Close')) and pd.notna(row.get('MA50')):
                chart_data.append({
                    'index': int(idx),
                    'close': float(row['Close']),
                    'ma50': float(row['MA50']) if pd.notna(row['MA50']) else None,
                    'pctChange': float(row['PctChange_Close_vs_MA50']) if pd.notna(row['PctChange_Close_vs_MA50']) else None,
                    'level': int(row['Levels']) if pd.notna(row['Levels']) else 0
                })
        
        response = {
            'symbol': symbol,
            'currentPrice': float(stock_data["Close"].iloc[-1]),
            'ma50': float(stock_data["MA50"].iloc[-1]) if pd.notna(stock_data["MA50"].iloc[-1]) else None,
            'pctChange': float(last_pct_change) if pd.notna(last_pct_change) else None,
            'recommendation': recommendation,
            'actionType': action_type,
            'actionAmount': action_amount,
            'level': int(last_level),
            'statistics': {
                'avgPositive': float(avg_positive) if pd.notna(avg_positive) else 0,
                'avgNegative': float(avg_negative) if pd.notna(avg_negative) else 0,
                'minPctChange': float(min_pct_change) if pd.notna(min_pct_change) else 0,
                'maxPctChange': float(max_pct_change) if pd.notna(max_pct_change) else 0
            },
            'portfolio': {
                'sharesRemaining': float(shares_remaining),
                'moneyInvested': float(money_put_in),
                'moneyFromSelling': float(money_from_selling),
                'netGains': float(net_gains),
                'percentMade': float(percent_made)
            },
            'chartData': chart_data
        }
        
        return jsonify(response)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True, port=5001)

