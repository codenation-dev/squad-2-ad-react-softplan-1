package com.squad2.lognation.endpoint;

import com.squad2.lognation.enums.FilterKeyEnum;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/filterkeys")
public class FilterKeyEndpoint {

    @GetMapping
    public ResponseEntity<List<FilterKeyEnum>> findAll() {
        return ResponseEntity.ok().body(Arrays.asList(FilterKeyEnum.values()));
    }

}
