import React, {Component} from "react";
import AssemblyUnitDataService from "../../services/assembly-unit.service";

export default class AddAssemblyUnit extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDecimalNumber = this.onChangeDecimalNumber.bind(this);
        this.saveAssemblyUnit = this.saveAssemblyUnit.bind(this);
        this.newAssemblyUnit = this.newAssemblyUnit.bind(this);

        this.state = {
            id: null,
            name: "",
            decimalNumber: "",

            submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDecimalNumber(e) {
        this.setState({
            decimalNumber: e.target.value
        });
    }

    saveAssemblyUnit() {
        var data = {
            name: this.state.name,
            decimalNumber: this.state.decimalNumber
        };

        AssemblyUnitDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    decimalNumber: response.data.decimalNumber,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newAssemblyUnit() {
        this.setState({
            id: null,
            name: "",
            decimalNumber: "",

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Продукция успешно добавлена!</h4>
                        <button className="btn btn-success" onClick={this.newAssemblyUnit}>
                            Создать новую продукцию
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Наименование</label>
                            <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={this.state.name}
                            onChange={this.onChangeName}
                            name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="decimalNumber">Децимальный номер</label>
                            <input
                                type="text"
                                className="form-control"
                                id="decimalNumber"
                                required
                                value={this.state.decimalNumber}
                                onChange={this.onChangeDecimalNumber}
                                name="decimalNumber"
                            />
                        </div>

                        <button onClick={this.saveAssemblyUnit} className="btn btn-success">
                            Добавить
                        </button>
                    </div>
                )}
            </div>
        );
    }

}