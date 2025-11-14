const CustomizationOrder = require('../models/CustomizationOrder');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/logos/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Create new customization order
const createCustomizationOrder = async (req, res) => {
  try {
    const {
      reference,
      chocolateBase,
      chocolateColor,
      shape,
      quantity,
      printType,
      colorSelection,
      textType,
      textContent,
      textStyle,
      customerInfo
    } = req.body;

    const orderData = {
      userId: req.user.userId,
      reference,
      chocolateBase: chocolateBase || null,
      chocolateColor: chocolateColor || null,
      shape: shape ? JSON.parse(shape) : null,
      quantity: parseInt(quantity),
      printType: printType || null,
      colorSelection: colorSelection ? JSON.parse(colorSelection) : null,
      textType: textType || null,
      textContent: textContent || '',
      textStyle: textStyle || null,
      customerInfo: customerInfo ? JSON.parse(customerInfo) : null
    };

    // Add logo file info if uploaded
    if (req.file) {
      orderData.logoFile = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path
      };
    }

    const customizationOrder = new CustomizationOrder(orderData);
    await customizationOrder.save();

    res.status(201).json({
      message: 'Commande de personnalisation créée avec succès',
      order: customizationOrder
    });
  } catch (error) {
    console.error('Create customization order error:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la création de la commande de personnalisation',
      error: error.message 
    });
  }
};

// Get user's customization order history
const getUserCustomizationOrders = async (req, res) => {
  try {
    const orders = await CustomizationOrder.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    console.error('Get user customization orders error:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des commandes' 
    });
  }
};

// Get specific customization order
const getCustomizationOrder = async (req, res) => {
  try {
    const order = await CustomizationOrder.findOne({
      _id: req.params.orderId,
      userId: req.user.userId
    });
    
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Get customization order error:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération de la commande' 
    });
  }
};

// Reorder (create duplicate order with new reference)
const reorderCustomization = async (req, res) => {
  try {
    const originalOrder = await CustomizationOrder.findOne({
      _id: req.params.orderId,
      userId: req.user.userId
    });
    
    if (!originalOrder) {
      return res.status(404).json({ message: 'Commande originale non trouvée' });
    }

    // Create new reference
    const newReference = originalOrder.reference.replace(/\d{6}$/, Date.now().toString().slice(-6));
    
    const newOrder = new CustomizationOrder({
      ...originalOrder.toObject(),
      _id: undefined,
      reference: newReference,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'pending'
    });

    await newOrder.save();
    
    res.status(201).json({
      message: 'Commande dupliquée avec succès',
      order: newOrder
    });
  } catch (error) {
    console.error('Reorder customization error:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la duplication de la commande' 
    });
  }
};

// Admin: Get all customization orders
const getAllCustomizationOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status;
    
    const filter = {};
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    const orders = await CustomizationOrder.find(filter)
      .populate('userId', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await CustomizationOrder.countDocuments(filter);
    
    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get all customization orders error:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des commandes' 
    });
  }
};

// Admin: Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    
    const order = await CustomizationOrder.findByIdAndUpdate(
      req.params.orderId,
      { 
        status, 
        adminNotes: adminNotes || '',
        updatedAt: new Date()
      },
      { new: true }
    ).populate('userId', 'firstName lastName email');
    
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    
    res.json({
      message: 'Statut de la commande mis à jour',
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la mise à jour du statut' 
    });
  }
};

module.exports = {
  upload,
  createCustomizationOrder,
  getUserCustomizationOrders,
  getCustomizationOrder,
  reorderCustomization,
  getAllCustomizationOrders,
  updateOrderStatus
};