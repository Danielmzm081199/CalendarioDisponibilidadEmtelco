package Controller;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import BackendCaledario.Backend.Model.Usuario;
import Service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*") // Habilita peticiones desde cualquier origen (para desarrollo)
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Consultar todos los usuarios
    @GetMapping("/usuarios")
    public ResponseEntity<list<Usuario>> obtenerUsuarios() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    // Registro de nuevo usuario
    @PostMapping("/registro")
    public ResponseEntity<Usuario> registrarUsuario(@Valid @RequestBody Usuario usuario) {
        Usuario registrado = usuarioService.registrarUsuario(usuario);
        return ResponseEntity.ok(registrado);
    }

    // Login de usuario
    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Usuario credenciales) {
        Optional<Usuario> usuario = usuarioService.autenticarUsuario(
            credenciales.getUsername(), credenciales.getContrasena()
        );

        return usuario.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.status(401).build()); // 401 si no hay coincidencia
    }
}
