import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/user.js';

const testToken = async () => {
  const token = 'your_jwt_token_here';
  const decoded = jwt.verify(token, 'your_jwt_secret_here');
  console.log('Decoded token:', decoded);

  await mongoose.connect('your_mongo_connection_string', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const user = await User.findById(decoded.userId).select('-password');
  console.log('User:', user);
};

testToken().catch(console.error);
