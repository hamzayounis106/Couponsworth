import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    // parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    storeIds : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' }],
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
});

export default mongoose.model('Category', CategorySchema);
