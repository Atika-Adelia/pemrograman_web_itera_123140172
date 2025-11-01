import React, { createContext, useContext } from 'react';
import { nanoid } from 'nanoid';
import { useLocalStorage } from '../hooks/UseLocalStorage';

const BookContext = createContext();

export const useBooks = () => {
  return useContext(BookContext);
};

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('books', []); // State utama

  const addBook = (book) => {
    const newBook = { ...book, id: nanoid() };
    setBooks((prevBooks) => [newBook, ...prevBooks]);
  };

  const editBook = (id, updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, ...updatedBook } : book
      )
    );
  };

  const deleteBook = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const getBookById = (id) => {
    return books.find((book) => book.id === id);
  };

  const value = {
    books,
    addBook,
    editBook,
    deleteBook,
    getBookById,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};