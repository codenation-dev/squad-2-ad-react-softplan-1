package com.squad2.lognation.endpoint;

import com.squad2.lognation.enums.EnvironmentEnum;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/environments")
public class EnvironmentEndpoint {

    @GetMapping
    public ResponseEntity<List<EnvironmentEnum>> findAll() {
        return ResponseEntity.ok().body(Arrays.asList(EnvironmentEnum.values()));
    }

}
