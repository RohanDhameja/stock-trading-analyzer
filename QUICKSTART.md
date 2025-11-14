# 🚀 Quick Start Guide

## ✅ Your Application is Running!

### Access the Application
- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:5001

### How to Use

1. **Open your browser** and go to `http://localhost:3000`

2. **Enter a stock symbol** (e.g., AAPL, TSLA, MSFT, SPY)

3. **Set your budget** (default is $10,000)

4. **Click "Analyze Stock"** and wait for results

5. **View the results**:
   - Current trading recommendation (Buy/Sell/Hold)
   - Price charts with 50-day moving average
   - Portfolio performance metrics
   - Historical statistics

## 🛑 Stopping the Servers

To stop both servers, find the terminal windows where they're running and press `Ctrl+C`.

Or use this command:
```bash
lsof -ti:5001,3000 | xargs kill
```

## 🔄 Restarting the Application

### Option 1: Using the startup script
```bash
./start.sh
```

### Option 2: Manual startup

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
python3 app.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## 📝 Example Stocks to Try

- **AAPL** - Apple Inc.
- **MSFT** - Microsoft Corporation
- **TSLA** - Tesla, Inc.
- **GOOGL** - Alphabet Inc.
- **AMZN** - Amazon.com
- **NVDA** - NVIDIA Corporation
- **SPY** - S&P 500 ETF
- **QQQ** - NASDAQ-100 ETF

## 🎯 What the Levels Mean

- **Level 4**: Extreme dip - Buy with 100% of budget
- **Level 3**: Strong dip - Buy with 75% of budget
- **Level 2**: Moderate dip - Buy with 50% of budget
- **Level 1**: Slight dip - Buy with 25% of budget
- **Level 0**: Neutral - Hold
- **Level -1**: Slight peak - Sell 10% of holdings
- **Level -2**: Moderate peak - Sell 15% of holdings
- **Level -3**: Strong peak - Sell 25% of holdings
- **Level -4**: Extreme peak - Sell 40% of holdings

## ⚠️ Troubleshooting

### Port already in use error
```bash
# Kill processes on ports 5001 and 3000
lsof -ti:5001,3000 | xargs kill
```

### macOS AirPlay Receiver using port 5000
The backend uses port 5001 to avoid conflicts with macOS AirPlay Receiver which uses port 5000.

### Backend not responding
```bash
cd backend
source venv/bin/activate
python3 app.py
```

### Frontend not loading
```bash
cd frontend
npm start
```

### Missing dependencies
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

## 📚 More Information

See `README.md` for detailed documentation.

---

**Note**: This is for educational purposes only and does not constitute financial advice.

