import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegistroUsuario from '../../../src/Paginas/Autentificacion/RegistroUsuario';

// Mock alert para evitar errores en JSDOM
window.alert = jest.fn();

describe('RegistroUsuario Component', () => {
  test('permite escribir en todos los campos correctamente', () => {
    render(
      <MemoryRouter>
        <RegistroUsuario />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Nombre:'), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText('Apellidos:'), { target: { value: 'Pérez' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'juan@example.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña:'), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText('Confirmar Contraseña:'), { target: { value: '123456' } });

    expect(screen.getByDisplayValue('Juan')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Pérez')).toBeInTheDocument();
    expect(screen.getByDisplayValue('juan@example.com')).toBeInTheDocument();
    expect(screen.getAllByDisplayValue('123456')).toHaveLength(2);
  });
});
