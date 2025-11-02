import React, { useState, useMemo } from 'react';
import BookForm from '../../components/BookForm';
import BookList from '../../components/BookList';
import BookFilter from '../../components/BookFilter';
import { useBooks } from '../../context/BookContext';

const Home = () => {
  const { books, addBook, updateBook, deleteBook } = useBooks();

  const [filter, setFilter] = useState('semua'); 
  const [searchQuery, setSearchQuery] = useState('');
  
  const [bookToEdit, setBookToEdit] = useState(null);

  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        return filter === 'semua' || book.status === filter;
      })
      .filter((book) => {
        const query = searchQuery.toLowerCase();
        return (
          book.judul.toLowerCase().includes(query) ||
          book.penulis.toLowerCase().includes(query)
        );
      });
  }, [books, filter, searchQuery]); 

  const handleFormSubmit = (bookData) => {
    if (bookToEdit) {
      updateBook(bookToEdit.id, bookData);
      setBookToEdit(null);
    } else {
      addBook(bookData);
    }
  };

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
        onEdit={setBookToEdit} 
        onDelete={deleteBook}  
      />
    </div>
  );
};

export default Home;