package Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import BackendCaledario.Backend.Model.Usuario;
import Repository.UsuarioRepository;


@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Registro
    public Usuario registrarUsuario(Usuario usuario) {
        // Aquí podrías encriptar la contraseña si lo deseas (recomendado en producción)
        return usuarioRepository.save(usuario);
    }

    // Autenticación (login)
    public Optional<Usuario> autenticarUsuario(String username, String contrasena) {
        Optional<Usuario> usuario = usuarioRepository.findByUsername(username);
        if (usuario.isPresent() && usuario.get().getContrasena().equals(contrasena)) {
            return usuario;
        }
        return Optional.empty();
    }

    // Obtener usuario por ID (opcional para el futuro)
    public Optional<Usuario> obtenerPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    //obtener todos los usuarios
    public Iterable<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public void actualizarUsuario(Usuario usuario) {
        usuarioRepository.save(usuario);
    }
       
}