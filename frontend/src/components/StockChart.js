import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

function StockChart({ data, symbol }) {
  const getLevelColor = (level) => {
    if (level >= 3) return '#d32f2f';
    if (level >= 1) return '#f57c00';
    if (level === 0) return '#757575';
    if (level >= -2) return '#388e3c';
    return '#1976d2';
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          background: 'white',
          padding: '12px',
          border: '2px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>Day {data.index + 1}</p>
          <p style={{ margin: '4px 0', color: '#667eea' }}>
            Close: <strong>${data.close?.toFixed(2)}</strong>
          </p>
          {data.ma50 && (
            <p style={{ margin: '4px 0', color: '#ffa726' }}>
              MA50: <strong>${data.ma50?.toFixed(2)}</strong>
            </p>
          )}
          {data.pctChange !== null && (
            <p style={{ margin: '4px 0', color: data.pctChange >= 0 ? '#4caf50' : '#f44336' }}>
              % Change: <strong>{data.pctChange?.toFixed(2)}%</strong>
            </p>
          )}
          <p style={{ 
            margin: '8px 0 0 0', 
            padding: '4px 8px', 
            background: getLevelColor(data.level),
            color: 'white',
            borderRadius: '4px',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            Level {data.level}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="index" 
          label={{ value: 'Days', position: 'insideBottom', offset: -5 }}
          stroke="#666"
        />
        <YAxis 
          label={{ value: 'Price ($)', angle: -90, position: 'insideLeft' }}
          stroke="#666"
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <ReferenceLine y={0} stroke="#999" strokeDasharray="3 3" />
        <Line 
          type="monotone" 
          dataKey="close" 
          stroke="#667eea" 
          strokeWidth={2}
          dot={false}
          name={`${symbol} Close Price`}
        />
        <Line 
          type="monotone" 
          dataKey="ma50" 
          stroke="#ffa726" 
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
          name="50-Day MA"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default StockChart;

