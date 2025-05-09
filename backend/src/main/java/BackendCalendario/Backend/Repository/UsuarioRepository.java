package Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import BackendCaledario.Backend.Model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Optional<Usuario> findByUsername(String username);
}