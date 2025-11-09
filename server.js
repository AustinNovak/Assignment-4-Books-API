const express = require('express');
const app = express();
app.use(express.json());

// Sample book data
let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", copiesAvailable: 5 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", copiesAvailable: 3 },
  { id: 3, title: "1984", author: "George Orwell", genre: "Dystopian Fiction", copiesAvailable: 7 }
];

// GET all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET book by ID
app.get('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// POST new book
app.post('/api/books', (req, res) => {
  const { title, author, genre, copiesAvailable } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author,
    genre,
    copiesAvailable
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book
app.put('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const { title, author, genre, copiesAvailable } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;
  if (genre) book.genre = genre;
  if (copiesAvailable !== undefined) book.copiesAvailable = copiesAvailable;

  res.json(book);
});

// DELETE book
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ message: 'Book not found' });

  const deleted = books.splice(index, 1);
  res.json(deleted[0]);
});

if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
}

module.exports = app;
