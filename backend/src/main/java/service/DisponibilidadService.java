package service;

import entity.Disponibilidad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.DisponibilidadRepository;

import java.time.LocalDate;

@Service
public class DisponibilidadService {
    @Autowired
    private DisponibilidadRepository disponibilidadRepository;

    public Disponibilidad asignarResponsable(LocalDate fecha, String responsable) {
        if (disponibilidadRepository.findByFecha(fecha).isPresent()) {
            throw new RuntimeException("Ya hay un responsable asignado para este día.");
        }
        Disponibilidad disponibilidad = new Disponibilidad();
        disponibilidad.setFecha(fecha);
        disponibilidad.setResponsable(responsable);
        return disponibilidadRepository.save(disponibilidad);
    }
}