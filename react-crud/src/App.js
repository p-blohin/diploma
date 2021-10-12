import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { AssemblyUnits, AssemblyUnitsSwitch } from "./assembly-unit/AssemblyUnits";
import { Items, ItemsSwitch } from "./item/Items";
import { Buyers, BuyersSwitch } from "./buyer/Buyers";
import { Contracts, ContractsSwitch } from "./contracts/Contracts";
import { Tasks, TasksSwitch } from "./task/Tasks";
import { AuItemsSwitch } from "./au-item/AuItems";
import { Departments, DepartmentsSwitch } from "./department/Departments";
import { DepItemsSwitch } from "./dep-item/DepItem";
import { Plans, PlansSwitch } from "./plans/Plans";


class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/" className="navbar-brand">
                        ИМПУЛЬС
                    </a>
                    <div className="navbar-nav mr-auto">
                        <AssemblyUnits/>
                        <Items/>
                        <Buyers/>
                        <Contracts/>
                        <Tasks/>
                        <Departments/>
                        <Plans/>
                    </div>
                </nav>

                <div className="container mt-3">
                    <AssemblyUnitsSwitch/>
                    <ItemsSwitch/>
                    <BuyersSwitch/>
                    <ContractsSwitch/>
                    <TasksSwitch/>
                    <AuItemsSwitch/>
                    <DepartmentsSwitch/>
                    <DepItemsSwitch/>
                    <PlansSwitch/>
                </div>
            </div>
        );
    }
}

export default App;