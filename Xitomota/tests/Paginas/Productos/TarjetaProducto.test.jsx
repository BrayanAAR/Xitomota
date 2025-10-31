import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TarjetaProducto from '../../../src/Paginas/Productos/TarjetaProducto';

// Mock de <Link> de react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe("Componente TarjetaProducto", () => {

  it("muestra nombre, precio y stock del producto", () => {
    const mockProducto = {
      id: 1,
      nombre: "Polera Básica Algodón",
      precio: 12990,
      stock: 10,
      imagen: "polera.jpg",
      categoria: { id: 1, nombre: "Poleras" }
    };

    render(<TarjetaProducto producto={mockProducto} />);

    expect(screen.getByText("Polera Básica Algodón")).toBeInTheDocument();
    expect(screen.getByText("$12.990")).toBeInTheDocument();
    expect(screen.getByText("Stock disponible: 10")).toBeInTheDocument();
    expect(screen.getByText("Agregar al Carrito")).toBeInTheDocument();
  });

  it("muestra 'AGOTADO' y deshabilita el botón si el stock es 0", () => {
    const mockProductoAgotado = {
      id: 2,
      nombre: "Polera Negra",
      precio: 9990,
      stock: 0,
      imagen: "polera_negra.jpg",
      categoria: { id: 1, nombre: "Poleras" }
    };

    render(<TarjetaProducto producto={mockProductoAgotado} />);

    expect(screen.getByText("AGOTADO")).toBeInTheDocument();
    expect(screen.getByText("Agotado")).toBeDisabled();
  });

});
