package com.squad2.lognation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class LognationApplication {

	public static void main(String[] args) {
		SpringApplication.run(LognationApplication.class, args);
	}

}
