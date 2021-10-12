import React, {Component} from "react";
import {Link, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddTask from "./components/add-task.component";
import Task from "./components/task.component";
import TasksList from "./components/task-list.component";

class Tasks extends Component {
    render() {
        return(
            <div>
                <li className="nav-item">
                    <Link to={"/tasks"} className="nav-link">
                        Задания
                    </Link>
                </li>
            </div>
        );
    }
}

class TasksSwitch extends Component {
    render() {
        return(
            <Switch>
                <Route exact path={["/tasks"]} component={TasksList} />
                <Route exact path="/addTask" component={AddTask} />
                <Route exact path="/tasks/:id" component={Task} />
            </Switch>
        );
    }
}

export { Tasks, TasksSwitch };