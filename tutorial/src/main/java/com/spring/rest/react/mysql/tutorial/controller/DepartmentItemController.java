package com.spring.rest.react.mysql.tutorial.controller;

import com.spring.rest.react.mysql.tutorial.model.Department;
import com.spring.rest.react.mysql.tutorial.model.DepartmentItem;
import com.spring.rest.react.mysql.tutorial.repository.DepartmentItemRepository;
import com.spring.rest.react.mysql.tutorial.repository.DepartmentRepository;
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
public class DepartmentItemController {

    @Autowired
    DepartmentRepository departmentRepository;
    @Autowired
    DepartmentItemRepository departmentItemRepository;

    @GetMapping("/department/{depid}/relations")
    public ResponseEntity<List<DepartmentItem>> getDepartmentItemsByDepId(@PathVariable(value = "depid") long depid) {
        Optional<Department> chosenDepId = departmentRepository.findById(depid);

        try {
            List<DepartmentItem> departmentItems = new ArrayList<DepartmentItem>();
            if (chosenDepId.isPresent()) {
                departmentItemRepository.findDepartmentItemsByDepid(chosenDepId.get()).forEach(departmentItems::add);
            } else {
                departmentItemRepository.findAll().forEach(departmentItems::add);
            }

            if (departmentItems.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(departmentItems, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/department/relations")
    public ResponseEntity<DepartmentItem> createDepartmentItemRelation(@RequestBody DepartmentItem depItem) {
        try {
            DepartmentItem _depItem = departmentItemRepository
                    .save(new DepartmentItem(depItem.getDepid(), depItem.getIid(), depItem.getWorkTime()));
            return new ResponseEntity<>(_depItem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/department/{depid}/relations/{id}")
    public ResponseEntity<DepartmentItem> updateDepartmentItem(@PathVariable("id") long id, @RequestBody DepartmentItem depItem) {
        Optional<DepartmentItem> depItemData = departmentItemRepository.findById(id);

        if (depItemData.isPresent()) {
            DepartmentItem _depItem = depItemData.get();
            _depItem.setDepid(depItem.getDepid());
            _depItem.setIid(depItem.getIid());
            _depItem.setWorkTime(depItem.getWorkTime());
            return new ResponseEntity<>(departmentItemRepository.save(_depItem), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/department/{depid}/relations/{id}")
    public ResponseEntity<HttpStatus> deleteDepartmentItem(@PathVariable(value = "id") long id) {
        try {
            departmentItemRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
