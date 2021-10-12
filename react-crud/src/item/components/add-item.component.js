import React, {Component} from "react";
import ItemDataService from "../../services/item.service";

export default class AddItem extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDecimalNumber = this.onChangeDecimalNumber.bind(this);
        this.saveItem = this.saveItem.bind(this);
        this.newItem = this.newItem.bind(this);

        this.state = {
            id: null,
            name: "",
            decimalNumber: "",

            submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDecimalNumber(e) {
        this.setState({
            decimalNumber: e.target.value
        });
    }

    saveItem() {
        var data = {
            name: this.state.name,
            decimalNumber: this.state.decimalNumber
        };

        ItemDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    decimalNumber: response.data.decimalNumber,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newItem() {
        this.setState({
            id: null,
            name: "",
            decimalNumber: "",

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Деталь успешно добавлена!</h4>
                        <button className="btn btn-success" onClick={this.newItem}>
                            Создать новую деталь
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Наименование</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={this.state.name}
                                onChange={this.onChangeName}
                                name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="decimalNumber">Децимальный номер</label>
                            <input
                                type="text"
                                className="form-control"
                                id="decimalNumber"
                                required
                                value={this.state.decimalNumber}
                                onChange={this.onChangeDecimalNumber}
                                name="decimalNumber"
                            />
                        </div>

                        <button onClick={this.saveItem} className="btn btn-success">
                            Добавить
                        </button>
                    </div>
                )}
            </div>
        );
    }
}