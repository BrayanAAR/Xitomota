import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Buzos from '../../../../src/Paginas/Categorias/Buzos/Buzos';

jest.mock('axios');

const mockBuzos = [
  { id: 1, nombre: 'Buzo Azul', precio: 20000, categoria: 'Buzos', url_foto: 'buzo1.jpg' },
  { id: 2, nombre: 'Buzo Rojo', precio: 22000, categoria: 'Buzos', url_foto: 'buzo2.jpg' },
];

describe('Componente Buzos', () => {

  beforeEach(() => {
    axios.get.mockClear();
  });

  test('renderiza la barra de categorías', () => {
    render(
      <MemoryRouter>
        <Buzos />
      </MemoryRouter>
    );

    const barraCategorias = screen.getByRole('navigation');
    const categorias = ['Poleras', 'Camisas', 'Polerones', 'Pantalones', 'Buzos', 'Chaquetas'];

    categorias.forEach(cat => {
      expect(within(barraCategorias).getByText(cat)).toBeInTheDocument();
    });
  });

  test('renderiza productos luego del fetch', async () => {
    axios.get.mockResolvedValue({ data: mockBuzos });

    render(
      <MemoryRouter>
        <Buzos />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Buzo Azul')).toBeInTheDocument();
      expect(screen.getByText('Buzo Rojo')).toBeInTheDocument();
    });
  });

  test('maneja error en fetch', async () => {
    axios.get.mockRejectedValue(new Error('Error al cargar'));

    render(
      <MemoryRouter>
        <Buzos />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Buzo Azul')).not.toBeInTheDocument();
    });
  });

});
