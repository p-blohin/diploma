package com.spring.rest.react.mysql.tutorial.repository;

import com.spring.rest.react.mysql.tutorial.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartmentRepository  extends JpaRepository<Department, Long> {
    List<Department> findByDepartmentContaining(String department);
}
