import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid credentials');
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(403);
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};