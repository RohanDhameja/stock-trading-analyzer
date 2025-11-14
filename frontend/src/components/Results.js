import React from 'react';
import './Results.css';
import StockChart from './StockChart';

function Results({ data }) {
  const getActionClass = () => {
    if (data.actionType === 'buy') return 'action-buy';
    if (data.actionType === 'sell') return 'action-sell';
    return 'action-hold';
  };

  const getActionIcon = () => {
    if (data.actionType === 'buy') return '📈';
    if (data.actionType === 'sell') return '📉';
    return '⏸️';
  };

  const getLevelColor = (level) => {
    if (level >= 3) return '#d32f2f';
    if (level >= 1) return '#f57c00';
    if (level === 0) return '#757575';
    if (level >= -2) return '#388e3c';
    return '#1976d2';
  };

  return (
    <div className="results-container">
      {/* Recommendation Card */}
      <div className={`recommendation-card ${getActionClass()}`}>
        <div className="recommendation-icon">{getActionIcon()}</div>
        <div className="recommendation-content">
          <h2>{data.symbol}</h2>
          <div className="current-price">
            <span className="label">Current Price:</span>
            <span className="value">${data.currentPrice?.toFixed(2)}</span>
          </div>
          <div className="recommendation-text">
            <h3>{data.recommendation}</h3>
            <div className="level-badge" style={{ backgroundColor: getLevelColor(data.level) }}>
              Level {data.level}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-icon">📊</span>
            <h3>Current Analysis</h3>
          </div>
          <div className="stat-row">
            <span>50-Day MA</span>
            <strong>${data.ma50?.toFixed(2)}</strong>
          </div>
          <div className="stat-row">
            <span>% vs MA50</span>
            <strong className={data.pctChange >= 0 ? 'positive' : 'negative'}>
              {data.pctChange?.toFixed(2)}%
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-icon">📈</span>
            <h3>Historical Stats</h3>
          </div>
          <div className="stat-row">
            <span>Avg Positive Change</span>
            <strong className="positive">{data.statistics.avgPositive.toFixed(2)}%</strong>
          </div>
          <div className="stat-row">
            <span>Avg Negative Change</span>
            <strong className="negative">{data.statistics.avgNegative.toFixed(2)}%</strong>
          </div>
          <div className="stat-row">
            <span>Min Change</span>
            <strong>{data.statistics.minPctChange.toFixed(2)}%</strong>
          </div>
          <div className="stat-row">
            <span>Max Change</span>
            <strong>{data.statistics.maxPctChange.toFixed(2)}%</strong>
          </div>
        </div>

        <div className="stat-card portfolio-card">
          <div className="stat-header">
            <span className="stat-icon">💰</span>
            <h3>Portfolio Performance</h3>
          </div>
          <div className="stat-row">
            <span>Money Invested</span>
            <strong>${data.portfolio.moneyInvested.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </div>
          <div className="stat-row">
            <span>Money from Selling</span>
            <strong>${data.portfolio.moneyFromSelling.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </div>
          <div className="stat-row">
            <span>Shares Remaining</span>
            <strong>{data.portfolio.sharesRemaining.toFixed(2)}</strong>
          </div>
          <div className="stat-row highlight">
            <span>Net Gains</span>
            <strong className={data.portfolio.netGains >= 0 ? 'positive' : 'negative'}>
              ${data.portfolio.netGains.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </strong>
          </div>
          <div className="stat-row highlight">
            <span>Return</span>
            <strong className={data.portfolio.percentMade >= 0 ? 'positive' : 'negative'}>
              {data.portfolio.percentMade.toFixed(2)}%
            </strong>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-container">
        <h3>Price History & Trading Levels (Last 365 Days)</h3>
        <StockChart data={data.chartData} symbol={data.symbol} />
      </div>

      {/* Level Legend */}
      <div className="level-legend">
        <h3>Trading Level Guide</h3>
        <div className="legend-grid">
          <div className="legend-item">
            <span className="legend-badge" style={{ backgroundColor: '#d32f2f' }}>4</span>
            <span>Extreme Dip - Buy 100%</span>
          </div>
          <div className="legend-item">
            <span className="legend-badge" style={{ backgroundColor: '#f57c00' }}>3</span>
            <span>Strong Dip - Buy 75%</span>
          </div>
          <div className="legend-item">
            <span className="legend-badge" style={{ backgroundColor: '#ffa726' }}>2</span>
            <span>Moderate Dip - Buy 50%</span>
          </div>
          <div className="legend-item">
            <span className="legend-badge" style={{ backgroundColor: '#ffb74d' }}>1</span>
            <span>Slight Dip - Buy 25%</span>
          </div>
          <div className="legend-item">
            <span className="legend-badge" style={{ backgroundColor: '#757575' }}>0</span>
            <span>Neutral - Hold</span>
          </div>
          <div className="legend-item">
            <span className="legend-badge" style={{ backgroundColor: '#81c784' }}>-1</span>
            <span>Slight Peak - Sell 10%</span>
          </div>
          <div className="legend-item">
            <span className="legend-badge" style={{ backgroundColor: '#66bb6a' }}>-2</span>
            <span>Moderate Peak - Sell 15%</span>
          </div>
          <div className="legend-item">
            <span className="legend-badge" style={{ backgroundColor: '#388e3c' }}>-3</span>
            <span>Strong Peak - Sell 25%</span>
          </div>
          <div className="legend-item">
            <span className="legend-badge" style={{ backgroundColor: '#1976d2' }}>-4</span>
            <span>Extreme Peak - Sell 40%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;

