import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Productos from '../../../src/Paginas/Productos/Producto';
import axios from 'axios';

jest.mock('axios');

jest.mock('../../../src/Paginas/Productos/TarjetaProducto', () => ({
  __esModule: true,
  default: jest.fn(({ producto }) => (
    <div data-testid="mock-tarjeta-producto">{producto.nombre}</div>
  )),
}));

import TarjetaProducto from '../../../src/Paginas/Productos/TarjetaProducto';

describe("Componente Productos", () => {

  beforeEach(() => {
    axios.get.mockClear();
    TarjetaProducto.mockClear();
  });

  it("renderiza una tarjeta por cada producto cuando la API devuelve datos", async () => {
    const mockProductos = [
      { id: 1, nombre: 'Polera de Prueba 1', precio: 1000, stock: 10, imagen: 'img1.jpg' },
      { id: 2, nombre: 'Buzo de Prueba 2', precio: 2000, stock: 5, imagen: 'img2.jpg' }
    ];

    axios.get.mockResolvedValue({ data: mockProductos });
    render(<Productos />);

    expect(screen.getByText("Todos los productos")).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/v1/productos/tienda');

    await waitFor(() => {
      expect(screen.getByText("Polera de Prueba 1")).toBeInTheDocument();
      expect(screen.getByText("Buzo de Prueba 2")).toBeInTheDocument();
    });

    expect(TarjetaProducto).toHaveBeenCalledTimes(2);
  });

  it("muestra solo el título si la API no devuelve productos", async () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<Productos />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText("Todos los productos")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-tarjeta-producto")).not.toBeInTheDocument();
  });

});
