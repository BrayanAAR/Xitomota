import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PagoRealizado from '../../src/Paginas/Checkout/PagoRealizado';

// Mock del carrito
const mockOrden = {
  id: 123,
  cliente: {
    nombre: 'Juan',
    apellidos: 'Pérez',
    correo: 'juan@mail.com',
  },
  direccion: {
    calle: 'Av. Siempre Viva',
    departamento: '101',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Cerrillos',
    indicaciones: 'Ninguna',
  },
  productos: [
    { id: 1, nombre: 'Polera Roja', precio: 10000, cantidad: 2, subtotal: 20000 },
  ],
  total: 20000,
};

jest.mock('../../src/context/OrdenContext', () => ({
  useOrden: () => ({
    orden: mockOrden,
  }),
}));

describe('PagoRealizado', () => {
  test('muestra datos de la orden correctamente', async () => {
    render(
      <MemoryRouter>
        <PagoRealizado />
      </MemoryRouter>
    );

    await waitFor(() => {
      // Mensaje de confirmación
      expect(screen.getByText(/Se ha realizado la compra\. nro #123/i)).toBeInTheDocument();

      // Datos del cliente
      expect(screen.getByDisplayValue('Juan')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Pérez')).toBeInTheDocument();
      expect(screen.getByDisplayValue('juan@mail.com')).toBeInTheDocument();

      // Dirección
      expect(screen.getByDisplayValue('Av. Siempre Viva')).toBeInTheDocument();
      expect(screen.getByDisplayValue('101')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Región Metropolitana de Santiago')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Cerrillos')).toBeInTheDocument();

      // Productos
      expect(screen.getByText('Polera Roja')).toBeInTheDocument();
      expect(screen.getByText(/\$10\.000/)).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText(/\$20\.000/)).toBeInTheDocument();

      // Total pagado
      expect(screen.getByText(/Total pagado:.*\$20\.000/)).toBeInTheDocument();
    });
  });
});
