import React, {Component} from "react";
import BuyerDataService from "../../services/buyer.service";

export default class Buyer extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.getBuyer = this.getBuyer.bind(this);
        this.updateBuyer = this.updateBuyer.bind(this);
        this.deleteBuyer = this.deleteBuyer.bind(this);

        this.state = {
            currentBuyer: {
                id: null,
                name: "",
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getBuyer(this.props.match.params.id);
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function(prevState) {
            return {
                currentBuyer: {
                    ...prevState.currentBuyer,
                    name: name
                }
            };
        });
    }

    getBuyer(id) {
        BuyerDataService.get(id)
            .then(response => {
                this.setState({
                    currentBuyer: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateBuyer() {
        BuyerDataService.update(
            this.state.currentBuyer.id,
            this.state.currentBuyer
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "Заказчик успешно изменён!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteBuyer() {
        BuyerDataService.delete(this.state.currentBuyer.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/buyer')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentBuyer } = this.state;

        return (
            <div>
                { currentBuyer ? (
                    <div className="edit-form">
                        <h4>Организация</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Название</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentBuyer.name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                        </form>

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteBuyer}
                        >
                            Удалить
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateBuyer}
                        >
                            Изменить
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Выберите организацию для просмотра...</p>
                    </div>
                )}
            </div>
        );
    }
}