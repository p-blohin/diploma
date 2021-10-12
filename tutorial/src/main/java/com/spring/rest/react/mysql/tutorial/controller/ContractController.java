package com.spring.rest.react.mysql.tutorial.controller;

import com.spring.rest.react.mysql.tutorial.model.AssemblyUnit;
import com.spring.rest.react.mysql.tutorial.model.Buyer;
import com.spring.rest.react.mysql.tutorial.model.Contract;
import com.spring.rest.react.mysql.tutorial.repository.ContractRepository;
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
public class ContractController {

    @Autowired
    ContractRepository contractRepository;

    @GetMapping("/contract")
    public ResponseEntity<List<Contract>> getAllContracts(@RequestParam(required = false) String contract) {
        try {
            List<Contract> contracts = new ArrayList<Contract>();

            if (contract == null)
                contractRepository.findAll().forEach(contracts::add);
            else
                contractRepository.findByContractContaining(contract).forEach(contracts::add);

            if (contracts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(contracts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/contract/{id}")
    public ResponseEntity<Contract> getContractById(@PathVariable("id") long id) {
        Optional<Contract> contract = contractRepository.findById(id);

        if (contract.isPresent()) {
            return new ResponseEntity<>(contract.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/contract")
    public ResponseEntity<Contract> createContract(@RequestBody Contract contract) {
        try {
            Contract _contract = contractRepository
                    .save(new Contract(contract.getContract(), contract.getBuyer(),
                            contract.getStage(), contract.getProduct(), contract.getQuantity()));
            return new ResponseEntity<>(_contract, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/contract/{id}")
    public ResponseEntity<Contract> updateContract(@PathVariable("id") long id, @RequestBody Contract contract) {
        Optional<Contract> contractData = contractRepository.findById(id);

        if (contractData.isPresent()) {
            Contract _contract = contractData.get();
            _contract.setContract(contract.getContract());
            _contract.setBuyer(contract.getBuyer());
            _contract.setStage(contract.getStage());
            _contract.setProduct(contract.getProduct());
            _contract.setQuantity(contract.getQuantity());
            return new ResponseEntity<>(contractRepository.save(_contract), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/contract/{id}")
    public ResponseEntity<HttpStatus> deleteContract(@PathVariable("id") long id) {
        try {
            contractRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/contract/buyer")
    public ResponseEntity<List<Contract>> findByBuyer(@PathVariable("buyer_id") Buyer buyer) {
        try {
            List<Contract> contracts = contractRepository.findByBuyerContaining(buyer);

            if (contracts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/contract/au")
    public ResponseEntity<List<Contract>> findByProduct(@PathVariable("assembly_unit_id")AssemblyUnit product) {
        try {
            List<Contract> contracts = contractRepository.findByProductContaining(product);

            if (contracts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
