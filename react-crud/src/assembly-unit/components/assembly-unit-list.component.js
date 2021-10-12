import React, {Component} from "react";
import AssemblyUnitDataService from "../../services/assembly-unit.service";
import {Link} from "react-router-dom";

export default class AssemblyUnitList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveAssemblyUnits = this.retrieveAssemblyUnits.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveAssemblyUnit = this.setActiveAssemblyUnit.bind(this);
        this.searchName = this.searchName.bind(this);
        this.searchDecimalNumber = this.searchDecimalNumber.bind(this);
        this.onChangeSearchDecimalNumber = this.onChangeSearchDecimalNumber.bind(this);

        this.state = {
            assemblyUnits: [],
            currentAssemblyUnit: null,
            currentIndex: -1,
            searchName: "",
            searchDecimalNumber: ""
        };
    }

    componentDidMount() {
        this.retrieveAssemblyUnits();
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }

    onChangeSearchDecimalNumber(e) {
        const searchDecimalNumber = e.target.value;

        this.setState({
            searchDecimalNumber: searchDecimalNumber
        });
    }

    retrieveAssemblyUnits() {
        AssemblyUnitDataService.getAll()
            .then(response => {
                this.setState({
                    assemblyUnits: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveAssemblyUnits();
        this.setState({
            currentAssemblyUnit: null,
            currentIndex: -1
        });
    }

    setActiveAssemblyUnit(assemblyUnit, index) {
        this.setState({
            currentAssemblyUnit: assemblyUnit,
            currentIndex: index
        });
    }

    searchName() {
        this.setState({
            currentAssemblyUnit: null,
            currentIndex: -1
        });

        AssemblyUnitDataService.findByName(this.state.searchName)
            .then(response => {
                this.setState({
                    assemblyUnits: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchDecimalNumber() {
        this.setState({
            currentAssemblyUnit: null,
            currentIndex: -1
        });

        AssemblyUnitDataService.findByDecimalNumber(this.state.decimalNumber)
            .then(response => {
                this.setState({
                    assemblyUnits: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchName, searchDecimalNumber,
            assemblyUnits, currentAssemblyUnit, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Поиск по наименованию"
                            value={searchName}
                            onChange={this.onChangeSearchName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchName}
                            >
                                Найти
                            </button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Поиск по децимальному номеру"
                            value={searchDecimalNumber}
                            onChange={this.onChangeSearchDecimalNumber}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchDecimalNumber}
                            >
                                Найти
                            </button>
                            <div className="btn-link">
                                <Link to={"/addAu"} className="nav-link">
                                    Добавить продукцию
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Список продукции</h4>

                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Наименование</th>
                            <th scope="col">Децимальный номер</th>
                        </tr>
                        </thead>
                        {assemblyUnits &&
                        assemblyUnits.map((assemblyUnit, index) => {
                            return (
                                <tbody>
                                <tr className={"table" +
                                (index === currentIndex ? "-info" : "")
                                }
                                    onClick={() => this.setActiveAssemblyUnit(assemblyUnit, index)}
                                    key={index}>
                                    <td>{assemblyUnit.name}</td>
                                    <td>{assemblyUnit.decimalNumber}</td>
                                </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </div>
                <div className="col-md-6">
                    {currentAssemblyUnit ? (
                        <div>
                            <h4>Продукция</h4>
                            <div>
                                <label>
                                    <strong>Наименование:</strong>
                                </label>{" "}
                                {currentAssemblyUnit.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Децимальный номер:</strong>
                                </label>{" "}
                                {currentAssemblyUnit.decimalNumber}
                            </div>

                            <Link
                                to={"/au/" + currentAssemblyUnit.id}
                                className="badge badge-warning"
                            >
                                Изменить
                            </Link>

                            <Link
                                to={"/au/" + currentAssemblyUnit.id + "/relations/" }
                                className="badge badge-info"
                            >
                                Просмотреть связанные изделия
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Выберите продукцию для просмотра...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}