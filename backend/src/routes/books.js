import { Router } from "express";
import { searchBooks, getBookText } from "../lib/gutendex.js";
import { addBookToLibrary, getLibrary } from "../lib/library.js";

const router = Router();

// GET /api/books?search=programming
router.get("/", async (req, res) => {
  const query = req.query.search || "programming";
  try {
    const books = await searchBooks(query);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// GET /api/books/:id/text
router.get("/:id/text", async (req, res) => {
  try {
    const text = await getBookText(req.params.id);
    res.send(text);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch book text" });
  }
});

// POST /api/books/save
router.post("/save", async (req, res) => {
  const book = req.body;
  if (!book.id || !book.title) {
    return res.status(400).json({ error: "Missing required book fields" });
  }

  try {
    addBookToLibrary(book);
    res.status(201).json({ message: "Book added to library" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save book" });
  }
});

// GET /api/books/library
router.get("/library", (req, res) => {
  const saved = getLibrary();
  res.json(saved);
});


export default router;
