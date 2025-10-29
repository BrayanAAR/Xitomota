package com.xitomotabackend.xitomotabackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xitomotabackend.xitomotabackend.entities.OrdenItem;

@Repository
public interface OrdenItemRepository extends JpaRepository<OrdenItem, Long> {
    
}
