const mongoose = require('mongoose');

const customizationOrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reference: { type: String, required: true },
  chocolateBase: { type: String, enum: ['pate-a-glasse', 'couverture', 'valrhona', 'sans-chocolat'], required: true },
  chocolateColor: { type: String, enum: ['blanc', 'noir'] },  shape: {
    category: String,
    name: String,
    dimensions: String,
    posesPerSheet: Number
  },
  quantity: { type: Number, required: true },
  printType: { type: String, enum: ['feuilles-imprimees', 'thermoformed'], required: true },
  colorSelection: {
    type: { type: String, enum: ['1color', '2color', '3color'], required: true },
    colors: [{ type: String, required: true }]
  },
  textType: { type: String, enum: ['text', 'logo'], required: true },
  
  textContent: String,
  textStyle: { type: String, enum: ['Helvetica', 'Balmoral', 'Script', 'Manuel', ""], default: "Helvetica", },
  logoFile: {
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    path: String
  },
  customerInfo: {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    raisonSociale: { type: String, required: true },
    codePostal: { type: String, required: true },
    ville: { type: String, required: true },
    pays: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String, required: true }
  },
  status: { 
    type: String, 
    enum: ['pending', 'in-progress', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  previewImage: String, // Path to generated preview image
  adminNotes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
customizationOrderSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('CustomizationOrder', customizationOrderSchema);