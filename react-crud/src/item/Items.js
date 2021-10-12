import React, {Component} from "react";
import {Link, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ItemList from "./components/item-list.component";
import Item from "./components/item.component";
import AddItem from "./components/add-item.component";

class Items extends Component {
    render() {
        return(
            <div>
                <li className="nav-item">
                    <Link to={"/item"} className="nav-link">
                        Детали
                    </Link>
                </li>
            </div>
        );
    }
}

class ItemsSwitch extends Component {
    render() {
        return(
            <Switch>
                <Route exact path={["/item"]} component={ItemList} />
                <Route exact path="/addItem" component={AddItem} />
                <Route path="/item/:id" component={Item} />
            </Switch>
        );
    }
}

export { Items, ItemsSwitch };