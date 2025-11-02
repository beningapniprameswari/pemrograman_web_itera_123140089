import React from 'react';
import { useBooks } from '../../context/BookContext';
import { useBookStats } from '../../hooks/useBookStats';

const Stats = () => {
  const { books } = useBooks(); 
  const stats = useBookStats(books); 

  return (
    <div className="stats-page">
      <h2>Statistik Buku</h2>
      <ul className="stats-list">
        <li>
          <strong>Total Buku:</strong> {stats.total}
        </li>
        <li>
          <strong>Buku Dimiliki:</strong> {stats.owned}
        </li>
        <li>
          <strong>Sedang Dibaca:</strong> {stats.reading}
        </li>
        <li>
          <strong>Ingin Dibeli:</strong> {stats.toBuy}
        </li>
      </ul>
    </div>
  );
};

export default Stats;