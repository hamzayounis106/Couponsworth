import mongoose from 'mongoose';
export const connectDB = async () => {
    try {
  const con=      await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1); // Exit process with failure
    }
};
