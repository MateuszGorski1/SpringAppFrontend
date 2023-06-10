import React, { useState } from 'react';
import '../styles.css';

const BookForm = () => {
  const [bookname, setBookname] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');

  const handleBooknameChange = (event) => {
    setBookname(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const bookData = { bookname, author, price };
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      if (response.ok) {
        // Book added successfully, perform any additional actions
        // or show a success message if desired
        console.log('Book added successfully');
      } else {
        console.log('Error adding book');
      }
      setBookname('');
      setAuthor('');
      setPrice('');
    } catch (error) {
      console.log('Error adding book:', error);
    }
  };

  return (
    <div className="book-form-container">
      <h2>Add a Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bookname">Book Name</label>
          <input
            type="text"
            id="bookname"
            value={bookname}
            onChange={handleBooknameChange}
            placeholder="Enter book name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={handleAuthorChange}
            placeholder="Enter author"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={handlePriceChange}
            placeholder="Enter price"
            required
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default BookForm;