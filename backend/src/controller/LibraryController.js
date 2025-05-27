// controllers/libraryController.js
import { Book } from '../models/library.js';

export async function addBookToLibrary(req, res) {
  const { id, title, authors, cover, textUrl, userId } = req.body;

  if (!userId) return res.status(400).json({ message: 'User ID is required' });

  try {
    const existing = await Book.findOne({ userId, id });
    if (existing) {
      return res.status(200).json({ message: 'Book already in user library' });
    }

    const newBook = new lib({ userId, id, title, authors, cover, textUrl });
    await newBook.save();

    res.status(201).json({ message: 'Book saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getLibrary(req, res) {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: 'User ID is required' });

  try {
    const books = await Book.find({ userId });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
