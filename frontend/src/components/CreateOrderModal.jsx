import React, { useState } from 'react';
import { createOrder } from '../api';

const CreateOrderModal = ({ isOpen, onClose, onOrderCreated }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
  });
  
  const [garments, setGarments] = useState([
    { type: 'Shirt', quantity: 1, price: 5 }
  ]);
  
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAddGarment = () => {
    setGarments([...garments, { type: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveGarment = (index) => {
    setGarments(garments.filter((_, i) => i !== index));
  };

  const handleGarmentChange = (index, field, value) => {
    const newGarments = [...garments];
    newGarments[index][field] = field === 'type' ? value : Number(value);
    setGarments(newGarments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createOrder({
        ...formData,
        garments
      });
      onOrderCreated();
      onClose();
      // Reset form
      setFormData({ customerName: '', phone: '' });
      setGarments([{ type: 'Shirt', quantity: 1, price: 5 }]);
    } catch (error) {
      console.error('Error creating order', error);
      alert('Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create New Order</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Customer Name</label>
            <input 
              type="text" 
              required
              value={formData.customerName}
              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              placeholder="e.g. John Doe"
            />
          </div>
          
          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="text" 
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="e.g. 555-0199"
            />
          </div>

          <div style={{ marginTop: '2rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Garments</h3>
            <button type="button" className="btn btn-secondary" onClick={handleAddGarment}>
              + Add Garment
            </button>
          </div>

          {garments.map((garment, index) => (
            <div key={index} className="garment-item">
              <div className="form-group" style={{ margin: 0, flex: 2 }}>
                <input 
                  type="text" 
                  required
                  placeholder="Type (e.g. Shirt)"
                  value={garment.type}
                  onChange={(e) => handleGarmentChange(index, 'type', e.target.value)}
                />
              </div>
              <div className="form-group" style={{ margin: 0, flex: 1 }}>
                <input 
                  type="number" 
                  min="1"
                  required
                  placeholder="Qty"
                  value={garment.quantity}
                  onChange={(e) => handleGarmentChange(index, 'quantity', e.target.value)}
                />
              </div>
              <div className="form-group" style={{ margin: 0, flex: 1 }}>
                <input 
                  type="number" 
                  min="0"
                  step="0.01"
                  required
                  placeholder="Price"
                  value={garment.price}
                  onChange={(e) => handleGarmentChange(index, 'price', e.target.value)}
                />
              </div>
              {garments.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => handleRemoveGarment(index)}>
                  &times;
                </button>
              )}
            </div>
          ))}

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrderModal;
