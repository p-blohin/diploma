import React, {Component} from "react";
import {Link, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddDepartment from "./components/add-department.component";
import Department from "./components/department.component";
import DepartmentList from "./components/department-list.component";

class Departments extends Component {
    render() {
        return (
            <div>
                <li className="nav-item">
                    <Link to={"/department"} className="nav-link">
                        Отделы
                    </Link>
                </li>
            </div>
        );
    }
}

class DepartmentsSwitch extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={["/department"]} component={DepartmentList} />
                <Route exact path="/addDepartment" component={AddDepartment} />
                <Route exact path="/department/:id" component={Department} />
            </Switch>
        );
    }
}

export { Departments, DepartmentsSwitch };