package com.xitomotabackend.xitomotabackend.repositories;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.xitomotabackend.xitomotabackend.entities.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    List<Producto> findByCategoria(String categoria);
    List<Producto> findByStockLessThanEqual(int stockLevel);
}
