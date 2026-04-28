import React from 'react';

const Dashboard = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="dashboard-grid">
      <div className="card stat-card">
        <span className="stat-title">Total Orders</span>
        <span className="stat-value">{stats.totalOrders}</span>
      </div>
      <div className="card stat-card">
        <span className="stat-title">Total Revenue</span>
        <span className="stat-value">${stats.totalRevenue.toFixed(2)}</span>
      </div>
      <div className="card stat-card">
        <span className="stat-title">Processing</span>
        <span className="stat-value">{stats.ordersPerStatus?.PROCESSING || 0}</span>
      </div>
      <div className="card stat-card">
        <span className="stat-title">Ready</span>
        <span className="stat-value">{stats.ordersPerStatus?.READY || 0}</span>
      </div>
    </div>
  );
};

export default Dashboard;
