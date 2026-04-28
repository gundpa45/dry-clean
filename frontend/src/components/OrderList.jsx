import React from 'react';
import { updateOrderStatus } from '../api';

const OrderList = ({ orders, loading, fetchOrders }) => {
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      fetchOrders();
    } catch (error) {
      console.error('Failed to update status', error);
      alert('Failed to update order status');
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return <div className="card">No orders found.</div>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Total Bill</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.orderId}</td>
              <td>{order.customerName}</td>
              <td>{order.phone}</td>
              <td>${order.totalBill.toFixed(2)}</td>
              <td>
                <span className={`status-badge ${order.status}`}>
                  {order.status}
                </span>
              </td>
              <td>
                <select 
                  value={order.status} 
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  style={{ padding: '4px', borderRadius: '4px', background: '#334155', color: '#fff', border: '1px solid #475569' }}
                >
                  <option value="RECEIVED">RECEIVED</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="READY">READY</option>
                  <option value="DELIVERED">DELIVERED</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
