package com.xitomotabackend.xitomotabackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xitomotabackend.xitomotabackend.entities.Orden;
import java.util.List;


@Repository
public interface OrdenRepository extends JpaRepository<Orden, Long> {

    List<Orden> findByCorreo(String correo);

}
