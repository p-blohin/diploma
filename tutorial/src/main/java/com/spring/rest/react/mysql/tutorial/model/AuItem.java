package com.spring.rest.react.mysql.tutorial.model;

import javax.persistence.*;

@Entity
@Table(name = "au_i")
public class AuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "assembly_unit_id")
    private AssemblyUnit auid;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item iid;

    @Column(name = "quantity")
    private int quantity;

    public AuItem() {
    }

    public AuItem(AssemblyUnit auid, Item iid, int quantity) {
        this.auid = auid;
        this.iid = iid;
        this.quantity = quantity;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public AssemblyUnit getAuid() {
        return auid;
    }

    public void setAuid(AssemblyUnit auid) {
        this.auid = auid;
    }

    public Item getIid() {
        return iid;
    }

    public void setIid(Item iid) {
        this.iid = iid;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "AuItem{" +
                "id=" + id +
                ", auid=" + auid +
                ", iid=" + iid +
                ", quantity=" + quantity +
                '}';
    }
}

// Вариант с ManyToMany
//package com.spring.rest.react.mysql.tutorial.model;
//
//        import javax.persistence.*;
//        import java.util.List;
//
//@Entity
//@Table(name = "au_i")
//public class AuItem {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private long id;
//
//    @ManyToMany
//    @JoinColumn(name = "assembly_unit_id")
//    private List<AssemblyUnit> auid;
//
//    @ManyToMany
//    @JoinColumn(name = "item_id")
//    private List<Item> iid;
//
//    @Column(name = "quantity")
//    private int quantity;
//
//    public AuItem() {
//    }
//
//    public AuItem(List<AssemblyUnit> auid, List<Item> iid, int quantity) {
//        this.auid = auid;
//        this.iid = iid;
//        this.quantity = quantity;
//    }
//
//    public long getId() {
//        return id;
//    }
//
//    public void setId(long id) {
//        this.id = id;
//    }
//
//    public List<AssemblyUnit> getAuid() {
//        return auid;
//    }
//
//    public void setAuid(List<AssemblyUnit> auid) {
//        this.auid = auid;
//    }
//
//    public List<Item> getIid() {
//        return iid;
//    }
//
//    public void setIid(List<Item> iid) {
//        this.iid = iid;
//    }
//
//    public int getQuantity() {
//        return quantity;
//    }
//
//    public void setQuantity(int quantity) {
//        this.quantity = quantity;
//    }
//}