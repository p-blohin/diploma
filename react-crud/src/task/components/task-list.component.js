import React, {Component} from "react";
import TaskDataService from "../../services/task.service";
import {Link} from "react-router-dom";
import ContractDataService from "../../services/contract.service";
import AssemblyUnitDataService from "../../services/assembly-unit.service";
import BuyerDataService from "../../services/buyer.service";

export default class TasksList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchCode = this.onChangeSearchCode.bind(this);
        this.retrieveTasks = this.retrieveTasks.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTask = this.setActiveTask.bind(this);
        this.searchCode = this.searchCode.bind(this);

        this.retrieveContracts = this.retrieveContracts.bind(this);
        this.refreshContractList = this.refreshContractList.bind(this);

        this.retrieveBuyers = this.retrieveBuyers.bind(this);
        this.refreshBuyerList = this.refreshBuyerList.bind(this);

        this.retrieveAssemblyUnits = this.retrieveAssemblyUnits.bind(this);
        this.refreshAssemblyUnitList = this.refreshAssemblyUnitList.bind(this);

        this.state = {
            tasks: [],
            currentTask: null,
            currentIndex: -1,
            searchCode: ""
        };
    }

    componentDidMount() {
        this.retrieveTasks();
        this.retrieveContracts();
        this.retrieveAssemblyUnits();
        this.retrieveBuyers();
    }

    retrieveContracts() {
        ContractDataService.getAll()
            .then(response => {
                this.setState({
                    contracts: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshContractList() {
        this.retrieveContracts();
        this.setState({
            currentContract: null,
            currentContractIndex: -1
        });
    }

    retrieveAssemblyUnits() {
        AssemblyUnitDataService.getAll()
            .then(response => {
                this.setState({
                    products: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshAssemblyUnitList() {
        this.retrieveAssemblyUnits();
        this.setState({
            currentContract: {
                product: null,
            },
            currentAssemblyUnitIndex: -1
        });
    }

    retrieveBuyers() {
        BuyerDataService.getAll()
            .then(response => {
                this.setState({
                    buyers: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshBuyerList() {
        this.retrieveBuyers();
    }

    onChangeSearchCode(e) {
        const searchTask = e.target.value;

        this.setState({
            searchTask: searchTask
        });
    }

    retrieveTasks() {
        TaskDataService.getAll()
            .then(response => {
                this.setState({
                    tasks: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveTasks();
        this.setState({
            currentTask: null,
            currentIndex: -1
        });
    }

    setActiveTask(task, index) {
        this.setState({
            currentTask: task,
            currentIndex: index
        });
    }

    searchCode() {
        this.setState({
            currentTask: null,
            currentIndex: -1
        });

        TaskDataService.findByCode(this.state.searchCode)
            .then(response => {
                this.setState({
                    tasks: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchCode, tasks, currentTask, currentIndex } = this.state;

        return (
            <div className="list-row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Поиск по номеру задания"
                            value={searchCode}
                            onChange={this.onChangeSearchCode}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={this.searchCode}
                                    >
                                    Найти
                                </button>
                            </div>
                        <div className="btn-link">
                            <Link to={"/addTask"} className="nav-link">
                                Добавить задание
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Список заданий</h4>

                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Код задания</th>
                            <th scope="col">Год задания</th>
                            <th scope="col">Номер договора</th>
                            <th scope="col">Продукция</th>
                            <th scope="col">Количество</th>
                        </tr>
                        </thead>
                        {tasks &&
                        tasks.map((task, index) => {
                            return (
                                <tbody>
                                <tr className={"table" +
                                (index === currentIndex ? "-info" : "")
                                }
                                    onClick={() => this.setActiveTask(task, index)}
                                    key={index}>
                                    <td>{task.code}</td>
                                    <td>{task.year}</td>
                                    <td>{task.contract.contract}</td>
                                    <td>{task.contract.product.name}</td>
                                    <td>{task.contract.quantity}</td>
                                </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </div>
                <div className="col-md-6">
                    {currentTask ? (
                        <div>
                            <h4>Задание</h4>
                            <div>
                                <label>
                                    <strong>Номер:</strong>
                                </label>{" "}
                                {currentTask.code}
                            </div>
                            <div>
                                <label>
                                    <strong>Год:</strong>
                                </label>{" "}
                                {currentTask.year}
                            </div>
                            <div>
                                <label>
                                    <strong>Продукция:</strong>
                                </label>{" "}
                                {currentTask.product.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Договор:</strong>
                                </label>{" "}
                                {currentTask.contract.contract}
                            </div>
                            <div>
                                <label>
                                    <strong>Заказчик:</strong>
                                </label>{" "}
                                {currentTask.buyer.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Этап:</strong>
                                </label>{" "}
                                {currentTask.stage}
                            </div>
                            <div>
                                <label>
                                    <strong>Количество:</strong>
                                </label>{" "}
                                {currentTask.contract.quantity}
                            </div>

                            <Link
                                to={"/tasks/" + currentTask.id}
                                className="badge badge-warning"
                                >
                                Изменить
                            </Link>

                            <Link
                                to={"/tasks/" + currentTask.id
                                + "/active/"}
                                className="badge badge-info"
                                >
                                Добавить в план
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Выберите задание для просмотра информации...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}