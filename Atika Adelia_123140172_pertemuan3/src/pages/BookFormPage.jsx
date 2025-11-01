import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import BookForm from '../components/BookForm';

const BookFormPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { getBookById, addBook, editBook } = useBooks();

  const isEditMode = Boolean(id);
  const bookToEdit = isEditMode ? getBookById(id) : null;

  const handleFormSubmit = (formData) => {
    if (isEditMode) {
      editBook(id, formData);
    } else {
      addBook(formData);
    }
    navigate('/'); 
  };

  return (
    <div className="form-page-container">
      <h2>{isEditMode ? 'Edit Book' : 'Add New Book'}</h2>
      <BookForm initialData={bookToEdit} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default BookFormPage;