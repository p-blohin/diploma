package com.spring.rest.react.mysql.tutorial.repository;

import com.spring.rest.react.mysql.tutorial.model.AssemblyUnit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssemblyUnitRepository extends JpaRepository<AssemblyUnit, Long> {
    List<AssemblyUnit> findByDecimalNumberContaining(String decimalNumber);
    List<AssemblyUnit> findByNameContaining(String name);
}