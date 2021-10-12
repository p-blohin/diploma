import React, {Component} from "react";
import ItemDataService from "../../services/item.service";
import DepartmentDataService from "../../services/department.service";
import DepItemDataService from "../../services/dep-item.service";

export default class DepItemList extends Component {
    constructor(props) {
        super(props);
        this.getDepartment = this.getDepartment.bind(this);
        this.retrieveDepartments = this.retrieveDepartments.bind(this);

        this.retrieveDepItems = this.retrieveDepItems.bind(this);
        this.refreshDepItemsList = this.refreshDepItemsList.bind(this);
        this.setActiveDepItem = this.setActiveDepItem.bind(this);

        this.retrieveItems = this.retrieveItems.bind(this);
        this.refreshItemsList = this.refreshItemsList.bind(this);
        this.setActiveItem = this.setActiveItem.bind(this);

        this.onChangeWorkTime = this.onChangeWorkTime.bind(this);
        this.onChangeItem = this.onChangeItem.bind(this);
        this.saveDepItemRelation = this.saveDepItemRelation.bind(this);
        this.onChangeSearchItemName = this.onChangeSearchItemName.bind(this);
        this.searchItemName = this.searchItemName.bind(this);

        this.state = {
            depItems: [],
            currentDepItem: {
                id: null,
                depid: this.props.match.params.id,
                iid: null,
                workTime: ""
            },
            currentDepItemIndex: -1,

            departments: [],
            currentDepartment: {
                id: null,
                department: ""
            },
            currentDepartmentIndex: -1,

            items: [],
            currentItem: {
                id: null,
                name: ""
            },
            currentItemIndex: -1,
            searchItemName: ""
        };
    }

    componentDidMount() {
        this.getDepartment(this.state.currentDepItem.depid);
        this.retrieveDepartments();
        this.retrieveDepItems();
        this.retrieveItems();
    }

    retrieveDepItems() {
        DepItemDataService.findByDepId(this.state.currentDepItem.depid)
            .then(response => {
                this.setState({
                    depItems: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    getDepartment(id) {
        DepartmentDataService.get(id)
            .then(response => {
                this.setState({
                    currentDepartment: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    retrieveDepartments() {
        DepartmentDataService.getAll()
            .then(response => {
                this.setState({
                    departments: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshDepItemsList() {
        this.retrieveDepItems();
        this.setState({
            currentDepItem: null,
            currentDepItemIndex: -1
        });
    }

    setActiveDepItem(depItem, index) {
        this.setState({
            currentDepItem: depItem,
            currentDepItemIndex: index
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

    refreshItemsList() {
        this.retrieveItems();
        this.setState({
            currentItem: null,
            currentItemIndex: -1
        });
    }

    setActiveItem(item, index) {
        this.setState({
            currentItem: item,
            currentItemIndex: index
        });
    }

    onChangeWorkTime(e) {
        this.setState(function (prevState) {
            return {
                currentDepItem: {
                    ...prevState.currentDepItem,
                    workTime: e.target.value
                }
            };
        });
    }

    onChangeItem(e) {
        var currentItemId = this.state.currentItem.id;
        this.setState(function (prevState) {
            return {
                currentDepItem: {
                    ...prevState.currentDepItem,
                    iid: currentItemId
                }
            };
        });
    }

    onChangeSearchItemName(e) {
        const searchItemName = e.target.value;

        this.setState({
            searchItemName: searchItemName
        });
    }

    searchItemName() {
        this.setState({
            currentItem: null,
            currentIndex: -1
        });

        ItemDataService.findByName(this.state.searchItemName)
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

    saveDepItemRelation() {
        var data = {
            depid: this.state.currentDepartment,
            iid: this.state.currentItem,
            workTime: this.state.currentDepItem.workTime
        };

        DepItemDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    depid: response.data.depid,
                    iid: response.data.iid,
                    workTime: response.data.workTime
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {
            depItems, currentDepItemIndex, searchItemName,
            currentItem, items, currentItemIndex, currentDepartment } = this.state;

        return (
            <div className="list row">
                <div id="relations-list" className="col-md-6">
                    <h4>Список деталей: {currentDepartment.department}</h4>
                    <ul className="list-group">
                        {depItems &&
                        depItems.map((depItem, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentDepItemIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveDepItem(depItem, index)}
                                key={index}
                            >
                                {depItem.iid.name}, {depItem.workTime}
                            </li>
                        ))}
                        <button
                            className="btn btn-outline-success"
                            type="button"
                            onClick={this.saveDepItemRelation}
                        >
                            Сохранить
                        </button>
                    </ul>
                </div>
                <div id="items-list" className="col-md-6">
                    <h4>Список деталей</h4>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Поиск по наименованию"
                            value={searchItemName}
                            onChange={this.onChangeSearchItemName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchItemName}
                            >
                                Найти
                            </button>
                        </div>
                    </div>
                    <ul className="list-group">
                        {items &&
                        items.map((item, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentItemIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveItem(item, index)}
                                key={index}
                            >
                                {item.name} {item.decimalNumber}
                            </li>
                        ))}
                        {currentItem ? (
                            <div className="form-group">
                                <input
                                    placeholder="Введите время работы"
                                    type="text"
                                    className="form-control"
                                    required
                                    value={this.state.currentDepItem.workTime}
                                    onChange={this.onChangeWorkTime}
                                    name="contract"
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={this.onChangeItem}
                                >
                                    Добавить
                                </button>
                            </div>
                        ) : (
                            <p>Выберите деталь для добавления</p>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}