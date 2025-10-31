import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Polerones from '../../../../src/Paginas/Categorias/Polerones/Polerones';

jest.mock('axios');

jest.mock('../../../src/img/Polerones.jpg', () => null);

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
// Busca el primer elemento <nav> que encuentre en la pantalla.
    const barraCategorias = screen.getByRole('navigation');
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

  test('debe mostrar el placeholder si una categoría no tiene imagen', () => {
        
        // A. Arrange
        render(<MemoryRouter><Polerones /></MemoryRouter>);

        // B. Act
        // Busca el nav (como en tus otros tests)
        const barraCategorias = screen.getByRole('navigation', { name: "" });

        // C. Assert
        // Busca el texto "100 x 100" que está en tu <div> placeholder
        // 'within' asegura que lo buscamos DENTRO de la barra de categorías
        const placeholder = within(barraCategorias).getAllByText('100 x 100');
        expect(placeholder).toHaveLength(6);

        // (Opcional) Verifica que la imagen de Poleras (por su 'alt text') NO está
        expect(within(barraCategorias).queryByAltText('Polerones')).not.toBeInTheDocument();
    });

});
