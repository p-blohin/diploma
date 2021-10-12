import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuItemList from "./components/au-item-list.component";

class AuItemsSwitch extends Component {
    render() {
        return(
            <Switch>
                <Route exact path="/au/:id/relations/" component={AuItemList} />
            </Switch>
        );
    }
}

export { AuItemsSwitch };