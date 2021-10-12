package com.spring.rest.react.mysql.tutorial.model;

import javax.persistence.*;

@Entity
@Table(name = "contract")
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "contract")
    private String contract;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private Buyer buyer;

    @Column(name = "stage")
    private String stage;

    @ManyToOne
    @JoinColumn(name = "assembly_unit_id")
    private AssemblyUnit product;

    @Column(name = "quanity")
    private int quantity;

    public Contract() {
    }

    public Contract(String contract, Buyer buyer, String stage, AssemblyUnit product, int quantity) {
        this.contract = contract;
        this.buyer = buyer;
        this.stage = stage;
        this.product = product;
        this.quantity = quantity;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getContract() {
        return contract;
    }

    public void setContract(String contract) {
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

    public AssemblyUnit getProduct() {
        return product;
    }

    public void setProduct(AssemblyUnit product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "Contract{" +
                "contract='" + contract + '\'' +
                ", buyer=" + buyer +
                ", stage='" + stage + '\'' +
                ", product=" + product +
                ", quantity=" + quantity +
                '}';
    }
}
