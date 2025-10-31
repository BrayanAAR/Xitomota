import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Chaquetas from '../../../../src/Paginas/Categorias/Chaquetas/Chaquetas';

jest.mock('axios');

const mockChaquetas = [
  { id: 1, nombre: 'Chaqueta Negra', precio: 45000, categoria: 'Chaquetas', url_foto: 'chaqueta1.jpg' },
  { id: 2, nombre: 'Chaqueta Azul', precio: 50000, categoria: 'Chaquetas', url_foto: 'chaqueta2.jpg' },
];

describe('Componente Chaquetas', () => {

  beforeEach(() => {
    axios.get.mockClear();
  });

  test('renderiza la barra de categorías', () => {
    render(
      <MemoryRouter>
        <Chaquetas />
      </MemoryRouter>
    );

    // Buscamos solo dentro del nav de categorías
    const barraCategorias = screen.getByRole('navigation');
    const categorias = ['Poleras', 'Camisas', 'Polerones', 'Pantalones', 'Buzos', 'Chaquetas'];

    categorias.forEach(cat => {
      expect(within(barraCategorias).getByText(cat)).toBeInTheDocument();
    });
  });

  test('renderiza productos luego del fetch', async () => {
    axios.get.mockResolvedValue({ data: mockChaquetas });

    render(
      <MemoryRouter>
        <Chaquetas />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Chaqueta Negra')).toBeInTheDocument();
      expect(screen.getByText('Chaqueta Azul')).toBeInTheDocument();
    });
  });

  test('maneja error en fetch', async () => {
    axios.get.mockRejectedValue(new Error('Error al cargar'));

    render(
      <MemoryRouter>
        <Chaquetas />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Chaqueta Negra')).not.toBeInTheDocument();
    });
  });

});
