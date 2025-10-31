import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Poleras from '../../../../src/Paginas/Categorias/Poleras/Poleras';

jest.mock('axios');

const mockPoleras = [
  { id: 1, nombre: 'Polera Blanca', precio: 12000, categoria: 'Poleras', url_foto: 'polera1.jpg' },
  { id: 2, nombre: 'Polera Negra', precio: 15000, categoria: 'Poleras', url_foto: 'polera2.jpg' },
];

describe('Componente Poleras', () => {

  beforeEach(() => {
    axios.get.mockClear();
  });

  test('renderiza la barra de categorías', () => {
    render(
      <MemoryRouter>
        <Poleras />
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
    axios.get.mockResolvedValue({ data: mockPoleras });

    render(
      <MemoryRouter>
        <Poleras />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Polera Blanca')).toBeInTheDocument();
      expect(screen.getByText('Polera Negra')).toBeInTheDocument();
    });
  });

  test('maneja error en fetch', async () => {
    axios.get.mockRejectedValue(new Error('Error al cargar'));

    render(
      <MemoryRouter>
        <Poleras />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Polera Blanca')).not.toBeInTheDocument();
    });
  });

});
