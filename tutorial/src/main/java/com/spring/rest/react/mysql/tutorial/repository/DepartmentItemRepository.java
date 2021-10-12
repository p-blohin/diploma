package com.spring.rest.react.mysql.tutorial.repository;

import com.spring.rest.react.mysql.tutorial.model.Department;
import com.spring.rest.react.mysql.tutorial.model.DepartmentItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartmentItemRepository extends JpaRepository<DepartmentItem, Long> {
    List<DepartmentItem> findDepartmentItemsByDepid(Department depid);
}
