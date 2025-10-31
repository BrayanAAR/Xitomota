import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../../src/Paginas/Home/Home';

describe('Home page navegacion links', () => {
  it('links de categorias', () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const expected = [
      '/categorias/poleras',
      '/categorias/camisas',
      '/categorias/polerones',
      '/categorias/chaquetas',
      '/categorias/pantalones',
      '/categorias/buzos'
    ];

    expected.forEach(href => {
      const link = container.querySelector(`a[href="${href}"]`);
      expect(link).toBeTruthy();
      expect(link).toHaveAttribute('href', href);
    });
  });
});
