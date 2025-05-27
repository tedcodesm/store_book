// models/Book.js
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Reference to User
  id: { type: Number, required: true }, // Gutenberg book ID
  title: String,
  authors: String,
  cover: String,
  textUrl: String
});

// Ensure each user can only save the same book once
bookSchema.index({ userId: 1, id: 1 }, { unique: true });

export const Book = mongoose.model('lib', bookSchema);
