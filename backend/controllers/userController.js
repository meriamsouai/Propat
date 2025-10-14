const User = require('../models/User');

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      address,
      city,
      zipCode,
      country,
      companyName
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        firstName,
        lastName,
        phone,
        address,
        city,
        zipCode,
        country,
        companyName
      },
      { new: true, select: '-password' }
    );

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json(user);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
  }
};

module.exports = {
  getProfile,
  updateProfile
};