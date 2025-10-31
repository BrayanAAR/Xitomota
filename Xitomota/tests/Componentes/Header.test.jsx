import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../src/componentes/Header';

describe('Header navegacion de links', () => {
  it('correcto href', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /XITOMOTA/i }).getAttribute('href')).toBe('/');
    expect(screen.getByRole('link', { name: /Inicio/i }).getAttribute('href')).toBe('/');
    expect(screen.getByRole('link', { name: /Productos/i }).getAttribute('href')).toBe('/productos');
    expect(screen.getByRole('link', { name: /Ofertas/i }).getAttribute('href')).toBe('/ofertas');
    expect(screen.getByRole('link', { name: /Nosotros/i }).getAttribute('href')).toBe('/nosotros');
    expect(screen.getByRole('link', { name: /Blogs/i }).getAttribute('href')).toBe('/blogs');
    expect(screen.getByRole('link', { name: /Contacto/i }).getAttribute('href')).toBe('/contacto');
    
    expect(screen.getByRole('link', { name: /Iniciar Sesión/i }).getAttribute('href')).toBe('/login');
    expect(screen.getByRole('link', { name: /Carrito/i }).getAttribute('href')).toBe('/carrito');

    const catButton = screen.getByRole('button', { name: /Categorías/i });
    await user.click(catButton);

    const polerasLink = await screen.findByRole('link', { name: /Poleras/i });
    expect(polerasLink.getAttribute('href')).toBe('/categorias/poleras');
  });
});

