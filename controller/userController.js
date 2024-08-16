const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/usersModel');

const JWT_SECRET = process.env.JWT_SECRET || 'swyft@2024';

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    const encryptedPass = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: encryptedPass
    });
    await newUser.save();

    res.status(200).json({success: true , message : "SignUp Successfull"});
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare provided password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '23h' } // Token expires in 1 hour
    );

    res.status(200).json({ success : true,message : "Login Success",token,user });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ error: 'Failed to log in' });
  }
};

exports.updatePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Check if both email and password are provided
   if(!email || !newPassword){
      return res.status(400).json({success: false, message: 'Email and Password Required' })  
    }

    // Find the user by email
    const user = await UserModel.findOne({ email:email });
    console.log(user)
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;

    // Save the updated user data
    await user.save();

    // Respond with success message
    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // Handle errors and send an appropriate response
    return res.status(500).json({ success: false, message: error.message });
  }
};
