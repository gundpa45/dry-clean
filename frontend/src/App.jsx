import React, { useState, useEffect } from 'react';
import { getDashboardStats, getOrders, getMe } from './api';
import Dashboard from './components/Dashboard';
import OrderList from './components/OrderList';
import CreateOrderModal from './components/CreateOrderModal';
import Login from './components/Login';
import './styles/main.scss';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [statsData, ordersData, adminData] = await Promise.all([
        getDashboardStats(),
        getOrders(statusFilter, searchQuery),
        getMe()
      ]);
      setStats(statsData);
      setOrders(ordersData);
      setAdmin(adminData);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter, searchQuery, token]);

  if (!token) {
    return <Login onLoginSuccess={setToken} />;
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">
          🧼 CleanFlow
        </div>
        <div className="nav-links" style={{ alignItems: 'center' }}>
          {admin && <span style={{ color: '#cbd5e1', marginRight: '1rem' }}>Welcome, {admin.name}</span>}
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            + New Order
          </button>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="main-content">
        <Dashboard stats={stats} loading={loading && !stats} />
        
        <div className="card" style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ margin: 0 }}>Recent Orders</h2>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input 
                type="text" 
                placeholder="Search name, phone, ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  border: '1px solid #334155',
                  background: '#0f172a',
                  color: '#fff',
                  fontFamily: 'inherit'
                }}
              />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  border: '1px solid #334155',
                  background: '#0f172a',
                  color: '#fff',
                  fontFamily: 'inherit'
                }}
              >
                <option value="ALL">All Statuses</option>
                <option value="RECEIVED">Received</option>
                <option value="PROCESSING">Processing</option>
                <option value="READY">Ready</option>
                <option value="DELIVERED">Delivered</option>
              </select>
            </div>
          </div>
          
          <OrderList orders={orders} loading={loading} fetchOrders={fetchData} />
        </div>
      </main>

      <CreateOrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onOrderCreated={fetchData} 
      />
    </div>
  );
}

export default App;
