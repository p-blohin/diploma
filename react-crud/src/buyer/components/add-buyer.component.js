import React, {Component} from "react";
import BuyerDataService from "../../services/buyer.service";

export default class AddBuyer extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.saveBuyer = this.saveBuyer.bind(this);
        this.newBuyer = this.newBuyer.bind(this);

        this.state = {
            id: null,
            name: "",

            submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    saveBuyer() {
        var data = {
            name: this.state.name
        };

        BuyerDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newBuyer() {
        this.setState({
            id: null,
            name: "",

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Организация успешно добавлена!</h4>
                        <button className="btn btn-success" onClick={this.newBuyer}>
                            Добавить нового заказчика
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Название организации</label>
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

                        <button onClick={this.saveBuyer} className="btn btn-success">
                            Добавить
                        </button>
                    </div>
                )}
            </div>
        );
    }
}