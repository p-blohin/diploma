package com.spring.rest.react.mysql.tutorial.model;

import javax.persistence.*;

@Entity
@Table(name = "department_item")
public class DepartmentItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department depid;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item iid;

    @Column(name = "work_time")
    private String workTime;

    public DepartmentItem() {
    }

    public DepartmentItem(Department depid, Item iid, String workTime) {
        this.depid = depid;
        this.iid = iid;
        this.workTime = workTime;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Department getDepid() {
        return depid;
    }

    public void setDepid(Department depid) {
        this.depid = depid;
    }

    public Item getIid() {
        return iid;
    }

    public void setIid(Item iid) {
        this.iid = iid;
    }

    public String getWorkTime() {
        return workTime;
    }

    public void setWorkTime(String workTime) {
        this.workTime = workTime;
    }

    @Override
    public String toString() {
        return "DepartmentItem{" +
                "id=" + id +
                ", depid=" + depid +
                ", iid=" + iid +
                ", workTime=" + workTime +
                '}';
    }
}
