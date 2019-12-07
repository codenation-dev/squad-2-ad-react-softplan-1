package com.squad2.lognation.core.config;

import com.google.common.collect.Lists;
import com.squad2.lognation.core.localization.LocalizationTranslator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Date;
import java.util.List;

import static springfox.documentation.builders.PathSelectors.regex;

@Configuration
@EnableSwagger2
@Import(springfox.bean.validators.configuration.BeanValidatorPluginsConfiguration.class)
public class SwaggerConfig {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String DEFAULT_INCLUDE_PATTERN = "/api/.*";
    private static final String LOCALE_CODE_SWAGGER_DESCRIPTION = "SwaggerConfig.Description";

    @Bean
    public Docket getApiDocket() {

        Docket docket = new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(getApiInfo())
                .pathMapping("/")
                .forCodeGeneration(true)
                .genericModelSubstitutes(ResponseEntity.class)
                .ignoredParameterTypes(Pageable.class)
                .ignoredParameterTypes(java.sql.Date.class)
                .directModelSubstitute(java.time.LocalDate.class, java.sql.Date.class)
                .directModelSubstitute(java.time.ZonedDateTime.class, Date.class)
                .directModelSubstitute(java.time.LocalDateTime.class, Date.class)
                .securityContexts(Lists.newArrayList(securityContext()))
                .securitySchemes(Lists.newArrayList(apiKey()))
                .useDefaultResponseMessages(false);

        docket = docket.select()
                .paths(regex(DEFAULT_INCLUDE_PATTERN))
                .build();

        return docket;
    }

    private ApiInfo getApiInfo() {
        return new ApiInfoBuilder()
                .title("Lognation REST API")
                .description(LocalizationTranslator.toLocale(LOCALE_CODE_SWAGGER_DESCRIPTION))
                .contact(new Contact("Squad2", "www.lognationsquad2.com.br", "lognationsquad2@gmail.com"))
                .version("1.0.0")
                .license("Apache License Version 2.0")
                .licenseUrl("http://www.apache.org/licenses/LICENSE-2.0")
                .build();
    }

    private ApiKey apiKey() {
        return new ApiKey("JWT", AUTHORIZATION_HEADER, "header");
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder()
                .securityReferences(defaultAuth())
                .forPaths(regex(DEFAULT_INCLUDE_PATTERN))
                .build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope
                = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Lists.newArrayList(
                new SecurityReference("JWT", authorizationScopes));
    }

}