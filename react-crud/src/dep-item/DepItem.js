import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import DepItemList from "./components/dep-item-list.component";

class DepItemsSwitch extends Component {
    render() {
        return(
            <Switch>
                <Route exact path="/department/:id/relations/" component={DepItemList} />
            </Switch>
        );
    }
}

export { DepItemsSwitch };