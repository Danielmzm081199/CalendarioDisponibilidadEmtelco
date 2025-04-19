package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import entity.UserEvent;
import repository.UserEventRepository;

@Service
public class UserEventService {

    @Autowired
    private UserEventRepository repository;

    public List<UserEvent> getEventsByArea(String area) {
        return repository.findByArea(area);
    }

    public UserEvent saveEvent(UserEvent event) {
        return repository.save(event);
    }

    public void deleteEvent(Long id) {
        repository.deleteById(id);
    }
}
