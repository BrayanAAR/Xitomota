package com.xitomotabackend.xitomotabackend.repositories;

import com.xitomotabackend.xitomotabackend.entities.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarritoRepository extends JpaRepository<Carrito, Long> {
}