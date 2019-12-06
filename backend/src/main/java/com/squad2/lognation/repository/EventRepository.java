package com.squad2.lognation.repository;

import com.squad2.lognation.model.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    //prior event
    Event findFirstByIdLessThanOrderByIdDesc(Long currentId);

    //next event
    Event findFirstByIdGreaterThanOrderByIdAsc(Long currentId);

    @Query("SELECT e " +
            "FROM Event e " +
            "WHERE ((lower(e.environment) = lower(?1)) or (lower(?1) = 'all'))")
    Page<Event> findByEnvironment(String environment, Pageable pageable);

    @Query("SELECT e " +
            "FROM Event e " +
            "WHERE ((lower(e.environment) = lower(?1)) or (lower(?1) = 'all')) and " +
            "lower(e.level) like lower(concat('%', ?2,'%'))")
    Page<Event> findByEnvironmentAndLevel(String environment, String level, Pageable pageable);

    @Query("SELECT e " +
            "FROM Event e " +
            "WHERE ((lower(e.environment) = lower(?1)) or (lower(?1) = 'all')) and " +
            "lower(e.details) like lower(concat('%', ?2,'%'))")
    Page<Event> findByEnvironmentAndDetails(String environment, String details, Pageable pageable);

    @Query("SELECT e " +
            "FROM Event e " +
            "WHERE ((lower(e.environment) = lower(?1)) or (lower(?1) = 'all')) and " +
            "lower(e.ipOrigin) like lower(concat('%', ?2,'%'))")
    Page<Event> findByEnvironmentAndIpOrigin(String environment, String ipOrigin, Pageable pageable);
}
