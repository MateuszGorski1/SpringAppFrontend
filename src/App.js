import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { IoIosAdd, IoIosList } from 'react-icons/io';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import './styles.css';
import env from "@beam-australia/react-env";

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <IoIosAdd className="nav-icon" />
                Add Book
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/list" className="nav-link">
                <IoIosList className="nav-icon" />
                Book List
              </Link>
            </li>
          </ul>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<BookForm />} />
            <Route path="/list" element={<BookList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;