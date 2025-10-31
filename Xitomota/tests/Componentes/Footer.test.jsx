import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../src/componentes/Footer';

test('Footer muestra texto de copyright', async () => {
  render(<Footer />);
  screen.debug(); // imprime el DOM renderizado para debug
  const element = await screen.findByText(/© 2025 Xitomota. Todos los derechos reservados/i);
  expect(element).toBeInTheDocument();
});
it('should render social media links', () => {
        render(<Footer />);
        // El Footer actual renderiza varios enlaces de redes; comprobamos que hay al menos 4 enlaces
        const links = screen.getAllByRole('link');
        expect(links.length).toBeGreaterThanOrEqual(4);
    });
