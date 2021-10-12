package com.spring.rest.react.mysql.tutorial.model;

import javax.persistence.*;

@Entity
@Table(name = "plan")
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task;

    @ManyToOne
    @JoinColumn(name = "task_assembly_unit_id")
    private AssemblyUnit product;

    @ManyToOne
    @JoinColumn(name = "au_i_item_id")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @Column(name = "quantity")
    private int quantity;

    public Plan() {
    }

    public Plan(Task task, AssemblyUnit product, Item item, Department department, int quantity) {
        this.task = task;
        this.product = product;
        this.item = item;
        this.department = department;
        this.quantity = quantity;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public AssemblyUnit getProduct() {
        return product;
    }

    public void setProduct(AssemblyUnit product) {
        this.product = product;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "Plan{" +
                "id=" + id +
                ", task=" + task +
                ", product=" + product +
                ", item=" + item +
                ", department=" + department +
                ", quantity=" + quantity +
                '}';
    }
}
