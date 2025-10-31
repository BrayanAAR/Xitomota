import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Checkout from '../../src/Paginas/Checkout/Checkout';

// Mock del carrito (si lo usas desde un contexto o prop, ajusta)
const mockCarrito = [
  { id: 1, nombre: 'Polera Roja', precio: 10000, cantidad: 2, subtotal: 20000 },
  { id: 2, nombre: 'Pantalón Azul', precio: 20000, cantidad: 1, subtotal: 20000 },
];

jest.mock('../../src/context/CarritoContext', () => ({
  useCarrito: () => ({
    carrito: mockCarrito,
    total: 40000,
  }),
}));

describe('Checkout', () => {
  test('renderiza items del carrito correctamente', async () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    await waitFor(() => {
      // Nombres de productos
      expect(screen.getByText('Polera Roja')).toBeInTheDocument();
      expect(screen.getByText('Pantalón Azul')).toBeInTheDocument();

      // Subtotales de productos usando regex
      expect(screen.getByText(/\$20\.000/)).toBeInTheDocument();

      // Total del carrito
      expect(screen.getByText(/\$40\.000/)).toBeInTheDocument();
    });
  });
});
