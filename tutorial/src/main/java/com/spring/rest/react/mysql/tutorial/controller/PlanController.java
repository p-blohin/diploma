package com.spring.rest.react.mysql.tutorial.controller;

import com.spring.rest.react.mysql.tutorial.model.*;
import com.spring.rest.react.mysql.tutorial.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8082")
@RestController
@RequestMapping("/api")
public class PlanController {

    @Autowired
    PlanRepository planRepository;
    @Autowired
    DepartmentRepository departmentRepository;
    @Autowired
    AuItemRepository auItemRepository;
    @Autowired
    AssemblyUnitRepository assemblyUnitRepository;
    @Autowired
    DepartmentItemRepository departmentItemRepository;
    @Autowired
    TaskRepository taskRepository;

    @GetMapping("/plans/{depid}")
    public ResponseEntity<List<Plan>> getPlansByDepartment(@PathVariable(value = "department_id") long depid) {
        Optional<Department> chosenDepId = departmentRepository.findById(depid);

        try {
            List<Plan> plans = new ArrayList<Plan>();
            if (chosenDepId.isPresent()) {
                planRepository.findByDepartmentContaining(chosenDepId.get()).forEach(plans::add);
            } else {
                planRepository.findAll().forEach(plans::add);
            }

            if (plans.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(plans, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/tasks/active")
    public ResponseEntity<List<Plan>> createPlan(@RequestBody Task chosenTask) {
        //Task chosenTask = taskRepository.getOne(task_id.getId());
        List<AuItem> relatedItems = auItemRepository.findAllByAuid(chosenTask.getProduct());
        List<DepartmentItem> departmentItems = departmentItemRepository.findAll();
        List<Plan> plans = null;
        try {
            for (AuItem auItem : relatedItems) {
                Item relatedItem = auItem.getIid();
                for (DepartmentItem depItem : departmentItems) {
                    if (relatedItem == depItem.getIid()) {
                        int itemQuantity = auItem.getQuantity() * chosenTask.getContract().getQuantity();
                        Plan plan = new Plan(chosenTask, chosenTask.getProduct(), relatedItem, depItem.getDepid(), itemQuantity);
                        plans.add(plan);
                    }
                }
            }
            planRepository.saveAll(plans);
            return new ResponseEntity<>(plans, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/plans/{depid}/{id}")
    public ResponseEntity<Plan> updatePlan(@PathVariable("id") long id, @RequestBody Plan plan) {
        Optional<Plan> planData = planRepository.findById(id);

        if (planData.isPresent()) {
            Plan _plan = planData.get();
            _plan.setTask(plan.getTask());
            _plan.setProduct(plan.getProduct());
            _plan.setItem(plan.getItem());
            _plan.setDepartment(plan.getDepartment());
            _plan.setQuantity(plan.getQuantity());
            return new ResponseEntity<>(planRepository.save(_plan), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/plans/{id}")
    public ResponseEntity<HttpStatus> deletePlan(@PathVariable("id") long id) {
        try {
            planRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
