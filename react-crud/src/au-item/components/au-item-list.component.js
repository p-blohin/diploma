import React, {Component} from "react";
import ItemDataService from "../../services/item.service";
import AssemblyUnitDataService from "../../services/assembly-unit.service";
import AuItemDataService from "../../services/au-item.service";

export default class AuItemList extends Component {
    constructor(props) {
        super(props);
        this.getAssemblyUnit = this.getAssemblyUnit.bind(this);
        this.retrieveAssemblyUnits = this.retrieveAssemblyUnits.bind(this);

        this.retrieveAuItems = this.retrieveAuItems.bind(this);
        this.refreshAuItemsList = this.refreshAuItemsList.bind(this);
        this.setActiveAuItem = this.setActiveAuItem.bind(this);

        this.retrieveItems = this.retrieveItems.bind(this);
        this.refreshItemsList = this.refreshItemsList.bind(this);
        this.setActiveItem = this.setActiveItem.bind(this);

        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeItem = this.onChangeItem.bind(this);
        this.saveAuItemRelation = this.saveAuItemRelation.bind(this);
        this.onChangeSearchItemName = this.onChangeSearchItemName.bind(this);
        this.searchItemName = this.searchItemName.bind(this);

        //const chosenAuid = this.props.match.params.id;

        this.state = {
            auItems: [],
            currentAuItem: {
                id: null,
                auid: this.props.match.params.id,
                iid: null,
                quantity: ""
            },
            currentAuItemIndex: -1,

            assemblyUnits: [],
            currentAssemblyUnit: {
                id: null,
                name: ""
            },
            currentAssemblyUnitIndex: -1,

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
        this.getAssemblyUnit(this.state.currentAuItem.auid);
        this.retrieveAssemblyUnits();
        this.retrieveAuItems();
        this.retrieveItems();
    }

    retrieveAuItems() {
        AuItemDataService.findByAuId(this.state.currentAuItem.auid)
            .then(response => {
                this.setState({
                    auItems: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    getAssemblyUnit(id) {
        AssemblyUnitDataService.get(id)
            .then(response => {
                this.setState({
                    currentAssemblyUnit: response.data
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
                    assemblyUnits: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshAuItemsList() {
        this.retrieveAuItems();
        this.setState({
            currentAuItem: null,
            currentAuItemIndex: -1
        });
    }

    setActiveAuItem(auItem, index) {
        this.setState({
            currentAuItem: auItem,
            currentAuItemIndex: index
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

    onChangeQuantity(e) {
        this.setState(function (prevState) {
            return {
                currentAuItem: {
                    ...prevState.currentAuItem,
                    quantity: e.target.value
                }
            };
        });
    }

    onChangeItem() {
        var currentItemId = this.state.currentItem.id;
        this.setState(function (prevState) {
            return {
                currentAuItem: {
                    ...prevState.currentAuItem,
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

    saveAuItemRelation() {
        var data = {
            auid: this.state.currentAssemblyUnit,
            iid: this.state.currentItem,
            quantity: this.state.currentAuItem.quantity
        };

        AuItemDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    auid: response.data.auid,
                    iid: response.data.iid,
                    quantity: response.data.quantity
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { auItems, currentAuItemIndex, searchItemName,
        currentItem, items, currentItemIndex, currentAssemblyUnit } = this.state;

        return (
            <div className="list row">
                <div id="relations-list" className="col-md-6">
                    <h4>Дерево деталей: {currentAssemblyUnit.name}</h4>
                    <ul className="list-group">
                        {auItems &&
                        auItems.map((auItem, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentAuItemIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveAuItem(auItem, index)}
                                key={index}
                            >
                                {auItem.iid.name}, {auItem.quantity} шт.
                            </li>
                        ))}
                        <button
                            className="btn btn-outline-success"
                            type="button"
                            onClick={this.saveAuItemRelation}
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
                                    placeholder="Введите количество деталей"
                                    type="text"
                                    className="form-control"
                                    required
                                    value={this.state.currentAuItem.quantity}
                                    onChange={this.onChangeQuantity}
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