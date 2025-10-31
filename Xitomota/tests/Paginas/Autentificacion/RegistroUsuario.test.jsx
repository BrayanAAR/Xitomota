import React from 'react';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import RegistroUsuario from '../../../src/Paginas/Autentificacion/RegistroUsuario';
import axios from 'axios';

jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

window.alert = jest.fn();

describe('RegistroUsuario Component', () => {

    beforeEach(() => {
      axios.post.mockClear();
      mockNavigate.mockClear();
      window.alert.mockClear();
    });

    test('permite escribir en todos los campos correctamente', () => {
    render(<MemoryRouter><RegistroUsuario /></MemoryRouter>);


      fireEvent.change(screen.getByTestId('nombre-input'), { target: { value: 'Juan' } });
      fireEvent.change(screen.getByTestId('apellidos-input'), { target: { value: 'Pérez' } });
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'juan@example.com' } });
      fireEvent.change(screen.getByTestId('password-input'), { target: { value: '1234567' } });
      fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: '1234567' } });

      expect(screen.getByDisplayValue('Juan')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Pérez')).toBeInTheDocument();
      expect(screen.getByDisplayValue('juan@example.com')).toBeInTheDocument();
      expect(screen.getAllByDisplayValue('1234567')).toHaveLength(2);
    });

    test('debe llamar a la API y redirigir al enviar el formulario exitosamente', async () => {

      axios.post.mockResolvedValue({ data: { nombre: 'Juan' } });
      render(<MemoryRouter><RegistroUsuario /></MemoryRouter>);

      fireEvent.change(screen.getByTestId('nombre-input'), { target: { value: 'Juan' } });
      fireEvent.change(screen.getByTestId('apellidos-input'), { target: { value: 'Pérez' } });
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'juan@example.com' } });
      fireEvent.change(screen.getByTestId('password-input'), { target: { value: '1234567' } });
      fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: '1234567' } });

      fireEvent.click(screen.getByRole('button', { name: /Registrar/i }));

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          'http://localhost:8080/api/v1/usuarios',
          { 
            nombre: 'Juan',
            apellidos: 'Pérez',
            email: 'juan@example.com',
            password: '1234567',
            rol: 'Cliente'
          }
        );
      });

      expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('registrado exitosamente'));
      expect(mockNavigate).toHaveBeenCalledWith('/login'); 
    });

    test('debe mostrar un error si las contraseñas no coinciden', async () => {
      render(<RegistroUsuario />);

      await userEvent.type(screen.getByTestId('nombre-input'), 'Test');
      await userEvent.type(screen.getByTestId('apellidos-input'), 'User');
      await userEvent.type(screen.getByTestId('email-input'), 'test@user.com');
      await userEvent.type(screen.getByTestId('password-input'), '123456');
      await userEvent.type(screen.getByTestId('confirm-password-input'), 'abcdef'); 
    
      fireEvent.click(screen.getByRole('button', { name: /Registrar/i }));

      expect(await screen.findByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();
      expect(axios.post).not.toHaveBeenCalled();
      
    });

    test('debe mostrar un error si la contraseña es muy corta', async () => {
      render(<RegistroUsuario />);
      await userEvent.type(screen.getByTestId('nombre-input'), 'Test');
      await userEvent.type(screen.getByTestId('apellidos-input'), 'User');
      await userEvent.type(screen.getByTestId('email-input'), 'test@user.com');
      await userEvent.type(screen.getByTestId('password-input'), '123'); 
      await userEvent.type(screen.getByTestId('confirm-password-input'), '123');
    
      fireEvent.click(screen.getByRole('button', { name: /Registrar/i }));

      expect(await screen.findByText(/La contraseña debe tener al menos 6 caracteres/i)).toBeInTheDocument();
      expect(axios.post).not.toHaveBeenCalled();
    });

    test('debe mostrar un error genérico si la API falla sin un mensaje', async () => {
        
        
        axios.post.mockRejectedValue(new Error("Error de red"));

        
        jest.spyOn(console, 'error').mockImplementation(() => {});

        render(<RegistroUsuario />);
        
        
        await userEvent.type(screen.getByTestId('nombre-input'), 'Juan');
        await userEvent.type(screen.getByTestId('apellidos-input'), 'Pérez');
        await userEvent.type(screen.getByTestId('email-input'), 'juan@example.com');
        await userEvent.type(screen.getByTestId('password-input'), '123456');
        await userEvent.type(screen.getByTestId('confirm-password-input'), '123456');

        
        fireEvent.click(screen.getByRole('button', { name: /Registrar/i }));

        expect(await screen.findByText('Hubo un error al registrar el usuario. Inténtalo de nuevo.')).toBeInTheDocument();
        
        
        expect(axios.post).toHaveBeenCalled();
        
        expect(mockNavigate).not.toHaveBeenCalled();

        
        console.error.mockRestore();
    });

    
    test('debe mostrar el mensaje de error específico del backend', async () => {
        const mockApiError = {
            response: {
                data: {
                    message: "El email ya existe" 
                }
            }
        };
        axios.post.mockRejectedValue(mockApiError);

        
        jest.spyOn(console, 'error').mockImplementation(() => {});
        
        render(<RegistroUsuario />);
        
        await userEvent.type(screen.getByTestId('nombre-input'), 'Juan');
        await userEvent.type(screen.getByTestId('email-input'), 'juan.repetido@example.com');
        await userEvent.type(screen.getByTestId('apellidos-input'), 'Pérez');
        await userEvent.type(screen.getByTestId('password-input'), '123456');
        await userEvent.type(screen.getByTestId('confirm-password-input'), '123456');


        fireEvent.click(screen.getByRole('button', { name: /Registrar/i }));

        expect(await screen.findByText("El email ya existe")).toBeInTheDocument();
        expect(mockNavigate).not.toHaveBeenCalled();

        console.error.mockRestore();
    });
});
