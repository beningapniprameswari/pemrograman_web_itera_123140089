import React from 'react';

const BookItem = ({ book, onEdit, onDelete }) => {
  const getStatusText = (status) => {
    switch (status) {
      case 'milik':
        return 'Dimiliki';
      case 'baca':
        return 'Sedang Dibaca';
      case 'beli':
        return 'Ingin Dibeli';
      default:
        return 'N/A';
    }
  };

  return (
    <div className={`book-item status-${book.status}`}>
      <div className="book-info">
        <h4>{book.judul}</h4>
        <p>oleh {book.penulis}</p>
        <span className="book-status">{getStatusText(book.status)}</span>
      </div>
      <div className="book-actions">
        <button onClick={() => onEdit(book)}>Edit</button>
        <button onClick={() => onDelete(book.id)}>Hapus</button>
      </div>
    </div>
  );
};

export default BookItem;