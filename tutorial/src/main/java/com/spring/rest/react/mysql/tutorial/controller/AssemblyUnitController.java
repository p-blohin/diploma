package com.spring.rest.react.mysql.tutorial.controller;

import com.spring.rest.react.mysql.tutorial.model.AssemblyUnit;
import com.spring.rest.react.mysql.tutorial.repository.AssemblyUnitRepository;
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
public class AssemblyUnitController {

    @Autowired
    AssemblyUnitRepository assemblyUnitRepository;

    @GetMapping("/au")
    public ResponseEntity<List<AssemblyUnit>> getAllAssemblyUnits(@RequestParam(required = false) String name) {
        try {
            List<AssemblyUnit> assemblyUnits = new ArrayList<AssemblyUnit>();

            if (name == null)
                assemblyUnitRepository.findAll().forEach(assemblyUnits::add);
            else
                assemblyUnitRepository.findByNameContaining(name).forEach(assemblyUnits::add);

            if (assemblyUnits.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(assemblyUnits, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/au/{id}")
    public ResponseEntity<AssemblyUnit> getAssemblyUnitById(@PathVariable("id") long id) {
        Optional<AssemblyUnit> assemblyUnit = assemblyUnitRepository.findById(id);

        if (assemblyUnit.isPresent()) {
            return new ResponseEntity<>(assemblyUnit.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/au")
    public ResponseEntity<AssemblyUnit> createAssemblyUnit(@RequestBody AssemblyUnit assemblyUnit) {
        try {
            AssemblyUnit _assemblyUnit = assemblyUnitRepository
                    .save(new AssemblyUnit(assemblyUnit.getName(), assemblyUnit.getDecimalNumber()));
            return new ResponseEntity<>(_assemblyUnit, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/au/{id}")
    public ResponseEntity<AssemblyUnit> updateAssemblyUnit(@PathVariable("id") long id, @RequestBody AssemblyUnit assemblyUnit) {
        Optional<AssemblyUnit> assemblyUnitData = assemblyUnitRepository.findById(id);

        if (assemblyUnitData.isPresent()) {
            AssemblyUnit _assemblyUnit = assemblyUnitData.get();
            _assemblyUnit.setName(assemblyUnit.getName());
            _assemblyUnit.setDecimalNumber(assemblyUnit.getDecimalNumber());
            return new ResponseEntity<>(assemblyUnitRepository.save(_assemblyUnit), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/au/{id}")
    public ResponseEntity<HttpStatus> deleteAssemblyUnit(@PathVariable("id") long id) {
        try {
            assemblyUnitRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
