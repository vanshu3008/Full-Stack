import { useState } from "react";

export default function App() {
  const [books, setBooks] = useState([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  ]);

  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const addBook = () => {
    if (!title || !author) return;

    setBooks([
      ...books,
      { id: Date.now(), title, author }
    ]);

    setTitle("");
    setAuthor("");
  };

  const removeBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-6">
        Library Management System
      </h1>

      {/* Search & Add Section */}
      <div className="max-w-xl mx-auto bg-white p-5 rounded-lg shadow">
        
        <input
          type="text"
          placeholder="Search books..."
          className="w-full border p-2 rounded mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Book Title"
            className="flex-1 border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Author"
            className="flex-1 border p-2 rounded"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <button
            onClick={addBook}
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          >
            Add Book
          </button>
        </div>
      </div>

      {/* Book List */}
      <div className="max-w-xl mx-auto mt-6 space-y-4">
        {filteredBooks.map(book => (
          <div
            key={book.id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
          >
            <div>
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-600">by {book.author}</p>
            </div>

            <button
              onClick={() => removeBook(book.id)}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
