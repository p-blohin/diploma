package com.spring.rest.react.mysql.tutorial.repository;

import com.spring.rest.react.mysql.tutorial.model.AssemblyUnit;
import com.spring.rest.react.mysql.tutorial.model.Contract;
import com.spring.rest.react.mysql.tutorial.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByContractContaining(Contract name);
    List<Task> findByProduct(AssemblyUnit au_id);
}
