import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookForm from './index';

describe('BookForm Component', () => {
  // Mock function untuk prop onSubmit
  const mockOnSubmit = jest.fn();
  const mockOnCancelEdit = jest.fn();

  // Bersihkan mock setiap selesai test
  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancelEdit.mockClear();
  });

  // Test 1: Render form dalam mode "Tambah Buku"
  test('renders in "add" mode correctly', () => {
    render(<BookForm onSubmit={mockOnSubmit} />);

    // Cek judul form
    expect(screen.getByText('Tambah Buku Baru')).toBeInTheDocument();
    // Cek tombol submit
    expect(screen.getByRole('button', { name: /tambah buku/i })).toBeInTheDocument();
    // Cek field kosong
    expect(screen.getByLabelText(/judul/i)).toHaveValue('');
    expect(screen.getByLabelText(/penulis/i)).toHaveValue('');
  });

  // Test 2: Menampilkan error handling jika form kosong
  test('shows error message on empty submission', () => {
    render(<BookForm onSubmit={mockOnSubmit} />);

    // Klik tombol submit tanpa mengisi form
    fireEvent.click(screen.getByRole('button', { name: /tambah buku/i }));

    // Cek pesan error muncul
    expect(screen.getByText('Judul dan Penulis tidak boleh kosong!')).toBeInTheDocument();
    // Pastikan onSubmit TIDAK dipanggil
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  // Test 3: Memanggil onSubmit dengan data yang benar saat form valid
  test('calls onSubmit with correct data when form is valid', () => {
    render(<BookForm onSubmit={mockOnSubmit} />);

    // Isi form
    fireEvent.change(screen.getByLabelText(/judul/i), {
      target: { value: 'Buku Tes' },
    });
    fireEvent.change(screen.getByLabelText(/penulis/i), {
      target: { value: 'Penulis Tes' },
    });
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: 'baca' },
    });

    // Klik submit
    fireEvent.click(screen.getByRole('button', { name: /tambah buku/i }));

    // Cek onSubmit dipanggil dengan data yang benar
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      judul: 'Buku Tes',
      penulis: 'Penulis Tes',
      status: 'baca',
    });
    // Cek pesan error tidak ada
    expect(screen.queryByText('Judul dan Penulis tidak boleh kosong!')).not.toBeInTheDocument();
  });

  // Test 4: Render form dalam mode "Edit"
  test('renders in "edit" mode with pre-filled data', () => {
    const bookToEdit = {
      id: 1,
      judul: 'Buku Lama',
      penulis: 'Penulis Lama',
      status: 'milik',
    };
    
    render(<BookForm onSubmit={mockOnSubmit} bookToEdit={bookToEdit} />);

    // Cek judul form
    expect(screen.getByText('Edit Buku')).toBeInTheDocument();
    // Cek tombol submit
    expect(screen.getByRole('button', { name: /simpan perubahan/i })).toBeInTheDocument();
    // Cek tombol Batal
    expect(screen.getByRole('button', { name: /batal/i })).toBeInTheDocument();
    
    // Cek data sudah terisi
    expect(screen.getByLabelText(/judul/i)).toHaveValue('Buku Lama');
    expect(screen.getByLabelText(/penulis/i)).toHaveValue('Penulis Lama');
    expect(screen.getByLabelText(/status/i)).toHaveValue('milik');
  });
  
  // Test 5: Memanggil onCancelEdit saat tombol "Batal" diklik
  test('calls onCancelEdit when cancel button is clicked in edit mode', () => {
    const bookToEdit = { id: 1, judul: 'Buku Lama', penulis: 'Penulis Lama', status: 'milik' };
    
    render(
      <BookForm 
        onSubmit={mockOnSubmit} 
        bookToEdit={bookToEdit} 
        onCancelEdit={mockOnCancelEdit} 
      />
    );

    // Klik tombol Batal
    fireEvent.click(screen.getByRole('button', { name: /batal/i }));

    // Cek onCancelEdit dipanggil
    expect(mockOnCancelEdit).toHaveBeenCalledTimes(1);
    // Cek onSubmit TIDAK dipanggil
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});