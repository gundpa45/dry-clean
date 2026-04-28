const mongoose = require('mongoose');

const GarmentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  }
});

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  garments: [GarmentSchema],
  totalBill: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'],
    default: 'RECEIVED',
  }
}, { timestamps: true });

// Pre-save middleware to generate orderId and calculate total bill
OrderSchema.pre('save', function () {
  if (this.isNew) {
    // Generate simple unique ID
    this.orderId = 'ORD-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  }
  
  // Calculate total bill based on garments
  if (this.garments && this.garments.length > 0) {
    this.totalBill = this.garments.reduce((total, garment) => {
      return total + (garment.quantity * garment.price);
    }, 0);
  } else {
    this.totalBill = 0;
  }
});

module.exports = mongoose.model('Order', OrderSchema);
