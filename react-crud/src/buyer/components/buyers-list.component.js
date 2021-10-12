import React, {Component} from "react";
import BuyerDataService from "../../services/buyer.service";
import {Link} from "react-router-dom";

export default class BuyersList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveBuyers = this.retrieveBuyers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveBuyer = this.setActiveBuyer.bind(this);
        this.searchBuyer = this.searchBuyer.bind(this);

        this.state = {
            buyers: [],
            currentBuyer: null,
            currentIndex: -1,
            searchName: ""
        };
    }

    componentDidMount() {
        this.retrieveBuyers();
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
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

    refreshList() {
        this.retrieveBuyers();
        this.setState({
            currentBuyer: null,
            currentIndex: -1
        });
    }

    setActiveBuyer(buyer, index) {
        this.setState({
            currentBuyer: buyer,
            currentIndex: index
        });
    }

    searchBuyer() {
        this.setState({
            currentBuyer: null,
            currentIndex: -1
        });
        BuyerDataService.findByName(this.state.searchName)
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

    render() {
        const { searchName, buyers, currentBuyer, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Поиск по названию организации"
                            value={searchName}
                            onChange={this.onChangeSearchName}
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
                        <div className="btn-link">
                            <Link to={"/addBuyer"} className="nav-link">
                                Добавить организацию
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Список заказчиков</h4>

                    <ul className="list-group">
                        {buyers &&
                        buyers.map((buyer, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveBuyer(buyer, index)}
                                key={index}
                            >
                                {buyer.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentBuyer ? (
                        <div>
                            <h4>Заказчик</h4>
                            <div>
                                <label>
                                    <strong>Наименование организации:</strong>
                                </label>{" "}
                                {currentBuyer.name}
                            </div>

                            <Link
                                to={"/buyer/" + currentBuyer.id}
                                className="badge badge-warning"
                            >
                                Изменить
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Выберите организацию для просмотра...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}