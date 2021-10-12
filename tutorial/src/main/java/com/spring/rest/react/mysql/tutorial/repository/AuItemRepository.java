package com.spring.rest.react.mysql.tutorial.repository;

import com.spring.rest.react.mysql.tutorial.model.AssemblyUnit;
import com.spring.rest.react.mysql.tutorial.model.AuItem;
import com.spring.rest.react.mysql.tutorial.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuItemRepository extends JpaRepository<AuItem, Long> {
    List<AuItem> findAuItemsByAuid(AssemblyUnit auid);
    List<AuItem> findAllByAuid(AssemblyUnit auid);
}
