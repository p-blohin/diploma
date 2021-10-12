import React, {Component} from "react";
import PlanDataService from "../../services/plan-service";
import ContractDataService from "../../services/contract.service";
import AssemblyUnitDataService from "../../services/assembly-unit.service";
import BuyerDataService from "../../services/buyer.service";
import TaskDataService from "../../services/task.service";

export default class AddTaskToPlan extends Component {
    constructor(props) {
        super(props);
        this.addTaskToPlan = this.addTaskToPlan.bind(this);

        this.retrieveContracts = this.retrieveContracts.bind(this);

        this.getTask = this.getTask.bind(this);

        this.retrieveBuyers = this.retrieveBuyers.bind(this);

        this.getProduct = this.getProduct.bind(this);

        this.state = {
            tasks: [],
            product: "",
            currentTask: {
                id: this.props.match.params.id
            },
        }
    }

    componentDidMount() {
        this.getTask(this.props.match.params.id);
        this.retrieveContracts();
        this.getProduct(this.state.tasks.product);
        this.retrieveBuyers();
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

    getProduct(id) {
        AssemblyUnitDataService.get(this.state.tasks.product)
            .then(response => {
                this.setState({
                    product: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
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

    getTask(id) {
        TaskDataService.get(this.state.currentTask.id)
            .then(response => {
                this.setState({
                    tasks: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    addTaskToPlan() {
        var data = {
            task_id: this.state.tasks
        };

        console.log(data);

        PlanDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    task_id: response.data.task_id
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {tasks} = this.state;

        return (
            <div className="container">
                <div className="col-md-6">
                    <h4>Задание</h4>
                    <div>
                        <label>
                            <strong>Номер:</strong>
                        </label>{" "}
                        {tasks.code}
                    </div>
                    <div>
                        <label>
                            <strong>Год:</strong>
                        </label>{" "}
                        {tasks.year}
                    </div>
                    <div>
                        <label>
                            <strong>Продукция:</strong>
                        </label>{" "}
                        {tasks.product !== undefined? tasks.product.name : ''}
                    </div>
                    <div>
                        <label>
                            <strong>Договор:</strong>
                        </label>{" "}
                        {tasks.contract !==undefined? tasks.contract.contract : ''}
                    </div>
                    <div>
                        <label>
                            <strong>Заказчик:</strong>
                        </label>{" "}
                        {tasks.buyer !==undefined? tasks.buyer.name : ''}
                    </div>
                    <div>
                        <label>
                            <strong>Этап:</strong>
                        </label>{" "}
                        {tasks.stage}
                    </div>
                    <div>
                        <label>
                            <strong>Количество:</strong>
                        </label>{" "}
                        {tasks.contract !==undefined? tasks.contract.quantity : ''}
                    </div>
                    <h2>Добавить задание в план?</h2>
                    <button
                        className="btn btn-success"
                        onClick={this.addTaskToPlan}
                        >
                        Да
                    </button>
                    <button
                        className="btn btn-danger"
                        >
                        Нет
                    </button>
                </div>
            </div>
        );
    }
}