package com.spring.rest.react.mysql.tutorial.controller;

import com.spring.rest.react.mysql.tutorial.model.Buyer;
import com.spring.rest.react.mysql.tutorial.repository.BuyerRepository;
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
public class BuyerController {

    @Autowired
    BuyerRepository buyerRepository;

    @GetMapping("/buyer")
    public ResponseEntity<List<Buyer>> getAllBuyers(@RequestParam(required = false) String name) {
        try {
            List<Buyer> buyers = new ArrayList<Buyer>();

            if (name == null)
                buyerRepository.findAll().forEach(buyers::add);
            else
                buyerRepository.findByNameContaining(name).forEach(buyers::add);

            if (buyers.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(buyers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/buyer/{id}")
    public ResponseEntity<Buyer> getBuyerById(@PathVariable("id") long id) {
        Optional<Buyer> buyer = buyerRepository.findById(id);

        if (buyer.isPresent()) {
            return new ResponseEntity<>(buyer.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/buyer")
    public ResponseEntity<Buyer> createBuyer(@RequestBody Buyer buyer) {
        try {
            Buyer _buyer = buyerRepository
                    .save(new Buyer(buyer.getName()));
            return new ResponseEntity<>(_buyer, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/buyer/{id}")
    public ResponseEntity<Buyer> updateBuyer(@PathVariable("id") long id, @RequestBody Buyer buyer) {
        Optional<Buyer> buyerData = buyerRepository.findById(id);

        if (buyerData.isPresent()) {
            Buyer _buyer = buyerData.get();
            _buyer.setName(buyer.getName());
            return new ResponseEntity<>(buyerRepository.save(_buyer), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/buyer/{id}")
    public ResponseEntity<HttpStatus> deleteBuyer(@PathVariable("id") long id) {
        try {
            buyerRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
