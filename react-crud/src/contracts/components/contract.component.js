import React, {Component} from "react";
import ContractDataService from "../../services/contract.service"
import BuyerDataService from "../../services/buyer.service";
import AssemblyUnitDataService from "../../services/assembly-unit.service";

export default class Contract extends Component {
    constructor(props) {
        super(props);
        this.onChangeContract = this.onChangeContract.bind(this);
        this.onChangeBuyer = this.onChangeBuyer.bind(this);
        this.onChangeStage = this.onChangeBuyer.bind(this);
        this.onChangeProduct = this.onChangeProduct.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.getContract = this.getContract.bind(this);
        this.updateContract = this.updateContract.bind(this);
        this.deleteContract = this.deleteContract.bind(this);

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
                quantity: "",
                published: false
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

            message: ""
        };
    }

    componentDidMount() {
        this.getContract(this.props.match.params.id);
        this.retrieveBuyers();
        this.retrieveAssemblyUnits();
    }

    onChangeContract(e) {
        const contract = e.target.value;

        this.setState(function (prevState) {
            return {
                currentContract: {
                    ...prevState.currentContract,
                    contract: contract
                }
            };
        });
    }

    onChangeBuyer(e) {
        const buyer = e.target.value;

        this.setState(function (prevState) {
            return {
                currentContract: {
                    ...prevState.currentContract,
                    buyer: buyer
                }
            };
        });
    }

    onChangeStage(e) {
        const stage = e.target.value;

        this.setState(function (prevState) {
            return {
                currentContract: {
                    ...prevState.currentContract,
                    stage: stage
                }
            };
        });
    }

    onChangeProduct(e) {
        const product = e.target.value;

        this.setState(function (prevState) {
            return {
                currentContract: {
                    ...prevState.currentContract,
                    product: product
                }
            };
        });
    }

    onChangeQuantity(e) {
        const quantity = e.target.value;

        this.setState(function (prevState) {
            return {
                currentContract: {
                    ...prevState.currentContract,
                    quantity: quantity
                }
            };
        });
    }

    getContract(id) {
        ContractDataService.get(id)
            .then(response => {
                this.setState({
                    currentContract: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateContract() {
        ContractDataService.update(
            this.state.currentContract.id,
            this.state.currentContract
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "Договор успешно изменён!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteContract() {
        ContractDataService.delete(this.state.currentContract.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/contract')
            })
            .catch(e => {
                console.log(e);
            });
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
            currentBuyer: {
                id: buyer
            },
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
            currentAssemblyUnit: {
                id: assemblyUnit
            },
            currentAssemblyUnitIndex: index
        });
    }

    render() {
        const { currentContract, currentBuyerIndex, buyers,
            currentAssemblyUnitIndex, assemblyUnits } = this.state;

        return(
            <div>
                { currentContract ? (
                    <div className="edit-form">
                        <h4>Договор</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="contract">Номер договора</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="contract"
                                    value={currentContract.contract}
                                    onChange={this.onChangeContract}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="buyer">Заказчик</label>
                                <select className="custom-select">
                                    {buyers &&
                                    buyers.map((buyer, index) => (
                                        <option
                                            className={
                                                "list-group-item " +
                                                (index === currentBuyerIndex ? "active" : "")
                                            }
                                            onClick={() => this.setActiveBuyer(buyer, index)}
                                            key={index}
                                            onChange={this.onChangeBuyer}
                                        >
                                            {buyer.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stage">Этап договора</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="stage"
                                    value={currentContract.stage}
                                    onChange={this.onChangeStage}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="product">Продукция</label>
                                <select className="custom-select">
                                    {assemblyUnits &&
                                    assemblyUnits.map((assemblyUnit, index) => (
                                        <option
                                            className={
                                                "list-group-item " +
                                                (index === currentAssemblyUnitIndex ? "active" : "")
                                            }
                                            onClick={() => this.setActiveAssemblyUnit(assemblyUnit, index)}
                                            key={index}
                                            onChange={this.onChangeProduct}
                                        >
                                            {assemblyUnit.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="quantity">Количество</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="quantity"
                                    value={currentContract.quantity}
                                    onChange={this.onChangeQuantity}
                                />
                            </div>
                        </form>

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteContract}
                            >
                            Удалить
                        </button>

                        <button
                            className="badge badge-success"
                            onClick={this.updateContract}
                            >
                            Изменить
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Выберите договор для просмотра...</p>
                    </div>
                )}
            </div>
        );
    }
}