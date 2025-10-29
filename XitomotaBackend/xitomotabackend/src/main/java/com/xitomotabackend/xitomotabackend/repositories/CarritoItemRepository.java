package com.xitomotabackend.xitomotabackend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xitomotabackend.xitomotabackend.entities.CarritoItem;

@Repository
public interface CarritoItemRepository extends JpaRepository<CarritoItem, Long> {

    Optional<CarritoItem> findByCarritoIdAndProductoId(Long carritoId, Long productoId);
    
}
