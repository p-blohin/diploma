import React, {Component} from "react";
import PlanDataService from "../../services/plan-service";

export default class PlansList extends Component {
    constructor(props) {
        super(props);
        this.retrievePlans = this.retrievePlans.bind(this);
        this.setActivePlan = this.setActivePlan.bind(this);
        this.refreshList = this.refreshList.bind(this);

        this.state = {
            plans: [],
            currentPlan: null,
            currentIndex: -1,

            currentDepId: this.props.match.params.id
        };
    }

    componentDidMount() {
        this.retrievePlans();
    }

    retrievePlans() {
        PlanDataService.getAllByDepId(this.state.currentDepId)
            .then(response => {
                this.setState({
                    plans: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrievePlans();
        this.setState({
            currentPlan: null,
            currentIndex: -1
        });
    }

    setActivePlan(plan, index) {
        this.setState({
            currentPlan: plan,
            currentIndex: index
        });
    }

    render() {
        const { plans, currentIndex } = this.state;

        return (
            <div className="col-md-6">
                <h4>План</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Код задания</th>
                        <th scope="col">Продукция</th>
                        <th scope="col">Деталь</th>
                        <th scope="col">Количество</th>
                    </tr>
                    </thead>
                    {plans &&
                    plans.map((plan, index) => {
                        return (
                            <tbody>
                            <tr className={"table" +
                            (index === currentIndex ? "-info" : "")
                            }
                                onClick={() => this.setActivePlan(plan, index)}
                                key={index}>
                                <td>{plan.task.code}-{plan.task.year}</td>
                                <td>{plan.task.product.name}</td>
                                <td>{plan.item.name}</td>
                                <td>{plan.quantity}</td>
                            </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        )
    }
}