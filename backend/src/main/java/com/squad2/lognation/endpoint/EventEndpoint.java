package com.squad2.lognation.endpoint;

import com.squad2.lognation.endpoint.dto.SearchCriteriaDto;
import com.squad2.lognation.enums.EnvironmentEnum;
import com.squad2.lognation.enums.FilterKeyEnum;
import com.squad2.lognation.model.Event;
import com.squad2.lognation.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventEndpoint {

    @Autowired
    private EventService eventService;

    @PostMapping("/findEvents")
    public ResponseEntity<Page<Event>> findEvents(
            @RequestParam(value="pageNo", defaultValue="0", required=true) Integer pageNo,
            @RequestParam(value="linesPerPage", defaultValue="50", required=true) Integer linesPerPage,
            @RequestParam(value="orderByField", defaultValue="createdAt", required=true) String orderByField,
            @RequestParam(value="orderByDirection", defaultValue="ASC", required=true) String orderByDirection,
            @Valid @RequestBody(required=false) SearchCriteriaDto searchCriteriaDto
    ) {

        EnvironmentEnum environment = EnvironmentEnum.PRODUCTION;
        FilterKeyEnum filterKey = FilterKeyEnum.NONE;
        String filterValue = "";

        if (searchCriteriaDto != null) {
            environment = searchCriteriaDto.getEnvironment();
            filterKey = searchCriteriaDto.getFilterKey();
            filterValue = searchCriteriaDto.getFilterValue();
        }

        Page<Event> resultList = eventService.findEvents(
                pageNo,
                linesPerPage,
                orderByField,
                orderByDirection,
                environment,
                filterKey,
                filterValue);

        return ResponseEntity.ok().body(resultList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> findById(@PathVariable Long id) {
        Event event = eventService.findById(id);
        return ResponseEntity.ok().body(event);
    }

    @GetMapping("/{id}/findPrior")
    public ResponseEntity<Event> findPriorById(@PathVariable Long id) {
        Event event = eventService.findPriorById(id);
        return ResponseEntity.ok().body(event);
    }

    @GetMapping("/{id}/findNext")
    public ResponseEntity<Event> findNextById(@PathVariable Long id) {
        Event event = eventService.findNextById(id);
        return ResponseEntity.ok().body(event);
    }

    @PostMapping("/shelveMany")
    public ResponseEntity<Void> shelveMany(@RequestBody List<Long> eventIdList) {
        eventService.shelveMany(eventIdList);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/deleteMany")
    public ResponseEntity<Void> deleteMany(@RequestBody List<Long> eventIdList) {
        eventService.deleteMany(eventIdList);
        return ResponseEntity.noContent().build();
    }

}
