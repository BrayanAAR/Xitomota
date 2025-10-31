import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
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

  test('debe redirigir a la página de inicio (/) si el usuario es Cliente', async () => {
        
        // A. Arrange: Simula una respuesta de 'Cliente'
        axios.post.mockResolvedValue({
            data: { email: 'cliente@test.com', rol: 'Cliente' }
        });

        render(<MemoryRouter><IniciarSesion /></MemoryRouter>);

        // B. Act: Rellena el formulario
        // (Asegúrate de que los 'getByLabelText' coincidan con tus <label>)
        await userEvent.type(screen.getByLabelText(/Email/i), 'cliente@test.com');
        await userEvent.type(screen.getByLabelText(/Password/i), 'cliente123');
        fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

        // C. Assert: Verifica la redirección a la raíz
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });


    // --- PRUEBA NUEVA (PARA CUBRIR LA LÍNEA 41) ---
    test('debe mostrar un error genérico si la API falla con un error 500', async () => {
        
        // A. Arrange: Simula un error 500 (o cualquier error que NO sea 401)
        axios.post.mockRejectedValue({
            response: { status: 500, data: 'Error de servidor' } 
        });

        // Silenciamos el console.error que esperamos que ocurra
        jest.spyOn(console, 'error').mockImplementation(() => {});

        render(<MemoryRouter><IniciarSesion /></MemoryRouter>);

        // B. Act: Rellena el formulario
        await userEvent.type(screen.getByLabelText(/Email/i), 'test@test.com');
        await userEvent.type(screen.getByLabelText(/Password/i), '123456');
        fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

        // C. Assert: Verifica que aparece el mensaje de la rama 'else'
        expect(await screen.findByText('Hubo un error al intentar iniciar sesión. Inténtalo de nuevo.')).toBeInTheDocument();
        
        // Restaura el console.error
        console.error.mockRestore();
    });

});
