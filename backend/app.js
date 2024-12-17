import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { join } from 'path';
import { createServer } from 'http';
import {connectDB} from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import {upload} from './config/multerConfig.js';

// Importing routes
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import storeRoutes from './routes/storeRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

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

app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

// Define API routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api', storeRoutes);
app.use('/api', couponRoutes);
app.use('/api', categoryRoutes);

app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    res.send('File uploaded successfully');
  } catch (err) {
    res.status(400).send('Error uploading file');
  }
});

// Middleware for handling errors
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Welcome to the server');
});

const server = createServer(app);
const PORT = 5000;

server.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
