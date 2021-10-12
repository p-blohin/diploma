package com.spring.rest.react.mysql.tutorial.model;

import javax.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "code")
    private int code;

    @Column(name = "year")
    private int year;

    @ManyToOne
    @JoinColumn(name = "assembly_unit_id")
    private AssemblyUnit product;

    @ManyToOne
    @JoinColumn(name = "contract_id")
    private Contract contract;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private Buyer buyer;

    @Column(name = "stage")
    private String stage;

    public Task() {
    }

    public Task(int code, int year, AssemblyUnit product, Contract contract, Buyer buyer, String stage) {
        this.code = code;
        this.year = year;
        this.product = product;
        this.contract = contract;
        this.buyer = buyer;
        this.stage = stage;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public AssemblyUnit getProduct() {
        return product;
    }

    public void setProduct(AssemblyUnit product) {
        this.product = product;
    }

    public Contract getContract() {
        return contract;
    }

    public void setContract(Contract contract) {
        this.contract = contract;
    }

    public Buyer getBuyer() {
        return buyer;
    }

    public void setBuyer(Buyer buyer) {
        this.buyer = buyer;
    }

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }

    @Override
    public String toString() {
        return "Task{" +
                "code=" + code +
                ", year=" + year +
                ", product=" + product +
                ", contract=" + contract +
                ", buyer=" + buyer +
                ", stage=" + stage +
                '}';
    }
}