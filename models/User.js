const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    }
})

// Hash the password before saving the user model
userSchema.pre('save', async function(next) {
    try {
      if (!this.isModified('password')) return next();
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });
  
  // Method to compare password during login
  userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };
  
  // Create and export the User model
  const User = mongoose.model('User', userSchema);
  module.exports = User;