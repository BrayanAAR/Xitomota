import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PagoFallido from '../../../src/Paginas/Checkout/PagoFallido';
import { useLocation } from 'react-router-dom';

// Mock de useLocation para simular estado del pago
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('PagoFallido', () => {
  const mockFormData = {
    nombre: 'Juan',
    apellidos: 'Pérez',
    correo: 'juan@mail.com',
    calle: 'Av. Siempre Viva',
    departamento: '101',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Cerrillos',
    indicaciones: 'Ninguna',
  };

  const mockItems = [
    {
      id: 1,
      cantidad: 2,
      producto: {
        nombre: 'Polera Roja',
        precio: 10000,
        imagen: 'polera.jpg',
      },
    },
  ];

  const mockTotal = 20000;

  beforeEach(() => {
    useLocation.mockReturnValue({
      state: {
        formData: mockFormData,
        items: mockItems,
        total: mockTotal,
      },
    });
  });

  it('muestra datos de cliente, carrito y total correctamente', () => {
    render(
      <MemoryRouter>
        <PagoFallido />
      </MemoryRouter>
    );

    // Datos del cliente
    expect(screen.getByDisplayValue('Juan')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Pérez')).toBeInTheDocument();
    expect(screen.getByDisplayValue('juan@mail.com')).toBeInTheDocument();

    // Dirección
    expect(screen.getByDisplayValue('Av. Siempre Viva')).toBeInTheDocument();
    expect(screen.getByDisplayValue('101')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Región Metropolitana de Santiago')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Cerrillos')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Ninguna')).toBeInTheDocument();

    // Carrito
    expect(screen.getByText('Polera Roja')).toBeInTheDocument();
    expect(screen.getByText('$10.000')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('$20.000')).toBeInTheDocument();

    // Total pagado
    expect(screen.getByText('Total pagado: $20.000')).toBeInTheDocument();

    // Botón "VOLVER A REALIZAR EL PAGO"
    expect(screen.getByRole('button', { name: /VOLVER A REALIZAR EL PAGO/i })).toBeInTheDocument();
  });

  it('muestra mensaje de error si no hay estado', () => {
    useLocation.mockReturnValue({ state: null });

    render(
      <MemoryRouter>
        <PagoFallido />
      </MemoryRouter>
    );

    expect(screen.getByText(/No hay información de pago para mostrar/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Volver al Carrito/i })).toBeInTheDocument();
  });
});
