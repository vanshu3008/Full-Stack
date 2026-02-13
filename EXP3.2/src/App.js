import { useState } from "react";

export default function App() {
  const [books, setBooks] = useState([
    { id: 1, title: "The Great Gatsby", author: "S. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">

      {/* Title */}
      <h1 className="text-5xl font-bold text-center mb-10 text-gray-800">
        Library Management <br /> System
      </h1>

      {/* Search & Add Section */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200">

        <input
          type="text"
          placeholder="Search books..."
          className="w-full border border-gray-300 p-3 rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Book Title"
            className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Author"
            className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <button
            onClick={addBook}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 rounded-lg font-medium hover:opacity-90 transition"
          >
            Add Book
          </button>
        </div>
      </div>

      {/* Book List */}
      <div className="max-w-3xl mx-auto mt-10 space-y-6">
        {filteredBooks.map(book => (
          <div
            key={book.id}
            className="flex justify-between items-center bg-white p-6 rounded-xl shadow-md border border-gray-200"
          >
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {book.title}
              </h3>
              <p className="text-gray-600 mt-1">
                by {book.author}
              </p>
            </div>

            <button
              onClick={() => removeBook(book.id)}
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
