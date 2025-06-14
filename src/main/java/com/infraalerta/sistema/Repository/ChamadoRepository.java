package com.infraalerta.sistema.Repository;

import com.infraalerta.sistema.Model.Chamado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChamadoRepository extends JpaRepository<Chamado, Long> {

}
