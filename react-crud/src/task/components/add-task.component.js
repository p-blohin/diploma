import React, {Component} from "react";
import ContractDataService from "../../services/contract.service";
import TaskDataService from "../../services/task.service";
import BuyerDataService from "../../services/buyer.service";
import AssemblyUnitDataService from "../../services/assembly-unit.service";

export default class AddTask extends Component {
    constructor(props) {
        super(props);
        this.onChangeCode = this.onChangeCode.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeContract = this.onChangeContract.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.newTask = this.newTask.bind(this);

        this.retrieveContracts = this.retrieveContracts.bind(this);
        this.refreshContractList = this.refreshContractList.bind(this);
        this.setActiveContract = this.setActiveContract.bind(this);

        this.retrieveBuyers = this.retrieveBuyers.bind(this);
        this.refreshBuyerList = this.refreshBuyerList.bind(this);

        this.retrieveAssemblyUnits = this.retrieveAssemblyUnits.bind(this);
        this.refreshAssemblyUnitList = this.refreshAssemblyUnitList.bind(this);

        this.state = {
            id: null,
            code: "",
            year: "",

            contracts: [],
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

            submitted: false
        };
    }

    onChangeCode(e) {
        this.setState({
            code: e.target.value
        });
    }

    onChangeYear(e) {
        this.setState({
            year: e.target.value
        });
    }

    onChangeContract(e) {
        this.setState({
            currentContract: e.target.value
        });
    }

    componentDidMount() {
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

    saveTask() {
        var data = {
            code: this.state.code,
            year: this.state.year,
            product: this.state.currentProduct,
            contract: this.state.currentContract,
            buyer: this.state.currentBuyer,
            stage: this.state.currentContract.stage,
        };
        console.log(data);

        TaskDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    code: response.data.code,
                    year: response.data.year,
                    product: response.data.product,
                    contract: response.data.contract,
                    buyer: response.data.buyer,
                    stage: response.data.stage,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newTask() {
        this.setState({
            id: null,
            code: "",
            year: "",

            contracts: [],
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

            submitted: false
        });
    }

    render() {
        const { contracts, currentContractIndex } = this.state;

        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Задание успешно добавлено!</h4>
                        <button className="btn btn-success" onClick={this.newTask}>
                            Создать новое задание
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="code">Код задания</label>
                            <input
                                type="text"
                                className="form-control"
                                id="code"
                                required
                                value={this.state.code}
                                onChange={this.onChangeCode}
                                name="code"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="year">Год задания</label>
                            <input
                                type="text"
                                className="form-control"
                                id="year"
                                required
                                value={this.state.year}
                                onChange={this.onChangeYear}
                                name="year"
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

                        <button onClick={this.saveTask} className="btn btn-success">
                            Добавить
                        </button>
                    </div>
                )}
            </div>
        );
    }
}