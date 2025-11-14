#!/bin/bash

# Start the Stock Trading Strategy Analyzer

echo "🚀 Starting Stock Trading Strategy Analyzer..."
echo ""

# Start backend
echo "📊 Starting Flask Backend..."
cd backend
source venv/bin/activate
python3 app.py &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start frontend
echo "🎨 Starting React Frontend..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Application started successfully!"
echo ""
echo "Backend running on:  http://localhost:5000"
echo "Frontend running on: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for user interrupt
wait

