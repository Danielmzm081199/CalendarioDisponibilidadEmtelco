package repository;

import entity.Disponibilidad;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.Optional;

public interface DisponibilidadRepository extends JpaRepository <Disponibilidad,Long>{

    Optional<Disponibilidad> findByFecha(LocalDate fecha);
}

