import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom'; // Necesario para <Link> y useNavigate
import axios from 'axios'; // Necesario para simularlo

import Carrito from '../../../src/Paginas/Carrito/Carrito'; // Ajusta la ruta a tu componente

// --- 1. SIMULACIONES (Mocks) ---
jest.mock('axios'); // Simula todas las funciones de axios

// Simula la navegación (useNavigate)
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Usa el resto de la librería real
    useNavigate: () => mockNavigate, // Pero reemplaza useNavigate por nuestra simulación
}));

// --- 2. DATOS FALSOS ---
// Un carrito falso que simula la respuesta de la API
const mockCarrito = {
    id: 1,
    items: [
        { 
            id: 101, // ID del CarritoItem
            producto: { id: 1, nombre: 'Polera de Prueba', precio: 10000, imagen: 'img1.jpg' }, 
            cantidad: 2 
        },
        { 
            id: 102, // ID del CarritoItem
            producto: { id: 2, nombre: 'Buzo de Prueba', precio: 5000, imagen: 'img2.jpg' }, 
            cantidad: 1 
        }
    ]
};

// --- 3. FUNCIÓN DE AYUDA (copiada de tu componente) ---
// La necesitamos para verificar el total
const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(precio || 0);
};

// --- Inicio de la Suite de Pruebas ---
describe("Componente Carrito", () => {

    beforeEach(() => {
        // Limpia todas las simulaciones antes de cada prueba
        axios.get.mockClear();
        axios.post.mockClear();
        axios.put.mockClear();
        axios.delete.mockClear();
        mockNavigate.mockClear();
        
        // Simula localStorage (por defecto, simula que hay un cartId)
        Storage.prototype.getItem = jest.fn((key) => {
            if (key === 'cartId') return '1'; // Simula cartId = 1
            return null;
        });
        Storage.prototype.setItem = jest.fn();
        Storage.prototype.removeItem = jest.fn();
    });

    // --- Prueba 1: Cargar carrito existente ---
    it("debe cargar y mostrar los items de un carrito existente", async () => {
        
        // A. Arrange: Simula que la API GET devuelve el carrito falso
        axios.get.mockResolvedValue({ data: mockCarrito });

        // B. Act: Renderiza el componente
        render(<MemoryRouter><Carrito /></MemoryRouter>);

        // C. Assert
        // Espera a que aparezca el primer producto (porque 'useEffect' es async)
        expect(await screen.findByText("Polera de Prueba")).toBeInTheDocument();
        
        // Verifica que la API fue llamada correctamente
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/v1/carrito/1');
        
        // Verifica que el segundo producto también esté
        expect(screen.getByText("Buzo de Prueba")).toBeInTheDocument();
        
        // Verifica que el total es correcto (10000*2 + 5000*1 = 25000)
        const total = formatearPrecio(25000);
        expect(screen.getByText(`Total: ${total}`)).toBeInTheDocument();
    });

    // --- Prueba 2: Crear carrito nuevo ---
    it("debe crear un carrito nuevo si no existe cartId en localStorage", async () => {
        
        // A. Arrange:
        // Sobrescribe el mock de localStorage SÓLO para este test
        Storage.prototype.getItem = jest.fn(() => null); 
        // Simula la respuesta de la API de "crear"
        axios.post.mockResolvedValue({ data: { id: 123, items: [] } });

        // B. Act
        render(<MemoryRouter><Carrito /></MemoryRouter>);

        // C. Assert
        // Espera a que la API POST sea llamada
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/v1/carrito/crear');
        });

        // Verifica que el nuevo ID se guardó en localStorage
        expect(localStorage.setItem).toHaveBeenCalledWith('cartId', 123);
        
        // Verifica que se muestra el mensaje de carrito vacío
        // ...
        // Verifica que se muestra el mensaje de carrito vacío
        expect(await screen.findByText("El carrito está vacío.")).toBeInTheDocument();
    });

    // --- Prueba 3: Eliminar un item ---
    it("debe llamar a la API de 'eliminarItem' al hacer clic en Eliminar", async () => {
        
        // A. Arrange:
        // 1. Simula la carga inicial
        axios.get.mockResolvedValue({ data: mockCarrito });
        // 2. Simula la respuesta OK de la API de borrado
        axios.delete.mockResolvedValue({}); 
        // 3. Simula la respuesta de "recargar" (devuelve el carrito sin el item)
        const carritoPostDelete = {
            id: 1,
            items: [ mockCarrito.items[1] ] // Solo el Buzo
        };
        axios.get.mockResolvedValueOnce({ data: mockCarrito }) // Primera llamada (carga)
                 .mockResolvedValueOnce({ data: carritoPostDelete }); // Segunda llamada (recarga)

        // B. Act
        render(<MemoryRouter><Carrito /></MemoryRouter>);

        // Espera a que los items carguen
        expect(await screen.findByText("Polera de Prueba")).toBeInTheDocument();
        
        // Encuentra TODOS los botones "Eliminar"
        const botonesEliminar = screen.getAllByRole('button', { name: /Eliminar/i });
        
        // Simula el clic en el primer botón (el de la Polera, ID 101)
        fireEvent.click(botonesEliminar[0]);

        // C. Assert
        // Espera a que la API DELETE sea llamada con el ID correcto
        await waitFor(() => {
            expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/api/v1/carrito/item/101');
        });

        // Verifica que el carrito se recargó (axios.get fue llamado 2 veces)
        expect(axios.get).toHaveBeenCalledTimes(2);
    });

    // ... (Dentro del 'describe')

    // --- TEST NUEVO (PARA FALLO DE CARGA) ---
    it("debe mostrar un mensaje si la API falla al cargar el carrito", async () => {
        
        // A. Arrange
        // Simula que localStorage SÍ tiene un cartId
        Storage.prototype.getItem = jest.fn(() => '1');
        // ¡Simula que axios.get RECHAZA la petición!
        axios.get.mockRejectedValue(new Error("Error de red 500"));

        // Silencia el 'console.error' que esperamos que ocurra
        jest.spyOn(console, 'error').mockImplementation(() => {});

        // B. Act
        render(<MemoryRouter><Carrito /></MemoryRouter>);

        // C. Assert
        // El 'useEffect' fallará, 'isLoading' se pondrá en 'false'
        // y el carrito quedará vacío.
        expect(await screen.findByText("El carrito está vacío.")).toBeInTheDocument();
        
        // Verifica que la API fue llamada
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/v1/carrito/1');
        // Verifica que el error se imprimió en la consola
        expect(console.error).toHaveBeenCalled();
        
        // Restaura el console.error
        console.error.mockRestore();
    });

    it("debe llamar a la API de 'cambiarCantidad' al hacer clic en '+'", async () => {
        
        // A. Arrange
        // 1. Simula la carga inicial
        axios.get.mockResolvedValue({ data: mockCarrito });
        // 2. Simula la respuesta OK de la API de 'PUT' (actualizar)
        axios.put.mockResolvedValue({});
        // 3. Simula la respuesta de "recargar" (no es 100% necesario, pero es bueno)
        axios.get.mockResolvedValueOnce({ data: mockCarrito }); // 1ra llamada (carga)
        axios.get.mockResolvedValueOnce({ data: mockCarrito }); // 2da llamada (recarga)

        render(<MemoryRouter><Carrito /></MemoryRouter>);
        
        // Espera a que los items carguen
        expect(await screen.findByText("Polera de Prueba")).toBeInTheDocument();
        
        // Encuentra TODOS los botones "+"
        const botonesMas = screen.getAllByRole('button', { name: "+" });
        
        // B. Act
        // Simula el clic en el primer botón "+" (el de la Polera, cantidad actual 2)
        fireEvent.click(botonesMas[0]);

        // C. Assert
        // Espera a que la API PUT sea llamada con el ID correcto (101) y la nueva cantidad (3)
        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith(
                'http://localhost:8080/api/v1/carrito/item/101', // URL
                null, // Body
                { params: { cantidad: 3 } } // Params (2 + 1 = 3)
            );
        });
    })

});