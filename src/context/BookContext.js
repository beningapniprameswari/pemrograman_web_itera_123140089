import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// 1. Buat Context
const BookContext = createContext();

// 2. Buat custom hook untuk menggunakan context ini (lebih rapi)
export const useBooks = () => {
  return useContext(BookContext);
};

// 3. Buat Provider Component
export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('books', []);

  // Fungsi CRUD (Create, Read, Update, Delete)
  const addBook = (book) => {
    // Tambahkan id unik (bisa pakai library 'uuid' atau timestamp sederhana)
    const newBook = { ...book, id: Date.now() };
    setBooks([...books, newBook]);
  };

  const updateBook = (id, updatedBook) => {
    setBooks(
      books.map((book) => (book.id === id ? { ...book, ...updatedBook } : book))
    );
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  // Nilai yang akan di-provide ke komponen di bawahnya
  const value = {
    books,
    addBook,
    updateBook,
    deleteBook,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};