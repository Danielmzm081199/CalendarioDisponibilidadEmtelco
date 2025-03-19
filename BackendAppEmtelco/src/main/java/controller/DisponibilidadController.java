package controller;
import entity.Disponibilidad;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.DisponibilidadService;

@RestController
@RequestMapping("/api/disponibilidad")

public class DisponibilidadController {
    @Autowired
    private DisponibilidadService disponibilidadService;

    @PostMapping
    public ResponseEntity<Disponibilidad> asignarResponsable(@RequestBody Disponibilidad disponibilidad) {
        Disponibilidad nuevaDisponibilidad = disponibilidadService.asignarResponsable(disponibilidad.getFecha(), disponibilidad.getResponsable());
        return ResponseEntity.ok(nuevaDisponibilidad);
    }
}