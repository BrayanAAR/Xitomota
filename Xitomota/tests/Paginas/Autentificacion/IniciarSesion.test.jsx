import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import IniciarSesion from '../../../src/Paginas/Autentificacion/IniciarSesion';
import axios from 'axios';

jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('IniciarSesion Component', () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  test('renderiza inputs y botón', () => {
    render(
      <MemoryRouter>
        <IniciarSesion />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
  });

  test('muestra error con credenciales incorrectas', async () => {
    axios.post.mockRejectedValue({ response: { status: 401 } });

    render(
      <MemoryRouter>
        <IniciarSesion />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: '1234' } });
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    const errorMessage = await screen.findByText(/Credenciales inválidas/i);
    expect(errorMessage).toBeInTheDocument();
    expect(localStorage.getItem('usuarioLogueado')).toBeNull();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('navega y guarda en localStorage con credenciales correctas', async () => {
    axios.post.mockResolvedValue({ data: { email: 'admin@example.com', rol: 'Administrador' } });

    render(
      <MemoryRouter>
        <IniciarSesion />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'admin' } });
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    // Espera que localStorage se actualice
    await screen.findByText(/Iniciar Sesión/i); // solo para esperar re-render

    expect(localStorage.getItem('usuarioLogueado')).toBe('admin@example.com');
    expect(localStorage.getItem('rolUsuario')).toBe('Administrador');
    expect(mockNavigate).toHaveBeenCalledWith('/admin');
  });
});
