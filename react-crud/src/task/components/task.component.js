import React, {Component} from "react";
import TaskDataService from "../../services/task.service";
import ContractDataService from "../../services/contract.service"
import BuyerDataService from "../../services/buyer.service";
import AssemblyUnitDataService from "../../services/assembly-unit.service";

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.onChangeCode = this.onChangeCode.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeContract = this.onChangeContract.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.retrieveContracts = this.retrieveContracts.bind(this);
        this.refreshContractList = this.refreshContractList.bind(this);
        this.setActiveContract = this.setActiveContract.bind(this);

        this.retrieveBuyers = this.retrieveBuyers.bind(this);
        this.refreshBuyerList = this.refreshBuyerList.bind(this);

        this.retrieveAssemblyUnits = this.retrieveAssemblyUnits.bind(this);
        this.refreshAssemblyUnitList = this.refreshAssemblyUnitList.bind(this);

        this.state = {
            currentTask: {
                id: null,
                code: "",
                year: ""
            },

            contracts:[],
            currentContract: {
                id: null,
                contract: "",
                product: "",
                buyer: "",
                stage: ""
            },
            currentContractIndex: -1,

            currentProduct: {
                id: null,
                name: "",
                decimalNumber: ""
            },

            currentBuyer: {
                id: null,
                name: ""
            },

            message: ""
        };
    }

    componentDidMount() {
        this.getTask(this.props.match.params.id);
        this.retrieveContracts();
        this.retrieveAssemblyUnits();
        this.retrieveBuyers();
    }

    getTask(id) {
        TaskDataService.get(id)
            .then(response => {
                this.setState({
                    currentTask: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    onChangeCode(e) {
        const code = e.target.value;

        this.setState(prevState => ({
            currentTask: {
                ...prevState.currentTask,
                code: code
            }
        }));
    }

    onChangeYear(e) {
        const year = e.target.value;

        this.setState(prevState => ({
            currentTask: {
                ...prevState.currentTask,
                year: year
            }
        }));
    }

    onChangeContract(e) {
        const contract = e.target.value;

        this.setState(prevState => ({
            currentContract: {
                ...prevState.currentContract,
                contract: contract
            }
        }));
    }

    updateTask() {
        var currentTask = {
            code: this.state.currentTask.code,
            year: this.state.currentTask.year,
            product: this.state.currentProduct,
            contract: this.state.currentContract,
            buyer: this.state.currentBuyer,
            stage: this.state.currentContract.stage,
        };
        TaskDataService.update(
            this.state.currentTask.id,
            currentTask
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "Задание успешно изменено!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteTask() {
        TaskDataService.delete(this.state.currentTask.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/tasks')
            })
            .catch(e => {
                console.log(e);
            });
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

    setActiveContract(contract, index) {
        this.setState({
            currentContract: {
                id: contract.id,
                stage: contract.stage
            },
            currentProduct: {
                id: contract.product.id
            },
            currentBuyer: {
                id: contract.buyer.id
            },
            currentContractIndex: index,
        });
        console.log(contract);
    }

    render() {
        const { currentTask, contracts, currentContractIndex } = this.state;
        return (
            <div>
                { currentTask ? (
                    <div className="edit-form">
                        <h4>Задание</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="code">Код задания</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="code"
                                    value={currentTask.code}
                                    onChange={this.onChangeCode}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="year">Год задания</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="year"
                                    value={currentTask.year}
                                    onChange={this.onChangeYear}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contract">Договор</label>
                                <ul className="list-group">
                                    {contracts &&
                                    contracts.map((contract, index) => (
                                        <li
                                            className={
                                                "list-group-item " +
                                                (index === currentContractIndex ? "active" : "")
                                            }
                                            onClick={() => this.setActiveContract(contract, index)}
                                            key={index}

                                        >
                                            {contract.contract}, этап {contract.stage}, {contract.buyer.name}, {contract.product.name}, {contract.quantity} шт.
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </form>

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteTask}
                        >
                            Удалить
                        </button>

                        <button
                            className="badge badge-success"
                            onClick={this.updateTask}
                        >
                            Изменить
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Выберите задание для просмотра...</p>
                    </div>
                )}
            </div>
        );
    }
}