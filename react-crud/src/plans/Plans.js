import React, {Component} from "react";
import {Link, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddTaskToPlan from "./components/add-task-to-plan.component";
import DepartmentDataService from "../services/department.service";
import PlansList from "./components/plans-list.component";

class PlansDepartmentSwitch extends Component {
    constructor(props) {
        super(props);
        this.retrieveDepartments = this.retrieveDepartments.bind(this);

        this.state = {
            departments: [],
            currentDepartment: 0,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrieveDepartments();
    }

    retrieveDepartments() {
        DepartmentDataService.getAll()
            .then(response => {
                this.setState({
                    departments: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    setActiveDepartment(department, index) {
        this.setState({
            currentDepartment: department,
            currentIndex: index
        });
    }

    render() {
        const { departments, currentIndex, currentDepartment } = this.state;
        return (
            <div className="list-row">
                <h4>Выберите отдел</h4>
                <div className="col-md-6">
                <Link to={"/plans/" + currentDepartment.id}>
                    {departments &&
                    departments.map((department, index) => (
                        <button className={
                            (index === currentIndex ? "btn" :
                                "btn-outline")
                        }
                                type="button"
                              onClick={() => this.setActiveDepartment(department, index)}
                              key={index}
                        >
                            {department.department}
                        </button>
                    ))}
                </Link>
                </div>
            </div>
        );
    }
}

class Plans extends Component {
    render() {
        return (
            <div>
                <li className="nav-item">
                    <Link to={"/plans"} className="nav-link">
                        Планы
                    </Link>
                </li>
            </div>
        );
    }
}

class PlansSwitch extends Component {
    render() {
        return (
            <Switch>
                <Route path="/plans" component={PlansDepartmentSwitch}/>
                <Route path="/plans/:dep_id" component={PlansList}/>
                <Route path="/tasks/:id/active/" component={AddTaskToPlan} />
            </Switch>
        );
    }
}

export { Plans, PlansSwitch, PlansDepartmentSwitch };