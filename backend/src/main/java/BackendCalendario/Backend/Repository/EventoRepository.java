package Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import BackendCaledario.Backend.Model.Evento;

// trae el repositorio de JPA
public interface EventoRepository extends JpaRepository<Evento, Long> {
    List<Evento> findByArea(String area);
}
