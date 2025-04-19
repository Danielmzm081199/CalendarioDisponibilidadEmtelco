package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import entity.UserEvent;
import service.UserEventService;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*") // para permitir acceso desde React
public class UserEventController {

    @Autowired
    private UserEventService service;

    @GetMapping("/{area}")
    public List<UserEvent> getEventsByArea(@PathVariable String area) {
        return service.getEventsByArea(area);
    }

    @PostMapping
    public UserEvent saveEvent(@RequestBody UserEvent event) {
        return service.saveEvent(event);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        service.deleteEvent(id);
    }
}
