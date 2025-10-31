import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Contacto from './Contacto';

// Mock del alert
window.alert = jest.fn();

describe('Contacto Component', () => {
  beforeEach(() => {
    render(<Contacto />);
  });

  test('renderiza los campos de formulario', () => {
    expect(screen.getByLabelText(/Nombre Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Comentario/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enviar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Limpiar/i })).toBeInTheDocument();
  });

  test('permite escribir en los inputs', () => {
    const nombreInput = screen.getByLabelText(/Nombre Completo/i);
    const correoInput = screen.getByLabelText(/Correo/i);
    const comentarioInput = screen.getByLabelText(/Comentario/i);

    fireEvent.change(nombreInput, { target: { value: 'Cristian' } });
    fireEvent.change(correoInput, { target: { value: 'test@mail.com' } });
    fireEvent.change(comentarioInput, { target: { value: 'Hola mundo' } });

    expect(nombreInput.value).toBe('Cristian');
    expect(correoInput.value).toBe('test@mail.com');
    expect(comentarioInput.value).toBe('Hola mundo');
  });

  test('al enviar el formulario se muestra alert y se limpian los campos', () => {
    const nombreInput = screen.getByLabelText(/Nombre Completo/i);
    const correoInput = screen.getByLabelText(/Correo/i);
    const comentarioInput = screen.getByLabelText(/Comentario/i);
    const enviarButton = screen.getByRole('button', { name: /Enviar/i });

    fireEvent.change(nombreInput, { target: { value: 'Cristian' } });
    fireEvent.change(correoInput, { target: { value: 'test@mail.com' } });
    fireEvent.change(comentarioInput, { target: { value: 'Hola mundo' } });

    fireEvent.click(enviarButton);

    expect(window.alert).toHaveBeenCalledWith('Mensaje enviado (simulación)');
    expect(nombreInput.value).toBe('');
    expect(correoInput.value).toBe('');
    expect(comentarioInput.value).toBe('');
  });

  test('el botón limpiar vacía los campos', () => {
    const nombreInput = screen.getByLabelText(/Nombre Completo/i);
    const correoInput = screen.getByLabelText(/Correo/i);
    const comentarioInput = screen.getByLabelText(/Comentario/i);
    const limpiarButton = screen.getByRole('button', { name: /Limpiar/i });

    fireEvent.change(nombreInput, { target: { value: 'Cristian' } });
    fireEvent.change(correoInput, { target: { value: 'test@mail.com' } });
    fireEvent.change(comentarioInput, { target: { value: 'Hola mundo' } });

    fireEvent.click(limpiarButton);

    expect(nombreInput.value).toBe('');
    expect(correoInput.value).toBe('');
    expect(comentarioInput.value).toBe('');
  });
});
