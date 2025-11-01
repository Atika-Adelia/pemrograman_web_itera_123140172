import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaShoppingBag } from 'react-icons/fa'; 
import { useBooks } from '../context/BookContext';

const BookCard = ({ book }) => {
  const { deleteBook } = useBooks();
  const getStatusChip = () => {
    switch (book.status) {
      case 'owned':
        return <div className="status-chip owned">Owned</div>;
      case 'reading':
        return <div className="status-chip reading">Reading</div>;
      case 'wishlist':
        return <div className="status-chip wishlist">Wishlist</div>;
      default:
        return null;
    }
  };

  return (
    <div className="book-card">
      <div className="book-card-image-container"> 
        <img 
          src="https://covers.openlibrary.org/b/id/10707739-M.jpg" 
          alt={book.title} 
          className="book-cover" 
        />
        {getStatusChip()}
      </div>
      <div className="book-card-content">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <div className="book-card-actions">
          <div className="action-buttons">
            <Link to={`/edit/${book.id}`} className="action-btn edit">
              <FaEdit />
            </Link>
            <button onClick={() => deleteBook(book.id)} className="action-btn delete">
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;