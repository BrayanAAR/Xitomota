import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Polerones from '../../../../src/Paginas/Categorias/Polerones/Polerones';

jest.mock('axios');

const mockPolerones = [
  { id: 1, nombre: 'Polerón Gris', precio: 25000, categoria: 'Polerones', url_foto: 'poleron1.jpg' },
  { id: 2, nombre: 'Polerón Azul', precio: 28000, categoria: 'Polerones', url_foto: 'poleron2.jpg' },
];

describe('Componente Polerones', () => {

  beforeEach(() => {
    axios.get.mockClear();
  });

  test('renderiza la barra de categorías', () => {
    render(
      <MemoryRouter>
        <Polerones />
      </MemoryRouter>
    );

    // Buscamos solo dentro del nav de categorías
    const barraCategorias = screen.getByRole('navigation', { name: /categorías/i, hidden: true }) ||
                             screen.getByRole('navigation');
    const categorias = ['Poleras', 'Camisas', 'Polerones', 'Pantalones', 'Buzos', 'Chaquetas'];

    categorias.forEach(cat => {
      expect(within(barraCategorias).getByText(cat)).toBeInTheDocument();
    });
  });

  test('renderiza productos luego del fetch', async () => {
    axios.get.mockResolvedValue({ data: mockPolerones });

    render(
      <MemoryRouter>
        <Polerones />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Polerón Gris')).toBeInTheDocument();
      expect(screen.getByText('Polerón Azul')).toBeInTheDocument();
    });
  });

  test('maneja error en fetch', async () => {
    axios.get.mockRejectedValue(new Error('Error al cargar'));

    render(
      <MemoryRouter>
        <Polerones />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Polerón Gris')).not.toBeInTheDocument();
    });
  });

});
