const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, 'your_jwt_secret', { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(payload, 'your_jwt_secret', { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Endpoint to request password reset
router.post('/reset-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email }); // Replace with your user model and field
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    // console.log("\nuser -> : " + user);

    // Generate token (you can use JWT or any other method)
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    const resetLink = `${req.headers.origin}/setpassword/${token}`; // Example reset link


    // Nodemailer setup
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: "nmcgchatbot@gmail.com",
          pass: "ksvj dljn tzrv dmvi"
        }
    });

  
    // Send email with reset link
    const mailOptions = {
      from: "nmcgchatbot@gmail.com",
      to: email,
      subject: 'Password Reset Request',
      html: `<p>Hello ${user.name},</p>
            <p>You have requested to reset your password. Click the link below to reset your password:</p>
            <p><a href="${resetLink}">${resetLink}</a></p>`
    };

    // console.log("Email -> : " + email);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        return res.status(500).json({ message: error });
      }
  
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Password reset email sent successfully' });
    });
});

router.post('/set-password', async (req, res) => {
  const { token, password } = req.body;

  try {
    // Verify token and find user
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }

    // Hash new password and save to user
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password has been reset' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
