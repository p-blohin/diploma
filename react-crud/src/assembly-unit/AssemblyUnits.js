import React, {Component} from "react";
import {Link, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AssemblyUnitList from "./components/assembly-unit-list.component";
import AddAssemblyUnit from "./components/add-assembly-unit.component";
import AssemblyUnit from "./components/assembly-unit.component";

class AssemblyUnits extends Component {
    render() {
        return (
            <div>
                <li className="nav-item">
                    <Link to={"/au"} className="nav-link">
                        Продукция
                    </Link>
                </li>
            </div>
        );
    }
}

class AssemblyUnitsSwitch extends Component {
    render() {
        return(
            <Switch>
                <Route exact path={["/au"]} component={AssemblyUnitList} />
                <Route exact path="/addAu" component={AddAssemblyUnit} />
                <Route exact path="/au/:id" component={AssemblyUnit} />
            </Switch>
        );
    }
}

export { AssemblyUnits, AssemblyUnitsSwitch };