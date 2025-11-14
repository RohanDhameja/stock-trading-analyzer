import React, { useState } from 'react';
import './StockForm.css';

function StockForm({ onAnalyze, loading, onReset, hasResults }) {
  const [symbol, setSymbol] = useState('');
  const [budget, setBudget] = useState('10000');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symbol.trim()) {
      onAnalyze({
        symbol: symbol.trim().toUpperCase(),
        budget: parseFloat(budget)
      });
    }
  };

  const handleNewAnalysis = () => {
    setSymbol('');
    setBudget('10000');
    onReset();
  };

  return (
    <div className="stock-form-container">
      <form onSubmit={handleSubmit} className="stock-form">
        <div className="form-group">
          <label htmlFor="symbol">Stock Symbol</label>
          <input
            type="text"
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="e.g., AAPL, TSLA, MSFT"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="budget">Investment Budget ($)</label>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="10000"
            min="100"
            step="100"
            required
            disabled={loading}
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze Stock'}
          </button>
          
          {hasResults && !loading && (
            <button type="button" className="btn btn-secondary" onClick={handleNewAnalysis}>
              New Analysis
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default StockForm;

