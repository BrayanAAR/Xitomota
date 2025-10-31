import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Ofertas from '../../../src/Paginas/Ofertas/Ofertas';

describe('Ofertas Component', () => {
  beforeEach(() => {
    // Mock para localStorage
    Storage.prototype.getItem = jest.fn(() => 'mockCartId');

    // Mock para alert
    window.alert = jest.fn();

    render(<Ofertas />);
  });

  test('renderiza el título y subtítulo de ofertas', () => {
    expect(screen.getByText(/Ofertas Imperdibles/i)).toBeInTheDocument();
    expect(screen.getByText(/¡Aprovecha estos descuentos/i)).toBeInTheDocument();
  });

  test('renderiza los productos con nombre, categoría y precio', () => {
    const productos = [
      'Buzo Básico (¡Oferta!)',
      'Polera Estampada (¡Oferta!)',
      'Chaqueta Deportiva (¡Oferta!)'
    ];

    productos.forEach(nombre => {
      expect(screen.getByText(nombre)).toBeInTheDocument();
    });

    expect(screen.getByText(/Categoría: Buzos/i)).toBeInTheDocument();
    expect(screen.getByText(/Categoría: Poleras/i)).toBeInTheDocument();
    expect(screen.getByText(/Categoría: Chaquetas/i)).toBeInTheDocument();
  });

  test('los botones "Agregar al Carrito" existen y funcionan', () => {
    const botones = screen.getAllByText(/Agregar al Carrito/i);
    expect(botones.length).toBe(3);

    // Simular click en el primer botón
    fireEvent.click(botones[0]);
    expect(window.alert).toHaveBeenCalledWith("¡Producto agregado al carrito! (Simulación)");
  });
});
