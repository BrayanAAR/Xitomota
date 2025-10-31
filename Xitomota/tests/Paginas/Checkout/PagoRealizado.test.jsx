import React from 'react';
// Importa 'waitFor' para esperar la API
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PagoRealizado from '../../../src/Paginas/Checkout/PagoRealizado'; // (Ajusta la ruta a tu componente)
import axios from 'axios';
// Usamos MemoryRouter para simular la navegación y las rutas
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// --- Mocks (Simulaciones) ---
jest.mock('axios'); // Simula axios

// --- Datos Falsos ---
const mockOrden = {
    id: 123,
    nombre: "Juan",
    apellidos: "Lobo",
    correo: "juan.lobo@gmail.com",
    calle: "Calle Falsa 123",
    departamento: "Apto 4",
    region: "Metropolitana",
    comuna: "Cerrillos",
    indicaciones: "",
    total: 15990,
    items: [
        { 
            id: 1, 
            nombreProducto: "Buzo Estampado Gráfico", 
            precioUnitario: 15990, 
            cantidad: 1,
            imagenUrl: "buzo_estampado.jpg"
        }
    ]
};

// --- Suite de Pruebas ---
describe("Componente PagoRealizado", () => {

    beforeEach(() => {
        // Limpia las simulaciones
        axios.get.mockClear();
        
        // Simula la respuesta de 'axios.get' (al cargar la orden)
        axios.get.mockResolvedValue({ data: mockOrden });
    });

    it("debe cargar y mostrar los detalles de la orden", async () => {
        
        // A. Arrange (Preparar)
        // Renderizamos el componente dentro de un MemoryRouter
        // que simula la URL '/pagorealizado/123'
        render(
            <MemoryRouter initialEntries={['/pagorealizado/123']}>
                <Routes>
                    {/* La ruta debe coincidir con la de tu App.jsx */}
                    <Route path="/pagorealizado/:ordenId" element={<PagoRealizado />} />
                </Routes>
            </MemoryRouter>
        );

        // B. Act (Actuar)
        // Esperamos a que el título (que depende de la API) aparezca
        // ...
        // B. Act & C. Assert (Actuar y Verificar)
        
        // --- ¡SOLUCIÓN! ---
        // Usamos 'findByText' (que ya incluye la espera) 
        // y buscamos el TEXTO CORRECTO.
        // La 'i' al final ignora mayúsculas/minúsculas.
        const titulo = await screen.findByText(/Se ha realizado la compra. nro #123/i);
        
        // 1. Si encuentra el título, la espera fue exitosa
        expect(titulo).toBeInTheDocument();
        
        // 2. Ahora verificamos que la API fue llamada
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/v1/orden/123');

        // 3. Y verificamos el resto de los datos (que ya tenías)
        expect(screen.getByDisplayValue("Juan")).toBeInTheDocument();
        expect(screen.getByDisplayValue("juan.lobo@gmail.com")).toBeInTheDocument();
        expect(screen.getByText("Buzo Estampado Gráfico")).toBeInTheDocument();
// ...
        // expect(screen.getByText("$15.990")).toBeInTheDocument(); // (Cuidado si el precio se repite)
    });

    it("debe mostrar un error si la orden no se encuentra", async () => {
        // A. Arrange: Simula un error 404 de la API
        axios.get.mockRejectedValue(new Error("Error 404"));

        render(
            <MemoryRouter initialEntries={['/pagorealizado/999']}>
                <Routes>
                    <Route path="/pagorealizado/:ordenId" element={<PagoRealizado />} />
                </Routes>
            </MemoryRouter>
        );

        // B. Act & C. Assert
        // Esperamos a que aparezca el mensaje de error
        expect(await screen.findByText("Error: No se pudo encontrar la orden.")).toBeInTheDocument();
    });

});