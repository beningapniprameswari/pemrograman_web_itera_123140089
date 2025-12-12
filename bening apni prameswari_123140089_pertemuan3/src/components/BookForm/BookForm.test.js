import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookForm from './index';

describe('BookForm Component', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancelEdit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancelEdit.mockClear();
  });

  test('renders in "add" mode correctly', () => {
    render(<BookForm onSubmit={mockOnSubmit} />);

    expect(screen.getByText('Tambah Buku Baru')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /tambah buku/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/judul/i)).toHaveValue('');
    expect(screen.getByLabelText(/penulis/i)).toHaveValue('');
  });

  test('shows error message on empty submission', () => {
    render(<BookForm onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: /tambah buku/i }));

    expect(screen.getByText('Judul dan Penulis tidak boleh kosong!')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('calls onSubmit with correct data when form is valid', () => {
    render(<BookForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/judul/i), {
      target: { value: 'Buku Tes' },
    });
    fireEvent.change(screen.getByLabelText(/penulis/i), {
      target: { value: 'Penulis Tes' },
    });
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: 'baca' },
    });

    fireEvent.click(screen.getByRole('button', { name: /tambah buku/i }));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      judul: 'Buku Tes',
      penulis: 'Penulis Tes',
      status: 'baca',
    });
    expect(screen.queryByText('Judul dan Penulis tidak boleh kosong!')).not.toBeInTheDocument();
  });

  test('renders in "edit" mode with pre-filled data', () => {
    const bookToEdit = {
      id: 1,
      judul: 'Buku Lama',
      penulis: 'Penulis Lama',
      status: 'milik',
    };
    
    render(<BookForm onSubmit={mockOnSubmit} bookToEdit={bookToEdit} />);

    expect(screen.getByText('Edit Buku')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /simpan perubahan/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /batal/i })).toBeInTheDocument();
    
    expect(screen.getByLabelText(/judul/i)).toHaveValue('Buku Lama');
    expect(screen.getByLabelText(/penulis/i)).toHaveValue('Penulis Lama');
    expect(screen.getByLabelText(/status/i)).toHaveValue('milik');
  });
  
  test('calls onCancelEdit when cancel button is clicked in edit mode', () => {
    const bookToEdit = { id: 1, judul: 'Buku Lama', penulis: 'Penulis Lama', status: 'milik' };
    
    render(
      <BookForm 
        onSubmit={mockOnSubmit} 
        bookToEdit={bookToEdit} 
        onCancelEdit={mockOnCancelEdit} 
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /batal/i }));

    expect(mockOnCancelEdit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});