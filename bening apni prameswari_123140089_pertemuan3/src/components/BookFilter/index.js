import React from 'react';

const BookFilter = ({ filter, onFilterChange, searchQuery, onSearchChange }) => {
  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Cari buku (judul/penulis)..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="filter-select"
      >
        <option value="semua">Semua Status</option>
        <option value="milik">Dimiliki</option>
        <option value="baca">Sedang Dibaca</option>
        <option value="beli">Ingin Dibeli</option>
      </select>
    </div>
  );
};

export default BookFilter;