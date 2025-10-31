import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import DetalleProducto from '../../../src/Paginas/Productos/DetalleProducto';

jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
}));

describe('Componente DetalleProducto', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('muestra "Cargando producto..." mientras se obtiene la información', async () => {
    axios.get.mockImplementation(() => new Promise(() => {}));
    render(
      <MemoryRouter>
        <DetalleProducto />
      </MemoryRouter>
    );
    expect(screen.getByText(/Cargando producto/i)).toBeInTheDocument();
  });

  it('renderiza los datos del producto correctamente al obtener la respuesta', async () => {
    const mockProducto = {
      id: 1,
      nombre: 'Polerón Deportivo',
      precio: 29990,
      imagen: 'poleron.jpg',
      categoria: { nombre: 'Polerones' },
    };

    axios.get.mockResolvedValueOnce({ data: mockProducto });

    render(
      <MemoryRouter>
        <DetalleProducto />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Polerón Deportivo')).toBeInTheDocument();
    });

    expect(screen.getByText(/\$29\.990/)).toBeInTheDocument();
    expect(screen.getByText(/Categoría: Polerones/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Agregar al Carrito/i })).toBeInTheDocument();
  });

  it('muestra "Producto no encontrado." si ocurre un error al cargar', async () => {
    axios.get.mockRejectedValueOnce(new Error('Producto no encontrado'));

    render(
      <MemoryRouter>
        <DetalleProducto />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Producto no encontrado/i)).toBeInTheDocument();
    });
  });

  it('ejecuta axios.post al presionar "Agregar al Carrito"', async () => {
    const mockProducto = {
      id: 1,
      nombre: 'Polerón Deportivo',
      precio: 29990,
      imagen: 'poleron.jpg',
      categoria: { nombre: 'Polerones' },
    };

    axios.get.mockResolvedValueOnce({ data: mockProducto });
    Storage.prototype.getItem = jest.fn(() => '123');
    axios.post.mockResolvedValueOnce({});
    window.alert = jest.fn();

    render(
      <MemoryRouter>
        <DetalleProducto />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Polerón Deportivo')).toBeInTheDocument();
    });

    const boton = screen.getByRole('button', { name: /Agregar al Carrito/i });
    fireEvent.click(boton);

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/api/v1/carrito/123/add/1',
      null,
      { params: { cantidad: 1 } }
    );

    expect(window.alert).toHaveBeenCalledWith('¡Producto agregado al carrito!');
  });
});
