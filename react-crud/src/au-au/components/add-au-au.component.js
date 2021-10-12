import React, {Component} from "react";
import AuAuDataService from "../../services/au-au.service";
import AssemblyUnitDataService from "../../services/assembly-unit.service";

export default class AddAuAu extends Component {
    constructor(props) {
        super(props);
        this.addDependency = this.addDependency.bind(this);
        this.saveAuAuRelation = this.saveAuAuRelation.bind(this);
        this.newAuAuRelation = this.newAuAuRelation.bind(this);

        this.state = {
            id: null,
            parentId: AssemblyUnitDataService.get(),
            childId: null,

            submitted: false
        };
    }

    addDependency(e) {
        this.setState({
            childId: e.target.value
        });
    }

    saveAuAuRelation() {
        var data = {
            parentId: AssemblyUnitData.get(),
            childId: this.state.childId
        };

        AuAuDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    parentId: response.data.parentId,
                    childId: response.data.childId,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newAuAuRelation() {
        this.setState({
            id: null,
            parentId: AssemblyUnitDataService.get(),
            childId: null,

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Dependency has been added!</h4>
                        <button className="btn btn-success" onClick={this.newAuAuRelation}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={}
                            onChange={}
                            name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="decimalNumber">Decimal Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="decimalNumber"
                                required
                                value={}
                                onChange={}
                                name="decimalNumber"
                            />
                        </div>

                        <button onClick={this.saveAuAuRelation} className="btn btn-success">
                            Add dependency
                        </button>
                    </div>
                )}
            </div>
        );
    }
}