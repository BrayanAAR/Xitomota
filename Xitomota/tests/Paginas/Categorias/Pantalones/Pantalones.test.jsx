import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Pantalones from '../../../../src/Paginas/Categorias/Pantalones/Pantalones';

jest.mock('axios');

const mockPantalones = [
  { id: 1, nombre: 'Pantalón Negro', precio: 35000, categoria: 'Pantalones', url_foto: 'pantalon1.jpg' },
  { id: 2, nombre: 'Pantalón Azul', precio: 38000, categoria: 'Pantalones', url_foto: 'pantalon2.jpg' },
];

describe('Componente Pantalones', () => {

  beforeEach(() => {
    axios.get.mockClear();
  });

  test('renderiza la barra de categorías', () => {
    render(
      <MemoryRouter>
        <Pantalones />
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
    axios.get.mockResolvedValue({ data: mockPantalones });

    render(
      <MemoryRouter>
        <Pantalones />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Pantalón Negro')).toBeInTheDocument();
      expect(screen.getByText('Pantalón Azul')).toBeInTheDocument();
    });
  });

  test('maneja error en fetch', async () => {
    axios.get.mockRejectedValue(new Error('Error al cargar'));

    render(
      <MemoryRouter>
        <Pantalones />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Pantalón Negro')).not.toBeInTheDocument();
    });
  });

});
