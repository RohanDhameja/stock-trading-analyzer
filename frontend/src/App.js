import React, { useState } from 'react';
import './App.css';
import StockForm from './components/StockForm';
import Results from './components/Results';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (formData) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Use environment variable or construct API URL based on current host
      let API_URL = process.env.REACT_APP_API_URL;
      
      if (!API_URL) {
        // If accessing from network (not localhost), use the same host for API
        const hostname = window.location.hostname;
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
          API_URL = 'http://localhost:5001';
        } else {
          // Mobile/network access - use the same IP as frontend
          API_URL = `http://${hostname}:5001`;
        }
      }
      
      const response = await axios.post(`${API_URL}/api/analyze`, formData);
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while analyzing the stock');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>📈 Stock Trading Strategy Analyzer</h1>
          <p>Analyze stocks with dynamic buy/sell levels based on historical data</p>
        </header>

        <StockForm onAnalyze={handleAnalyze} loading={loading} onReset={handleReset} hasResults={!!results} />

        {error && (
          <div className="error-message">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Analyzing stock data...</p>
          </div>
        )}

        {results && !loading && <Results data={results} />}
      </div>
    </div>
  );
}

export default App;

