const Order = require('../models/Order');

// Helper function to generate order number
const generateOrderNumber = () => {
  return 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
};

// Get user order history
const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
  }
};

// Create new order
const createOrder = async (req, res) => {
  try {
    const { items, total, shippingAddress } = req.body;
    
    const order = new Order({
      userId: req.user.userId,
      orderNumber: generateOrderNumber(),
      items,
      total,
      shippingAddress
    });
    
    await order.save();
    
    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la commande' });
  }
};

// Get specific order
const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      userId: req.user.userId
    });
    
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la commande' });
  }
};

module.exports = {
  getOrderHistory,
  createOrder,
  getOrder
};