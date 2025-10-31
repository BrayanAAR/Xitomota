import React from 'react';
import { render, screen } from '@testing-library/react';
import Nosotros from './Nosotros';

describe('Nosotros Component', () => {
  beforeEach(() => {
    render(<Nosotros />);
  });

  test('renderiza el título principal', () => {
    const titulo = screen.getByText(/Sobre Xitomota/i);
    expect(titulo).toBeInTheDocument();
  });

  test('renderiza el subtítulo de desarrolladores', () => {
    const subtitulo = screen.getByText(/Los Desarrolladores/i);
    expect(subtitulo).toBeInTheDocument();
  });

  test('muestra los párrafos de introducción', () => {
    expect(screen.getByText(/Traemos ropa deportiva original/i)).toBeInTheDocument();
    expect(screen.getByText(/No vestimos para encajar/i)).toBeInTheDocument();
    expect(screen.getByText(/Prendas que muchas veces solo llegan a Europa/i)).toBeInTheDocument();
    expect(screen.getByText(/Cada drop que subimos tiene algo que decir/i)).toBeInTheDocument();
  });

  test('renderiza la lista de desarrolladores con los nombres correctos', () => {
    expect(screen.getByText(/Brayan Ahumada/i)).toBeInTheDocument();
    expect(screen.getByText(/Cristian Ormazabal/i)).toBeInTheDocument();
  });
});
