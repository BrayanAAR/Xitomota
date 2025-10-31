import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TarjetaProducto from '../../../src/Paginas/Productos/TarjetaProducto';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom'; 


jest.mock('axios'); 


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));


window.alert = jest.fn();


const mockProducto = {
    id: 1,
    nombre: "Polera de Prueba",
    precio: 12990,
    stock: 10,
    imagen: "polera.jpg",
    categoria: { id: 1, nombre: "Poleras" }
};
const mockProductoAgotado = {
    id: 2,
    nombre: "Polera Agotada",
    precio: 9990,
    stock: 0,
    imagen: "agotada.jpg",
    categoria: { id: 1, nombre: "Poleras" }
};


describe("Componente TarjetaProducto", () => {
    

    beforeEach(() => {
        jest.clearAllMocks(); 
    });


    it("debe mostrar el nombre, precio y stock correcto", () => {
        const mockProducto1 = {
            id: 1,
            nombre: "Polera de Prueba",
            precio: 12990,
            stock: 20, 
            imagen: "polera.jpg",
            categoria: { id: 1, nombre: "Poleras" }
        };
        render(<MemoryRouter><TarjetaProducto producto={mockProducto1} /></MemoryRouter>);

        expect(screen.getByText("Polera de Prueba")).toBeInTheDocument();
        expect(screen.getByText("$12.990")).toBeInTheDocument();
        expect(screen.getByText("Stock disponible: 20")).toBeInTheDocument();
    });


    it("debe mostrar 'AGOTADO' si el stock es 0", () => {
        render(<MemoryRouter><TarjetaProducto producto={mockProductoAgotado} /></MemoryRouter>);

        expect(screen.getByText(/agotado/i, { selector: 'p' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /agotado/i })).toBeDisabled();
    });


    it("debe limitar la cantidad del input al stock máximo", async () => {
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
        render(<MemoryRouter><TarjetaProducto producto={mockProducto} /></MemoryRouter>);

        const inputCantidad = screen.getByRole('spinbutton', { name: "Cantidad" });
        await userEvent.clear(inputCantidad);
        await userEvent.type(inputCantidad, "20"); 
        expect(inputCantidad).toHaveValue(10); 
        expect(alertMock).toHaveBeenCalledWith(
            expect.stringContaining('No puedes seleccionar más')
        );
        alertMock.mockRestore();
    });

    it("debe llamar a axios.post con la cantidad correcta si hay cartId", async () => {
        
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('123');
        axios.post.mockResolvedValue({});
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

        render(<MemoryRouter><TarjetaProducto producto={mockProducto} /></MemoryRouter>);

        const inputCantidad = screen.getByRole('spinbutton', { name: "Cantidad" });
        
        fireEvent.change(inputCantidad, { target: { value: '3' } });
        
        fireEvent.click(screen.getByRole('button', { name: "Agregar al Carrito" }));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:8080/api/v1/carrito/123/add/1',
                null,
                { params: { cantidad: 3 } }
            );
        });
        expect(alertMock).toHaveBeenCalledWith("¡3 Polera de Prueba agregado al carrito!");

        alertMock.mockRestore();
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockClear();
    });

    it("debe mostrar alerta y NO llamar a axios si no hay cartId", () => {
        
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(null);
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

        render(<MemoryRouter><TarjetaProducto producto={mockProducto} /></MemoryRouter>);

        fireEvent.click(screen.getByRole('button', { name: "Agregar al Carrito" }));


        expect(alertMock).toHaveBeenCalledWith(
            "Error, no se pudo encontrar el carrito. Visita la página del carrito primero."
        );
        

        expect(axios.post).not.toHaveBeenCalled();


        alertMock.mockRestore();
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockClear();
    });


    test('debe mostrar alerta genérica si axios.post falla', async () => {
        

        const mockProducto = {
            id: 1, nombre: "Polera", precio: 1000, stock: 10,
            imagen: "img.jpg", categoria: { id: 1, nombre: "Poleras" }
        };

        jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('123');

        axios.post.mockRejectedValue(new Error("Error 500 de servidor")); 
        
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

        render(<MemoryRouter><TarjetaProducto producto={mockProducto} /></MemoryRouter>);

        fireEvent.click(screen.getByRole('button', { name: "Agregar al Carrito" }));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalled();
        });

        expect(alertMock).toHaveBeenCalledWith("No se pudo agregar el producto.");
        
        expect(consoleErrorMock).toHaveBeenCalled();

        alertMock.mockRestore();
        consoleErrorMock.mockRestore();
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockClear();
    });

    // ... (Tus otros tests) ...

    // --- TEST NUEVO (PARA CUBRIR LA LÍNEA AMARILLA) ---
    test('debe forzar la cantidad a 1 si el usuario ingresa 0 o un negativo', async () => {
        
        // A. Arrange
        const mockProducto = {
            id: 1, nombre: "Polera", precio: 1000, stock: 10,
            imagen: "img.jpg", categoria: { id: 1, nombre: "Poleras" }
        };

        render(<MemoryRouter><TarjetaProducto producto={mockProducto} /></MemoryRouter>);

        // B. Act
        const inputCantidad = screen.getByRole('spinbutton', { name: "Cantidad" });
        
        // Usamos fireEvent.change para setear el valor directamente a "0"
        fireEvent.change(inputCantidad, { target: { value: '0' } });

        // C. Assert
        // Tu lógica 'handleCantidadCambiar' (Math.max(1, ...)) 
        // debe haber forzado el valor de vuelta a '1'.
        expect(inputCantidad).toHaveValue(1);
        
        // (Opcional) Prueba también con un negativo
        fireEvent.change(inputCantidad, { target: { value: '-5' } });
        expect(inputCantidad).toHaveValue(1);
    });
});