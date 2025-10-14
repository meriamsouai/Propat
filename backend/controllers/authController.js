const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Register
const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      city,
      zipCode,
      country,
      userType,
      companyName,
      newsletter
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      address,
      city,
      zipCode,
      country,
      userType,
      companyName: userType === 'enterprise' ? companyName : undefined,
      newsletter
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Compte créé avec succès',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Erreur lors de la création du compte' });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
};

// Google OAuth callback
const googleCallback = (req, res) => {
  const token = jwt.sign(
    { userId: req.user._id, email: req.user.email, role: req.user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  res.redirect(`http://localhost:3000/account?token=${token}`);
};

// Facebook OAuth callback
const facebookCallback = (req, res) => {
  const token = jwt.sign(
    { userId: req.user._id, email: req.user.email, role: req.user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  res.redirect(`http://localhost:3000/account?token=${token}`);
};

module.exports = {
  register,
  login,
  googleCallback,
  facebookCallback
};