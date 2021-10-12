import React, {Component} from "react";
import AssemblyUnitDataService from "../../services/assembly-unit.service";

export default class AssemblyUnit extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDecimalNumber = this.onChangeDecimalNumber.bind(this);
        this.getAssemblyUnit = this.getAssemblyUnit.bind(this);
        this.updateAssemblyUnit = this.updateAssemblyUnit.bind(this);
        this.deleteAssemblyUnit = this.deleteAssemblyUnit.bind(this);

        this.state = {
            currentAssemblyUnit: {
                id: null,
                name: "",
                decimalNumber: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getAssemblyUnit(this.props.match.params.id);
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function(prevState){
            return {
                currentAssemblyUnit: {
                    ...prevState.currentAssemblyUnit,
                    name: name
                }
            };
        });
    }

    onChangeDecimalNumber(e) {
        const decimalNumber = e.target.value;

        this.setState(prevState => ({
            currentAssemblyUnit: {
                ...prevState.currentAssemblyUnit,
                decimalNumber: decimalNumber
            }
        }));
    }

    getAssemblyUnit(id) {
        AssemblyUnitDataService.get(id)
            .then(response => {
                this.setState({
                    currentAssemblyUnit: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateAssemblyUnit() {
        AssemblyUnitDataService.update(
            this.state.currentAssemblyUnit.id,
            this.state.currentAssemblyUnit
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The assembly unit was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteAssemblyUnit() {
        AssemblyUnitDataService.delete(this.state.currentAssemblyUnit.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/au')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentAssemblyUnit } = this.state;

        return (
            <div>
                { currentAssemblyUnit ? (
                    <div className="edit-form">
                        <h4>Продукция</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Наименование</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentAssemblyUnit.name}
                                    onChange={this.onChangeName}
                                    />
                            </div>
                            <div className="form-group">
                                <label htmlFor="decimalNumber">Децимальный номер</label>
                                <input
                                type="text"
                                className="form-control"
                                id="decimalNumber"
                                value={currentAssemblyUnit.decimalNumber}
                                onChange={this.onChangeDecimalNumber}
                                />
                            </div>
                        </form>

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteAssemblyUnit}
                            >
                            Удалить
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateAssemblyUnit}
                        >
                            Изменить
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Выберите продукцию для просмотра...</p>
                    </div>
                )}
            </div>
        );
    }
}