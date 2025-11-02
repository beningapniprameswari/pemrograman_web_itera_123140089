import React from 'react';
import BookItem from '../BookItem';

const BookList = ({ books, onEdit, onDelete }) => {
  if (books.length === 0) {
    return <p>Tidak ada buku yang ditemukan.</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default BookList;