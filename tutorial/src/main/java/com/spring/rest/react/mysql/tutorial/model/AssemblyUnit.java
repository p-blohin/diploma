package com.spring.rest.react.mysql.tutorial.model;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "assembly_unit")
public class AssemblyUnit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "decimal_number")
    private String decimalNumber;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "product")
    private List<Contract> contracts;

    @OneToMany(mappedBy = "auid")
    Set<AuItem> auItems;

//    @ManyToMany
//    @JoinTable(name = "au_i",
//            joinColumns = {
//                    @JoinColumn(name = "auid", referencedColumnName = "id")},
//            inverseJoinColumns = {
//                    @JoinColumn(name = "iid", referencedColumnName = "id")})
//    private Set<Item> items = new HashSet<>();

//    @ManyToMany
//    @JoinTable(name = "au_au",
//    joinColumns = {
//            @JoinColumn(name = "parentid")},
//            inverseJoinColumns = {
//            @JoinColumn(name = "childid")})
//    private Set<AssemblyUnit> assemblyUnitReference = new HashSet<>();

    public AssemblyUnit() {
    }

    public AssemblyUnit(String name, String decimalNumber) {
        this.name = name;
        this.decimalNumber = decimalNumber;
    }

//    public Set<AuItem> getAuItems() {
//        return auItems;
//    }

    public void setAuItems(Set<AuItem> auItems) {
        this.auItems = auItems;
    }

    //    public Set<Item> getItems() {
//        return items;
//    }

//    public void setItems(Set<Item> items) {
//        this.items = items;
//    }

    //    public Set<AssemblyUnit> getAssemblyUnitReference() {
//        return assemblyUnitReference;
//    }
//
//    public void setAssemblyUnitReference(Set<AssemblyUnit> assemblyUnitReference) {
//        this.assemblyUnitReference = assemblyUnitReference;
//    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public String getDecimalNumber() {
        return decimalNumber;
    }

    public void setDecimalNumber(String decimalNumber) {
        this.decimalNumber = decimalNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

//    public List<Contract> getContract() {
//        return contracts;
//    }

    public void setContract(List<Contract> contracts) {
        this.contracts = contracts;
    }

    @Override
    public String toString() {
        return "AssemblyUnit{" +
                "id=" + id +
                ", decimalNumber='" + decimalNumber + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
