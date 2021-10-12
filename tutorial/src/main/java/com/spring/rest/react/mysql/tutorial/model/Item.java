package com.spring.rest.react.mysql.tutorial.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "decimal_number")
    private String decimalNumber;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "iid")
    Set<AuItem> auItems;

//    public Set<AuItem> getAuItems() {
//        return auItems;
//    }

    public void setAuItems(Set<AuItem> auItems) {
        this.auItems = auItems;
    }

    public Item() {
    }

    public Item(String name, String decimalNumber) {
        this.name = name;
        this.decimalNumber = decimalNumber;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", decimalNumber='" + decimalNumber + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
