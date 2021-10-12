import React, {Component} from "react";
import {Link, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddBuyer from "./components/add-buyer.component";
import Buyer from "./components/buyer.component";
import BuyersList from "./components/buyers-list.component";

class Buyers extends Component {
    render() {
        return (
            <div>
                <li className="nav-item">
                    <Link to={"/buyer"} className="nav-link">
                        Заказчики
                    </Link>
                </li>
            </div>
        );
    }
}

class BuyersSwitch extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={["/buyer"]} component={BuyersList} />
                <Route exact path="/addBuyer" component={AddBuyer} />
                <Route path="/buyer/:id" component={Buyer} />
            </Switch>
        );
    }
}

export { Buyers, BuyersSwitch };