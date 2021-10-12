import React, {Component} from "react";
import ItemDataService from "../../services/item.service";
import {Link} from "react-router-dom";

export default class ItemList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveItems = this.retrieveItems.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveItem = this.setActiveItem.bind(this);
        this.searchName = this.searchName.bind(this);
        this.searchDecimalNumber = this.searchDecimalNumber.bind(this);
        this.onChangeSearchDecimalNumber = this.onChangeSearchDecimalNumber.bind(this);

        this.state = {
            items: [],
            currentItem: null,
            currentIndex: -1,
            searchName: "",
            searchDecimalNumber: ""
        };
    }

    componentDidMount() {
        this.retrieveItems();
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

    retrieveItems() {
        ItemDataService.getAll()
            .then(response => {
                this.setState({
                    items: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveItems();
        this.setState({
            currentItem: null,
            currentIndex: -1
        });
    }

    setActiveItem(item, index) {
        this.setState({
            currentItem: item,
            currentIndex: index
        });
    }

    searchName() {
        this.setState({
            currentItem: null,
            currentIndex: -1
        });

        ItemDataService.findByName(this.state.searchName)
            .then(response => {
                this.setState({
                    items: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchDecimalNumber() {
        this.setState({
            currentItem: null,
            currentIndex: -1
        });

        ItemDataService.findByDecimalNumber(this.state.searchDecimalNumber)
            .then(response => {
                this.setState({
                    items: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchDecimalNumber, searchName, items, currentItem, currentIndex } = this.state;

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
                                <Link to={"/addItem"} className="nav-link">
                                    Добавить деталь
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Список деталей</h4>

                    {/*<ul className="list-group">*/}
                    {/*    {items &&*/}
                    {/*    items.map((item, index) => (*/}
                    {/*        <li*/}
                    {/*            className={*/}
                    {/*                "list-group-item " +*/}
                    {/*                (index === currentIndex ? "active" : "")*/}
                    {/*            }*/}
                    {/*            onClick={() => this.setActiveItem(item, index)}*/}
                    {/*            key={index}*/}
                    {/*        >*/}
                    {/*            {item.name}*/}
                    {/*        </li>*/}
                    {/*    ))}*/}
                    {/*</ul>*/}

                    {/*<div className="container">*/}
                    {/*    <div className="row">*/}
                    {/*        <div className="col">Наименование</div>*/}
                    {/*        <div className="col">Децимальный номер</div>*/}
                    {/*    </div>*/}
                    {/*    {items &&*/}
                    {/*        items.map((item, index) => {*/}
                    {/*        return (*/}
                    {/*            <div className="row"*/}
                    {/*                onClick={() => this.setActiveItem(item, index)}*/}
                    {/*                key={index}>*/}
                    {/*                <div className="col">{item.name}</div>*/}
                    {/*                <div className="col">{item.decimalNumber}</div>*/}
                    {/*            </div>*/}
                    {/*        )*/}
                    {/*    })}*/}
                    {/*</div>*/}
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Наименование</th>
                            <th scope="col">Децимальный номер</th>
                        </tr>
                        </thead>
                        {items &&
                        items.map((item, index) => {
                            return (
                                <tbody>
                                <tr className={"table" +
                                (index === currentIndex ? "-info" : "")
                                }
                                    onClick={() => this.setActiveItem(item, index)}
                                    key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.decimalNumber}</td>
                                </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </div>

                <div className="col-md-6">
                    {currentItem ? (
                        <div>
                            <h4>Деталь</h4>
                            <div>
                                <label>
                                    <strong>Наименование:</strong>
                                </label>{" "}
                                {currentItem.name}
                            </div>
                            <div>
                                <label>
                                    <strong>ДСЕ:</strong>
                                </label>{" "}
                                {currentItem.decimalNumber}
                            </div>

                            <Link
                                to={"/item/" + currentItem.id}
                                className="badge badge-warning"
                            >
                                Изменить
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Выберите деталь для просмотра...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}