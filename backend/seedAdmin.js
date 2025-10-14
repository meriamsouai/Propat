const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/propat', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const admin = new User({
        nom: 'Admin',
        prenom: 'System',
        email: 'admin@gmail.com',
        password: hashedPassword,
        phone: '+216123456789',
        address: '123 Admin Street',
        city: 'Tunis',
        zipCode: '1000',
        country: 'Tunisia',
        userType: 'enterprise',
        companyName: 'Admin Company',
        role: 'admin',
        verified: true
      });

      await admin.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
      // Ensure the existing user has admin role
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('Updated existing user to admin role');
      }
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();