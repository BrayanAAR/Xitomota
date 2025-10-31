import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import DetalleProducto from '../../../src/Paginas/Productos/DetalleProducto';

jest.mock('axios');

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), 
    useParams: jest.fn(),    
    useNavigate: jest.fn(() => jest.fn()), 
}));

const mockProducto = {
    id: 1, 
    nombre: "Polera de Prueba",
    precio: 12990,
    stock: 10,
    imagen: "polera_prueba.jpg",
    categoria: { id: 1, nombre: "Poleras" }
};

describe("Componente DetalleProducto", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        
        useParams.mockReturnValue({ id: '1' });

        axios.get.mockResolvedValue({ data: mockProducto });
    });

    it("debe cargar y mostrar los detalles del producto", async () => {
        render(<DetalleProducto />);


        expect(await screen.findByText("Polera de Prueba")).toBeInTheDocument();

        expect(screen.getByText("$12.990")).toBeInTheDocument();
        expect(screen.getByText("¡Últimas 10 unidades!")).toBeInTheDocument();
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/v1/productos/1');
    });

    it("debe llamar a la API del carrito al hacer clic en 'Agregar'", async () => {

        axios.post.mockResolvedValue({ data: 'ok' });

        Storage.prototype.getItem = jest.fn(() => '123-cart-id');

        render(<DetalleProducto />);

        const boton = await screen.findByRole('button', { name: /Agregar al Carrito/i });
        
        fireEvent.click(boton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:8080/api/v1/carrito/123-cart-id/add/1', 
                null,
                { params: { cantidad: 1 } }
            );
        });
    });

    it("debe mostrar un mensaje de error si la API falla al cargar el producto", async () => {
    
        axios.get.mockRejectedValue(new Error("Error 500"));

        render(
            <MemoryRouter initialEntries={['/producto/1']}>
                <Routes>
                    <Route path="/producto/:id" element={<DetalleProducto />} />
                </Routes>
            </MemoryRouter>
        );

        expect(await screen.findByText("Producto no encontrado.")).toBeInTheDocument();
    });

    it("debe mostrar alerta si se agrega al carrito sin cartId", async () => {
        
        axios.get.mockResolvedValue({ data: mockProducto }); 
        
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(null);
        
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <MemoryRouter initialEntries={['/producto/1']}> 
                <Routes>
                    <Route path="/producto/:id" element={<DetalleProducto />} />
                </Routes>
            </MemoryRouter>
        );

        await screen.findByText(mockProducto.nombre);

        fireEvent.click(screen.getByRole('button', { name: /Agregar al Carrito/i }));

        expect(alertMock).toHaveBeenCalledTimes(1); 
        expect(alertMock).toHaveBeenCalledWith("Error, no se pudo encontrar el carrito. Visita la página del carrito primero.")
        expect(axios.post).not.toHaveBeenCalled();

        alertMock.mockRestore();
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockClear();
    });


    it("debe limitar la cantidad del input al stock máximo", async () => {
    
    axios.get.mockResolvedValue({ data: mockProducto }); 
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
        <MemoryRouter initialEntries={['/producto/1']}>
            <Routes>
                <Route path="/producto/:id" element={<DetalleProducto />} />
            </Routes>
        </MemoryRouter>
    );

    await screen.findByText(mockProducto.nombre);

    const inputCantidad = screen.getByLabelText("Cantidad:");
    await userEvent.clear(inputCantidad);
    await userEvent.type(inputCantidad, "20");

    expect(inputCantidad).toHaveValue(10); 
    expect(alertMock).toHaveBeenCalledWith(expect.stringContaining("No puedes seleccionar más"));

    alertMock.mockRestore();
    });
});