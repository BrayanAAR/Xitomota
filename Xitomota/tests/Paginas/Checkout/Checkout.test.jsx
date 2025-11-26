import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkout from '../../../src/Paginas/Checkout/Checkout'; 
import axios from 'axios';

import { MemoryRouter, Routes, Route } from 'react-router-dom'; 
import { wait } from '@testing-library/user-event/dist/cjs/utils/index.js';


jest.mock('axios'); 


const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

// --- Datos Falsos ---
const mockCartItems = [
    { 
        id: 10, 
        producto: { id: 1, nombre: 'Polera Test', precio: 10000, imagen: 'img.jpg' }, 
        cantidad: 2 
    }
];

// --- Suite de Pruebas ---
describe("Componente Checkout", () => {

    beforeEach(() => {
        Storage.prototype.getItem = jest.fn((key) => {
            if (key === 'cartId') return '1'; 
            return null;
        });
        Storage.prototype.removeItem = jest.fn();
        
        axios.get.mockClear();
        axios.post.mockClear();
        mockNavigate.mockClear();
        
        axios.get.mockResolvedValue({ 
            data: { items: mockCartItems } 
        });
    });

    it("debe cargar y mostrar los items del carrito al renderizar", async () => {
        render(<MemoryRouter>
          <Checkout />
          </MemoryRouter>);

        // --- SOLUCIÓN ---
        // 1. Espera a que el texto "Polera Test (x2)" APAREZCA.
        // `findByText` es una combinación de `find` (espera) y `getByText` (busca).
        waitFor(async () => {
            const itemText = await screen.getByText("Polera Test (x2)");

            expect(itemText).toBeInTheDocument();
        });

        // 3. Ahora verificar (sin 'await') que la API fue llamada.
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/v1/carrito/1');
    });
    
    it("debe llamar a la API de 'crearOrden' y redirigir al hacer clic en Pagar", async () => {
        
        axios.post.mockResolvedValue({ 
            data: { id: 123, nombre: 'Pedro' } 
        });
        
        render(
            <MemoryRouter initialEntries={['/checkout']}>
                <Routes>
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/gracias" element={<div>¡Pago Exitoso!</div>} />
                </Routes>
            </MemoryRouter>
        );
    

        // --- SOLUCIÓN: Simula rellenar el formulario usando getByLabelText ---
        // La 'i' ignora mayúsculas/minúsculas y el '*'
        // ...
        // --- SOLUCIÓN: Simula rellenar el formulario usando getByRole ---
        // Busca un 'textbox' (un input) que esté asociado a una label con el texto "Nombre"
        fireEvent.change(await screen.findByTestId('nombre-input'), { 
            target: { value: 'Pedro' } 
        });
        
        // El input de email también es un 'textbox'
        fireEvent.change(await screen.findByTestId('correo-input'), { 
            target: { value: 'pedro@test.com' } 
        });
        
        fireEvent.change(await screen.findByTestId('calle-input'), { 
            target: { value: 'Calle Falsa 123' } 
        });

        // Clic en el botón Pagar
        fireEvent.click(screen.getByRole('button', { name: /Pagar ahora/i }));

        // Espera a que la API 'POST' sea llamada (AHORA SÍ FUNCIONA)
        await waitFor(() => {

            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:8080/api/v1/orden/crear/1', 
                expect.objectContaining({ nombre: 'Pedro', correo: 'pedro@test.com' }) 
            );
        });


        expect(localStorage.removeItem).toHaveBeenCalledWith('cartId');
        
      
        expect(mockNavigate).toHaveBeenCalledWith('/pagorealizado/123');
      });
    });