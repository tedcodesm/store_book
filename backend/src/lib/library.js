// lib/library.js
export const library = [];

// Add a book if not already saved
export function addBookToLibrary(book) {
  if (!library.find((b) => b.id === book.id)) {
    library.push(book);
  }
}

// Get all saved books
export function getLibrary() {
  return library;
}
