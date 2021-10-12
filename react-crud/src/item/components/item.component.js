import React, {Component} from "react";
import ItemDataService from "../../services/item.service";

export default class Item extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDecimalNumber = this.onChangeDecimalNumber.bind(this);
        this.getItem = this.getItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.state = {
            currentItem: {
                id: null,
                name: "",
                decimalNumber: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getItem(this.props.match.params.id);
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function(prevState) {
            return {
                currentItem: {
                    ...prevState.currentItem,
                    name: name
                }
            };
        });
    }

    onChangeDecimalNumber(e) {
        const decimalNumber = e.target.value;

        this.setState(prevState => ({
            currentItem: {
                ...prevState.currentItem,
                decimalNumber: decimalNumber
            }
        }));
    }

    getItem(id) {
        ItemDataService.get(id)
            .then(response => {
                this.setState({
                    currentItem: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateItem() {
        ItemDataService.update(
            this.state.currentItem.id,
            this.state.currentItem
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The item was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteItem() {
        ItemDataService.delete(this.state.currentItem.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/au')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentItem } = this.state;

        return (
            <div>
                { currentItem ? (
                    <div className="edit-form">
                        <h4>Деталь</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Наименование</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentItem.name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="decimalNumber">Децимальный номер</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="decimalNumber"
                                    value={currentItem.decimalNumber}
                                    onChange={this.onChangeDecimalNumber}
                                />
                            </div>
                        </form>

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteItem}
                        >
                            Удалить
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateItem}
                        >
                            Изменить
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Выберите деталь для просмотра...</p>
                    </div>
                )}
            </div>
        );
    }
}