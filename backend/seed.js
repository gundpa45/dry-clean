require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('./models/Order');

const dummyOrders = [
  {
    customerName: 'John Doe',
    phone: '555-0101',
    garments: [
      { type: 'Shirt', quantity: 3, price: 5 },
      { type: 'Pants', quantity: 2, price: 7 }
    ],
    status: 'RECEIVED'
  },
  {
    customerName: 'Jane Smith',
    phone: '555-0102',
    garments: [
      { type: 'Saree', quantity: 1, price: 15 },
      { type: 'Blouse', quantity: 1, price: 8 }
    ],
    status: 'PROCESSING'
  },
  {
    customerName: 'Alice Johnson',
    phone: '555-0103',
    garments: [
      { type: 'Jacket', quantity: 1, price: 20 },
      { type: 'Tie', quantity: 2, price: 3 }
    ],
    status: 'READY'
  },
  {
    customerName: 'Bob Williams',
    phone: '555-0104',
    garments: [
      { type: 'Suit', quantity: 1, price: 25 }
    ],
    status: 'DELIVERED'
  },
  {
    customerName: 'Michael Brown',
    phone: '555-0105',
    garments: [
      { type: 'Dress', quantity: 2, price: 12 }
    ],
    status: 'RECEIVED'
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Clear existing orders
    await Order.deleteMany({});
    console.log('Cleared existing orders');
    
    // Insert dummy orders
    for (const orderData of dummyOrders) {
      const order = new Order(orderData);
      await order.save();
    }
    console.log('Dummy data seeded successfully');

    // Seed Admin
    const Admin = require('./models/Admin');
    await Admin.deleteMany({});
    const admin = new Admin({
      adminId: '0001',
      name: 'Admin 1',
      password: '1000'
    });
    await admin.save();
    console.log('Admin seeded successfully');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
