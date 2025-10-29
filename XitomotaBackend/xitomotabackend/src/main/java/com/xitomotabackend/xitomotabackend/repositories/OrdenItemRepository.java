package com.xitomotabackend.xitomotabackend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.xitomotabackend.xitomotabackend.entities.OrdenItem;

@Repository
public interface OrdenItemRepository extends JpaRepository<OrdenItem, Long> {

    @Query("SELECT oi.nombreProducto, SUM(oi.cantidad)" +
            " FROM OrdenItem oi " +
            " GROUP BY oi.nombreProducto " +
            " ORDER BY SUM(oi.cantidad) DESC ")
    List<Object[]> findTopProductosVendidos();
    
}
