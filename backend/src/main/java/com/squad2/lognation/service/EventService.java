package com.squad2.lognation.service;

import com.squad2.lognation.core.exception.StandardException;
import com.squad2.lognation.enums.EnvironmentEnum;
import com.squad2.lognation.enums.FilterKeyEnum;
import com.squad2.lognation.model.Event;
import com.squad2.lognation.repository.EventRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class EventService extends BaseService<Event, EventRepository> {

    private void validateFilterValue(String filterValue) {
        if (StringUtils.isEmpty(filterValue)) {
            throw new StandardException("M00017");
        }
    }

     public void shelve(Long eventId) {
        Event event = findById(eventId);
        if (event.getShelved()) {
            throw new StandardException("M00015");
        }
        event.setShelved(true);
        update(event);
    }

    public void shelveMany(List<Long> eventIdList) {
        for (Long eventId : eventIdList) {
            try {
                shelve(eventId);
            } catch (StandardException stdEx) {
                if (stdEx.getCode() != "M00015") {
                    throw stdEx;
                }
            }
        }
    }

    public void deleteMany(List<Long> eventIdList) {
        for (Long eventId : eventIdList) {
            delete(eventId);
        }
    }

    public Event findPriorById(Long currentId) {
        Event event = repository.findFirstByIdLessThanOrderByIdDesc(currentId);
        if (event == null) {
            throw new StandardException("M00010")
                    .setHttpStatus(HttpStatus.NOT_FOUND);
        }
         return event;
    }

    public Event findNextById(Long currentId) {
        Event event = repository.findFirstByIdGreaterThanOrderByIdAsc(currentId);
        if (event == null) {
            throw new StandardException("M00010")
                    .setHttpStatus(HttpStatus.NOT_FOUND);
        }
         return event;
    }

    public Page<Event> findEvents(
            Integer page,
            Integer linesPerPage,
            String orderBy,
            String direction,
            EnvironmentEnum environmentEnum,
            FilterKeyEnum filterKeyEnum,
            String filterValue) {

        PageRequest pageRequest = getPageRequest(page, linesPerPage, orderBy, direction);

        String environment = environmentEnum.name();

        if (filterKeyEnum != FilterKeyEnum.NONE) {
            validateFilterValue(filterValue);
        }

        switch (filterKeyEnum) {
            case DETAILS:
                return repository.findByEnvironmentAndDetails(environment, filterValue, pageRequest);
            case LEVEL:
                return repository.findByEnvironmentAndLevel(environment, filterValue, pageRequest);
            case ORIGIN:
                return repository.findByEnvironmentAndIpOrigin(environment, filterValue, pageRequest);
            default:
                return repository.findByEnvironment(environment, pageRequest);
        }
    }

}
