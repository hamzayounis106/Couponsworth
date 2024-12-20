import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { join } from 'path';
import { createServer } from 'http';
import {connectDB} from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import {upload} from './config/multerConfig.js';
import fileUpload from "express-fileupload";
// Importing routes
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import storeRoutes from './routes/storeRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import { v2 } from 'cloudinary';

// Connect to the database
connectDB();

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET, POST, DELETE, UPDATE, PUT',
  allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({ limit: "50mb" }));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: false,
  })
);


// Define API routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api', storeRoutes);
app.use('/api', couponRoutes);
app.use('/api', categoryRoutes);


// Middleware for handling errors
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Welcome to the server');
});

const server = createServer(app);
const PORT = 5000;

server.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
