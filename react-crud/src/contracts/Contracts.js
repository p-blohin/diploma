import React, {Component} from "react";
import {Link, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddContract from "./components/add-contract.component";
import Contract from "./components/contract.component";
import ContractList from "./components/contract-list.component";

class Contracts extends Component {
    render() {
        return(
            <div>
                <li className="nav-item">
                    <Link to={"/contract"} className="nav-link">
                        Договора
                    </Link>
                </li>
            </div>
        );
    }
}

class ContractsSwitch extends Component {
    render() {
        return(
            <Switch>
                <Route exact path={["/contract"]} component={ContractList} />
                <Route exact path="/addContract" component={AddContract} />
                <Route path="/contract/:id" component={Contract} />
            </Switch>
        );
    }
}

export { Contracts, ContractsSwitch };