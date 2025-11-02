import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Import ini
import App from './App';

test('renders app header', () => {
  // Bungkus <App /> dengan <BrowserRouter>
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  // Kita cari teks di navbar
  const headerElement = screen.getByText(/Manajemen Buku Pribadi/i);
  expect(headerElement).toBeInTheDocument();
});