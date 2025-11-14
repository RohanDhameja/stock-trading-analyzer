# 📈 Stock Trading Strategy Analyzer

A modern web application that analyzes stock trading strategies using dynamic buy/sell levels based on historical data and moving averages.

## Features

- **Stock Analysis**: Analyzes 10 years of historical stock data
- **Dynamic Trading Levels**: Calculates 9 levels (-4 to +4) based on price deviation from 50-day moving average
- **Portfolio Simulation**: Simulates buy/sell strategy with customizable budget
- **Beautiful Visualizations**: Interactive charts showing price history and trading signals
- **Performance Metrics**: Displays ROI, net gains, and detailed portfolio statistics

## How It Works

The application uses a sophisticated algorithm that:

1. Downloads 10 years of historical stock data
2. Calculates 50-day moving average (MA50)
3. Computes percentage deviation from MA50
4. Assigns trading levels based on historical extremes:
   - **Level 4 (Buy 100%)**: Extreme dip opportunity
   - **Level 3 (Buy 75%)**: Strong buying opportunity
   - **Level 2 (Buy 50%)**: Moderate buying opportunity
   - **Level 1 (Buy 25%)**: Slight buying opportunity
   - **Level 0 (Hold)**: Neutral zone
   - **Level -1 (Sell 10%)**: Slight profit-taking
   - **Level -2 (Sell 15%)**: Moderate profit-taking
   - **Level -3 (Sell 25%)**: Strong profit-taking
   - **Level -4 (Sell 40%)**: Extreme profit-taking

## Tech Stack

### Backend
- **Flask**: Python web framework
- **yfinance**: Real-time stock data from Yahoo Finance
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computations

### Frontend
- **React**: Modern UI library
- **Recharts**: Interactive data visualizations
- **Axios**: HTTP client for API requests
- **CSS3**: Modern styling with gradients and animations

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Flask server:
```bash
python app.py
```

The backend will start on `http://localhost:5001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will open automatically at `http://localhost:3000`

## Usage

1. **Enter Stock Symbol**: Type a valid stock ticker (e.g., AAPL, TSLA, MSFT)
2. **Set Budget**: Enter your investment budget (default: $10,000)
3. **Click Analyze**: The app will fetch data and analyze the stock
4. **View Results**: 
   - Current trading recommendation
   - Historical statistics
   - Portfolio performance simulation
   - Interactive price chart
   - Trading level guide

## Example Stocks to Try

- **AAPL** - Apple Inc.
- **MSFT** - Microsoft Corporation
- **TSLA** - Tesla, Inc.
- **GOOGL** - Alphabet Inc.
- **AMZN** - Amazon.com, Inc.
- **NVDA** - NVIDIA Corporation
- **SPY** - S&P 500 ETF
- **QQQ** - NASDAQ-100 ETF

## API Endpoints

### POST `/api/analyze`

Analyzes a stock and returns trading recommendations.

**Request Body:**
```json
{
  "symbol": "AAPL",
  "budget": 10000
}
```

**Response:**
```json
{
  "symbol": "AAPL",
  "currentPrice": 175.43,
  "ma50": 172.15,
  "pctChange": 1.90,
  "recommendation": "Level -1: Sell 10% of holdings",
  "actionType": "sell",
  "actionAmount": 10,
  "level": -1,
  "statistics": { ... },
  "portfolio": { ... },
  "chartData": [ ... ]
}
```

### GET `/api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

## Development

### Project Structure

```
ETF-UI/
├── backend/
│   ├── app.py              # Flask application
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── StockForm.js       # Input form
│   │   │   ├── StockForm.css
│   │   │   ├── Results.js         # Results display
│   │   │   ├── Results.css
│   │   │   ├── StockChart.js      # Chart component
│   │   │   └── StockChart.css
│   │   ├── App.js           # Main app component
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json         # Node dependencies
└── README.md
```

## Notes

- The application analyzes 10 years of historical data (3,650 days)
- The 50-day moving average requires at least 50 days of data
- Trading levels are dynamically calculated based on historical extremes
- Portfolio simulation assumes perfect execution at close prices
- Real trading involves fees, slippage, and other factors not modeled here

## Disclaimer

This tool is for educational and informational purposes only. It does not constitute financial advice. Always do your own research and consult with a financial advisor before making investment decisions.

## License

MIT License - Feel free to use and modify as needed.

