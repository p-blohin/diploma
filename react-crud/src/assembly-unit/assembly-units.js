import React, {Component} from "react";
import {Link, Route, Switch, BrowserRouter as Router} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assembly-units.css";

import AssemblyUnitList from "./components/assembly-unit-list.component";
import AddAssemblyUnit from "./components/add-assembly-unit.component";
import AssemblyUnit from "./components/assembly-unit.component";

class AssemblyUnitsApp extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/impulse" className="navbar-brand">
                        Impulse
                    </a>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/au"} className="nav-link">
                                Assembly Units
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/add"} className="nav-link">
                                Add
                            </Link>
                        </li>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/au"]} component={AssemblyUnitList} />
                        <Route exact path="/add" component={AddAssemblyUnit} />
                        <Route path="/au/:id" component={AssemblyUnit} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default AssemblyUnitsApp;