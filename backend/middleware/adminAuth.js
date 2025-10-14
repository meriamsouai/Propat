// Admin authentication middleware
const adminAuth = (req, res, next) => {
  // Check if user has admin role
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ 
      message: 'Accès refusé. Droits d\'administrateur requis.' 
    });
  }
};

module.exports = adminAuth;