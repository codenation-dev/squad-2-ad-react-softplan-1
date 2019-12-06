package com.squad2.lognation.service;

import com.squad2.lognation.core.exception.StandardException;
import com.squad2.lognation.model.BasicModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;

import java.util.List;

public abstract class BaseService<T extends BasicModel, U extends JpaRepository> {

    @Autowired
    protected U repository;

    protected PageRequest getPageRequest(Integer page, Integer linesPerPage, String orderBy, String direction) {
        return PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction.toUpperCase()), orderBy);
    }

    protected void normalizeInsert(T domain) {

    }

    protected void normalizeUpdate(T domain) {

    }

    protected void validateInsert(T domain) {

    }

    protected void validateUpdate(T domain) {

    }

    protected void validate(T domain) {

    }

    protected void normalize(T domain) {

    }

    protected void afterSave(T domain) {

    }

    protected void afterInsert(T domain) {

    }

    protected void afterUpdate(T domain) {

    }

    protected void afterDelete(Long id) {

    }

    @SuppressWarnings("unchecked")
    private T save(T domain) {
        normalize(domain);
        validate(domain);
        domain = (T) repository.save(domain);
        afterSave(domain);
        return domain;
    }

    @SuppressWarnings("unchecked")
    public List<T> findAll() {
        return repository.findAll();
    }

    @SuppressWarnings("unchecked")
    public Page<T> findAllPaged(Integer page, Integer linesPerPage, String orderBy, String direction) {
        return repository.findAll(getPageRequest(page, linesPerPage, direction, orderBy));
    }

    @SuppressWarnings("unchecked")
    public T findById(Long id) {
        T domain = (T) repository.findById(id).orElse(null);
        if (domain == null) {
            throw new StandardException("M00010")
                    .setHttpStatus(HttpStatus.NOT_FOUND);
        }
        return domain;
    }

    @SuppressWarnings("unchecked")
    public Boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public T insert(T domain) {
        domain.setId(null);
        normalizeInsert(domain);
        validateInsert(domain);
        domain = save(domain);
        afterInsert(domain);
        return domain;
    }

    public T update(T domain) {
        normalizeUpdate(domain);
        validateUpdate(domain);
        domain = save(domain);
        afterUpdate(domain);
        return domain;
    }

    @SuppressWarnings("unchecked")
    public void delete(Long id) {
        findById(id);
        repository.deleteById(id);
        afterDelete(id);
    }
}
