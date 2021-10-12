import React, {Component} from "react";
import ContractDataService from "../../services/contract.service";
import BuyerDataService from "../../services/buyer.service";
import AssemblyUnitDataService from "../../services/assembly-unit.service";

export default class AddContract extends Component {
    constructor(props) {
        super(props);
        this.onChangeContract = this.onChangeContract.bind(this);
        this.onChangeBuyer = this.onChangeBuyer.bind(this);
        this.onChangeStage = this.onChangeStage.bind(this);
        this.onChangeProduct = this.onChangeProduct.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.saveContract = this.saveContract.bind(this);
        this.newContract = this.newContract.bind(this);

        this.retrieveBuyers = this.retrieveBuyers.bind(this);
        this.refreshBuyerList = this.refreshBuyerList.bind(this);
        this.setActiveBuyer = this.setActiveBuyer.bind(this);

        this.retrieveAssemblyUnits = this.retrieveAssemblyUnits.bind(this);
        this.refreshAssemblyUnitList = this.refreshAssemblyUnitList.bind(this);
        this.setActiveAssemblyUnit = this.setActiveAssemblyUnit.bind(this);

        this.state = {
            currentContract: {
                id: null,
                contract: "",
                buyer: "",
                stage: "",
                product: "",
                quantity: ""
            },

            buyers:[],
            currentBuyer: {
                id: null,
                name: ""
            },
            currentBuyerIndex: -1,

            assemblyUnits: [],
            currentAssemblyUnit: {
                id: null,
                name: "",
                decimalNumber: ""
            },
            currentAssemblyUnitIndex: -1,

            submitted: false
        };
    }

    onChangeContract(e) {
        this.setState(function (prevState) {
            return {
                currentContract: {
                    ...prevState.currentContract,
                    contract: e.target.value
                }
            };
        });
    }

    onChangeBuyer() {
        var currentBuyerId = this.state.currentBuyer.id;
        this.setState(function (prevState) {
            return {
                currentContract: {
                    ...prevState.currentContract,
                    buyer: currentBuyerId
                }
            };
        });
    }

    onChangeStage(e) {
        this.setState(function (prevState) {
            return {
                currentContract: {
                    ...prevState.currentContract,
                    stage: e.target.value
                }
            };
        });
    }

    onChangeProduct() {
        var currentProductId = this.state.currentAssemblyUnit.id;
        this.setState(function (prevState) {
            return {
                currentContract: {
                    ...prevState.currentContract,
                    product: currentProductId
                }
            };
        });
    }

    onChangeQuantity(e) {
        this.setState(function (prevState) {
            return {
                currentContract: {
                    ...prevState.currentContract,
                    quantity: e.target.value
                }
            };
        });
    }

    // маунт таблиц
    componentDidMount() {
        this.retrieveBuyers();
        this.retrieveAssemblyUnits();
    }

    // лист с заказчиками
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
        this.setState({
            currentBuyer: null,
            currentBuyerIndex: -1
        });
    }

    setActiveBuyer(buyer, index) {
        this.setState({
            currentBuyer: buyer,
            currentBuyerIndex: index
        });
    }

    // лист с продукцией
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

    refreshAssemblyUnitList() {
        this.retrieveAssemblyUnits();
        this.setState({
            currentAssemblyUnit: null,
            currentAssemblyUnitIndex: -1
        });
    }

    setActiveAssemblyUnit(assemblyUnit, index) {
        this.setState({
            currentAssemblyUnit: assemblyUnit,
            currentAssemblyUnitIndex: index
        });
    }

    saveContract() {
        var data = {
            contract: this.state.currentContract.contract,
            buyer: this.state.currentBuyer,
            stage: this.state.currentContract.stage,
            product: this.state.currentAssemblyUnit,
            quantity: this.state.currentContract.quantity
        };
        console.log(data);

        ContractDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    contract: response.data.contract,
                    buyer: response.data.buyer,
                    stage: response.data.stage,
                    product: response.data.product,
                    quantity: response.data.quantity,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newContract() {
        this.setState({
            currentContract: {
                id: null,
                contract: "",
                buyer: "",
                stage: "",
                product: "",
                quantity: ""
            },

            currentBuyer: {
                id: null,
                name: ""
            },
            currentBuyerIndex: -1,

            currentAssemblyUnit: {
                id: null,
                name: "",
                decimalNumber: ""
            },
            currentAssemblyUnitIndex: -1,

            submitted: false
        });
    }



    render() {
        const { buyers, currentBuyerIndex, currentBuyer,
            assemblyUnits, currentAssemblyUnitIndex, currentAssemblyUnit } = this.state;

        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Договор успешно добавлен!</h4>
                        <button className="btn btn-success" onClick={this.newContract}>
                            Создать новый договор
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="contract">Номер договора</label>
                            <input
                                type="text"
                                className="form-control"
                                id="contract"
                                required
                                value={this.state.contract}
                                onChange={this.onChangeContract}
                                name="contract"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="buyer">Заказчик</label>
                            <ul className="list-group">
                                {buyers &&
                                buyers.map((buyer, index) => (
                                    <li
                                        className={
                                            "list-group-item " +
                                            (index === currentBuyerIndex ? "active" : "")
                                        }
                                        onClick={() => this.setActiveBuyer(buyer, index)}
                                        key={index}
                                    >
                                        {buyer.name}
                                    </li>
                                ))}
                                { currentBuyer ? (
                                    <button
                                        className={
                                            "btn " +
                                            (currentBuyerIndex > -1 ? "btn-outline-success"
                                                : "btn-outline-secondary")
                                        }
                                        type="button"
                                        onClick={this.onChangeBuyer}
                                    >
                                        Установить заказчика
                                    </button>
                                ) : (
                                    <p>Заказчик выбран</p>
                                )}
                            </ul>
                        </div>

                        <div className="form-group">
                            <label htmlFor="stage">Этап договора</label>
                            <input
                                type="text"
                                className="form-control"
                                id="stage"
                                required
                                value={this.state.stage}
                                onChange={this.onChangeStage}
                                name="stage"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="product">Продукция</label>
                            <ul className="list-group">
                                {assemblyUnits &&
                                assemblyUnits.map((assemblyUnit, index) => (
                                    <li
                                        className={
                                            "list-group-item " +
                                            (index === currentAssemblyUnitIndex ? "active" : "")
                                        }
                                        onClick={() => this.setActiveAssemblyUnit(assemblyUnit, index)}
                                        key={index}
                                    >
                                        {assemblyUnit.name}
                                    </li>
                                ))}
                                {currentAssemblyUnit ? (
                                    <button
                                        className={
                                            "btn " +
                                            (currentAssemblyUnitIndex > -1 ? "btn-outline-success"
                                                : "btn-outline-secondary")
                                        }
                                        type="button"
                                        onClick={this.onChangeProduct}
                                    >
                                        Установить продукцию
                                    </button>
                                ) : (
                                    <p>Продукция выбрана</p>
                                )}
                            </ul>
                        </div>

                        <div className="form-group">
                            <label htmlFor="quantity">Количество</label>
                            <input
                                type="text"
                                className="form-control"
                                id="quantity"
                                required
                                value={this.state.quantity}
                                onChange={this.onChangeQuantity}
                                name="quantity"
                            />
                        </div>

                        <button onClick={this.saveContract} className="btn btn-success">
                            Добавить
                        </button>
                    </div>
                )}
            </div>
        );
    }
}