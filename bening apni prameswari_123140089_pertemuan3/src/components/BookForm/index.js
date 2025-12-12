import React, { useState, useEffect } from 'react';

const BookForm = ({ onSubmit, bookToEdit, onCancelEdit }) => {
  const [judul, setJudul] = useState('');
  const [penulis, setPenulis] = useState('');
  const [status, setStatus] = useState('milik');
  const [error, setError] = useState('');

  const isEditing = !!bookToEdit;

  useEffect(() => {
    if (isEditing) {
      setJudul(bookToEdit.judul);
      setPenulis(bookToEdit.penulis);
      setStatus(bookToEdit.status);
    } else {
      setJudul('');
      setPenulis('');
      setStatus('milik');
    }
  }, [bookToEdit, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!judul || !penulis) {
      setError('Judul dan Penulis tidak boleh kosong!');
      return;
    }
    onSubmit({ judul, penulis, status });
    if (!isEditing) {
      setJudul('');
      setPenulis('');
      setStatus('milik');
    }
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h3>{isEditing ? 'Edit Buku' : 'Tambah Buku Baru'}</h3>
      {error && <p className="error-message">{error}</p>}
      <div>
        {/* TAMBAHKAN htmlFor dan id DI SINI */}
        <label htmlFor="judul">Judul:</label>
        <input
          type="text"
          id="judul" 
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
        />
      </div>
      <div>
        {/* TAMBAHKAN htmlFor dan id DI SINI */}
        <label htmlFor="penulis">Penulis:</label>
        <input
          type="text"
          id="penulis"
          value={penulis}
          onChange={(e) => setPenulis(e.target.value)}
        />
      </div>
      <div>
        {/* TAMBAHKAN htmlFor dan id DI SINI */}
        <label htmlFor="status">Status:</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>
      <button type="submit">{isEditing ? 'Simpan Perubahan' : 'Tambah Buku'}</button>
      {isEditing && (
        <button type="button" onClick={onCancelEdit}>
          Batal
        </button>
      )}
    </form>
  );
};

export default BookForm;