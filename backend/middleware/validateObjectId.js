import mongoose from 'mongoose';

const validateObjectIdMiddleware = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid Object ID' });
    }
    next();
};

export default validateObjectIdMiddleware;
