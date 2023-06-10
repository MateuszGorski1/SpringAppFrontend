import React, { useEffect, useState } from 'react';
import '../styles.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);
  const [editedBook, setEditedBook] = useState({
    bookname: '',
    author: '',
    price: 0,
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/books`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log('Error fetching books:', error);
    }
  };

  const handleEdit = (book) => {
    setEditingBookId(book.bookid);
    setEditedBook({
      bookname: book.bookname,
      author: book.author,
      price: book.price,
    });
  };

  const handleInputChange = (e) => {
    setEditedBook({ ...editedBook, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/book`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...editedBook, bookid: editingBookId }),
      });
      if (response.ok) {
        fetchBooks();
        setEditingBookId(null);
        setEditedBook({
          bookname: '',
          author: '',
          price: 0,
        });
      } else {
        console.log('Error updating book:', response.statusText);
      }
    } catch (error) {
      console.log('Error updating book:', error);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/book/${bookId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchBooks();
      } else {
        console.log('Error deleting book:', response.statusText);
      }
    } catch (error) {
      console.log('Error deleting book:', error);
    }
  };

  return (
    <div className="book-list-container">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.bookid} className="book-item">
              <div className="book-info">
                <div className="book-field">
                  <strong>Book ID:</strong> {book.bookid}
                </div>
                {editingBookId === book.bookid ? (
                  <>
                    {/* Editable input fields */}
                    <div className="book-field">
                      <strong>Book Name:</strong>
                      <input
                        type="text"
                        name="bookname"
                        value={editedBook.bookname}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="book-field">
                      <strong>Author:</strong>
                      <input
                        type="text"
                        name="author"
                        value={editedBook.author}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="book-field">
                      <strong>Price:</strong>
                      <input
                        type="number"
                        name="price"
                        value={editedBook.price}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Read-only book details */}
                    <div className="book-field">
                      <strong>Book Name:</strong> {book.bookname}
                    </div>
                    <div className="book-field">
                      <strong>Author:</strong> {book.author}
                    </div>
                    <div className="book-field">
                      <strong>Price:</strong> {book.price}
                    </div>
                  </>
                )}
              </div>
              <div className="book-actions">
                {editingBookId === book.bookid ? (
                  // Save button during editing
                  <button className="save-button" onClick={handleSave}>
                    Save
                  </button>
                ) : (
                  <>
                    {/* Edit button */}
                    <button className="edit-button" onClick={() => handleEdit(book)}>
                      Edit
                    </button>
                    {/* Delete button */}
                    <button className="delete-button" onClick={() => handleDelete(book.bookid)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;