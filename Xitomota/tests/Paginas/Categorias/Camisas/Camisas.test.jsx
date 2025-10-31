import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Camisas from '../../../../src/Paginas/Categorias/Camisas/Camisas';

jest.mock('axios');

const mockCamisas = [
  { id: 1, nombre: 'Camisa Azul', precio: 12000, categoria: 'Camisas', url_foto: 'foto1.jpg' },
  { id: 2, nombre: 'Camisa Roja', precio: 15000, categoria: 'Camisas', url_foto: 'foto2.jpg' },
];

describe('Componente Camisas', () => {

  beforeEach(() => {
    axios.get.mockClear();
  });

  test('renderiza la barra de categorías', () => {
    render(
      <MemoryRouter>
        <Camisas />
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
    axios.get.mockResolvedValue({ data: mockCamisas });

    render(
      <MemoryRouter>
        <Camisas />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Camisa Azul')).toBeInTheDocument();
      expect(screen.getByText('Camisa Roja')).toBeInTheDocument();
    });
  });

  test('maneja error en fetch', async () => {
    axios.get.mockRejectedValue(new Error('Error al cargar'));

    render(
      <MemoryRouter>
        <Camisas />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Camisa Azul')).not.toBeInTheDocument();
    });
  });

});
