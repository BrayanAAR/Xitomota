import React from "react";
import { render, screen } from "@testing-library/react";
import Blogs from "../../../src/Paginas/Blogs/Blogs";

describe("Blogs Component", () => {
  test("muestra el título principal", () => {
    render(<Blogs />);
    expect(screen.getByText(/Noticias importantes/i)).toBeInTheDocument();
  });

  test("muestra los títulos de los artículos", () => {
    render(<Blogs />);
    expect(screen.getByText(/Caso Curioso/i)).toBeInTheDocument();
    expect(screen.getByText(/Ropa de calidad/i)).toBeInTheDocument();
  });

  test("tiene imágenes con el alt correcto", () => {
    render(<Blogs />);
    expect(screen.getByAltText(/Cerrando el trato con Dunder Mifflin/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Michael Scott durmiendo en un sofá/i)).toBeInTheDocument();
  });
});
