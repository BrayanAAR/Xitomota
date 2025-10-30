package com.xitomotabackend.xitomotabackend.repositories;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.xitomotabackend.xitomotabackend.entities.Producto;

@Repository
public interface ProductoRepository extends PagingAndSortingRepository<Producto, Long>, JpaRepository<Producto, Long> {

    List<Producto> findByCategoriaNombreIgnoreCase(String nombreCategoria);
    List<Producto> findByStockLessThanEqual(int stockLevel);
    boolean existsByCategoriaId(Long categoriaId);


}
