import React, { useState, useMemo } from 'react';
import BookForm from '../../components/BookForm';
import BookList from '../../components/BookList';
import BookFilter from '../../components/BookFilter';
import { useBooks } from '../../context/BookContext';

const Home = () => {
  const { books, addBook, updateBook, deleteBook } = useBooks();

  // State untuk filter dan search
  const [filter, setFilter] = useState('semua'); // 'semua', 'milik', 'baca', 'beli'
  const [searchQuery, setSearchQuery] = useState('');
  
  // State untuk mode edit
  const [bookToEdit, setBookToEdit] = useState(null);

  // Logika untuk memfilter dan mencari buku
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        // Filter berdasarkan status
        return filter === 'semua' || book.status === filter;
      })
      .filter((book) => {
        // Filter berdasarkan pencarian (judul atau penulis)
        const query = searchQuery.toLowerCase();
        return (
          book.judul.toLowerCase().includes(query) ||
          book.penulis.toLowerCase().includes(query)
        );
      });
  }, [books, filter, searchQuery]); // Hanya jalan jika salah satu dependency berubah

  // Handler untuk form
  const handleFormSubmit = (bookData) => {
    if (bookToEdit) {
      // Mode Update
      updateBook(bookToEdit.id, bookData);
      setBookToEdit(null); // Keluar dari mode edit
    } else {
      // Mode Add
      addBook(bookData);
    }
  };

  // Handler untuk membatalkan edit
  const handleCancelEdit = () => {
    setBookToEdit(null);
  };

  return (
    <div className="home-page">
      <BookForm
        onSubmit={handleFormSubmit}
        bookToEdit={bookToEdit}
        onCancelEdit={handleCancelEdit}
      />
      <hr />
      <h2>Koleksi Bukumu</h2>
      <BookFilter
        filter={filter}
        onFilterChange={setFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <BookList
        books={filteredBooks}
        onEdit={setBookToEdit} // Mengatur buku mana yang akan diedit
        onDelete={deleteBook}  // Langsung panggil fungsi delete dari context
      />
    </div>
  );
};

export default Home;