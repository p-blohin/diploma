package com.spring.rest.react.mysql.tutorial.repository;

import com.spring.rest.react.mysql.tutorial.model.Department;
import com.spring.rest.react.mysql.tutorial.model.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    List<Plan> findByDepartmentContaining(Department dep_id);
}