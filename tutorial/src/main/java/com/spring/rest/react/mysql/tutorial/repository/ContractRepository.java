package com.spring.rest.react.mysql.tutorial.repository;

import com.spring.rest.react.mysql.tutorial.model.AssemblyUnit;
import com.spring.rest.react.mysql.tutorial.model.Buyer;
import com.spring.rest.react.mysql.tutorial.model.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContractRepository extends JpaRepository<Contract, Long>{
    List<Contract> findByContractContaining(String contract);
    List<Contract> findByBuyerContaining(Buyer buyer);
    List<Contract> findByProductContaining(AssemblyUnit assemblyUnit);
}
