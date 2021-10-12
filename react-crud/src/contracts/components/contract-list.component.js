import React, {Component} from "react";
import {Link} from "react-router-dom";
import AssemblyUnitDataService from "../../services/assembly-unit.service";
import ContractDataService from "../../services/contract.service";
import BuyerDataService from "../../services/buyer.service";

export default class ContractList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchContract = this.onChangeSearchContract.bind(this);
        this.onChangeSearchBuyer = this.onChangeSearchBuyer.bind(this);
        this.onChangeSearchStage = this.onChangeSearchStage.bind(this);
        this.onChangeSearchProduct = this.onChangeSearchProduct.bind(this);

        this.retrieveBuyers = this.retrieveBuyers.bind(this);
        this.retrieveAssemblyUnits = this.retrieveAssemblyUnits.bind(this);
        this.retrieveContracts = this.retrieveContracts.bind(this);
        this.refreshList = this.refreshList.bind(this);

        this.setActiveContract = this.setActiveContract.bind(this);
        this.searchContract = this.searchContract.bind(this);
        this.searchBuyer = this.searchBuyer.bind(this);
        this.searchStage = this.searchStage.bind(this);
        this.searchProduct = this.searchProduct.bind(this);

        this.state = {
            contracts: [],
            currentContract: null,
            currentIndex: -1,
            searchContract: "",

            buyers: [],

            products: [],
        };
    }

    componentDidMount() {
        this.retrieveBuyers();
        this.retrieveAssemblyUnits();
        this.retrieveContracts();
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

    refreshList() {
        this.retrieveBuyers();
        this.retrieveAssemblyUnits();
        this.retrieveContracts();
        this.setState({
            currentContract: null,
            currentIndex: -1
        });
    }

    onChangeSearchContract(e) {
        const searchContract = e.target.value;

        this.setState({
            searchContract: searchContract
        });
    }

    onChangeSearchBuyer(e) {
        const searchBuyer = e.target.value;

        this.setState({
            searchBuyer: searchBuyer
        });
    }

    onChangeSearchStage(e) {
        const searchStage = e.target.value;

        this.setState({
            searchStage: searchStage
        });
    }

    onChangeSearchProduct(e) {
        const searchProduct = e.target.value;

        this.setState({
            searchProduct: searchProduct
        });
    }

    setActiveContract(contract, index) {
        this.setState({
            currentContract: contract,
            currentIndex: index
        });
    }

    searchContract() {
        this.setState({
            currentContract: null,
            currentIndex: -1
        });

        ContractDataService.findByContract(this.state.searchContract)
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

    searchBuyer() {
        this.setState({
            currentContract: null,
            currentIndex: -1
        });

        ContractDataService.findByBuyer(this.state.searchBuyer)
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

    searchStage() {
        this.setState({
            currentContract: null,
            currentIndex: -1
        });

        ContractDataService.findByStage(this.state.searchStage)
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

    searchProduct() {
        this.setState({
            currentContract: null,
            currentIndex: -1
        });

        ContractDataService.findByProduct(this.state.searchProduct)
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

    render() {
        const { searchContract, searchBuyer, searchStage,
        searchProduct, contracts, currentIndex, currentContract } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Номер"
                            value={searchContract}
                            onChange={this.onChangeSearchContract}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchContract}
                            >
                                Найти
                            </button>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Заказчик"
                        value={searchBuyer}
                        onChange={this.onChangeSearchBuyer}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchBuyer}
                            >
                                Найти
                            </button>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Этап"
                        value={searchStage}
                        onChange={this.onChangeSearchStage}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchStage}
                            >
                                Найти
                            </button>
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Продукция"
                        value={searchProduct}
                        onChange={this.onChangeSearchProduct}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchProduct}
                            >
                                Найти
                            </button>
                        </div>
                        <div className="btn-link">
                            <Link to={"/addContract"} className="nav-link">
                                Добавить договор
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Список договоров</h4>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Договор</th>
                            <th scope="col">Заказчик</th>
                            <th scope="col">Этап</th>
                            <th scope="col">Продукция</th>
                            <th scope="col">Количество</th>
                        </tr>
                        </thead>
                        {contracts &&
                        contracts.map((contract, index) => {
                            return (
                                <tbody>
                                <tr className={"table" +
                                (index === currentIndex ? "-info" : "")
                                }
                                     onClick={() => this.setActiveContract(contract, index)}
                                     key={index}>
                                    <td>{contract.contract}</td>
                                    <td>{contract.buyer.name}</td>
                                    <td>{contract.stage}</td>
                                    <td>{contract.product.name}</td>
                                    <td>{contract.quantity}</td>
                                </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </div>
                <div className="col-md-6">
                    {currentContract ? (
                        <div>
                            <h4>Contract</h4>
                            <div>
                                <label>
                                    <strong>Договор:</strong>
                                </label>{" "}
                                {currentContract.contract}
                            </div>
                            <div>
                                <label>
                                    <strong>Заказчик:</strong>
                                </label>{" "}
                                {currentContract.buyer.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Этап:</strong>
                                </label>{" "}
                                {currentContract.stage}
                            </div>
                            <div>
                                <label>
                                    <strong>Продукция:</strong>
                                </label>{" "}
                                {currentContract.product.name}
                            </div>

                            <div>
                                <label>
                                    <strong>Количество:</strong>
                                </label>{" "}
                                {currentContract.quantity}
                            </div>

                            <Link
                                to={"/contract/" + currentContract.id}
                                className="badge badge-warning"
                            >
                                Изменить
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Выберите договор для просмотра...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}