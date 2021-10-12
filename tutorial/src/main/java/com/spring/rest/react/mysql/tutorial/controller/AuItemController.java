package com.spring.rest.react.mysql.tutorial.controller;

import com.spring.rest.react.mysql.tutorial.model.AssemblyUnit;
import com.spring.rest.react.mysql.tutorial.model.AuItem;
import com.spring.rest.react.mysql.tutorial.repository.AssemblyUnitRepository;
import com.spring.rest.react.mysql.tutorial.repository.AuItemRepository;
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
public class AuItemController {

    @Autowired
    AuItemRepository auItemRepository;
    @Autowired
    AssemblyUnitRepository assemblyUnitRepository;

    @GetMapping("/au/{auid}/relations")
    public ResponseEntity<List<AuItem>> getAuItemsByAuId(@PathVariable(value = "auid") long auid) {
        Optional<AssemblyUnit> chosenAuid = assemblyUnitRepository.findById(auid);

        try {
            List<AuItem> auItems = new ArrayList<AuItem>();
            if (chosenAuid.isPresent()) {
                auItemRepository.findAuItemsByAuid(chosenAuid.get()).forEach(auItems::add);
            } else {
                auItemRepository.findAll().forEach(auItems::add);
            }

            if (auItems.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(auItems, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/au/relations")
    public ResponseEntity<AuItem> createAuItemRelation(@RequestBody AuItem auItem) {
        try {
            AuItem _auItem = auItemRepository
                    .save(new AuItem(auItem.getAuid(), auItem.getIid(), auItem.getQuantity()));
            return new ResponseEntity<>(_auItem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/au/{auid}/relations/{id}")
    public ResponseEntity<AuItem> updateAuItem(@PathVariable("id") long id, @RequestBody AuItem auItem) {
        Optional<AuItem> auItemData = auItemRepository.findById(id);

        if (auItemData.isPresent()) {
            AuItem _auItem = auItemData.get();
            _auItem.setAuid(auItem.getAuid());
            _auItem.setIid(auItem.getIid());
            _auItem.setQuantity(auItem.getQuantity());
            return new ResponseEntity<>(auItemRepository.save(_auItem), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/au/{auid}/relations")
    public ResponseEntity<HttpStatus> deleteAuItem(@PathVariable(value = "id") long id) {
        try {
            //auItemRepository.deleteAuItemByIid(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
