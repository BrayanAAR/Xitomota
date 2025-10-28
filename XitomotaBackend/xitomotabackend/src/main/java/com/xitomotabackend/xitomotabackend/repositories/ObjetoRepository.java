package com.xitomotabackend.xitomotabackend.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.xitomotabackend.xitomotabackend.entities.Objeto;

@Repository
public interface ObjetoRepository extends JpaRepository<Objeto, Long> {

}
