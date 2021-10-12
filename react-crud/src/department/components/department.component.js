import React, {Component} from "react";
import DepartmentDataService from "../../services/department.service";

export default class Department extends Component {
    constructor(props) {
        super(props);
        this.onChangeDepartment = this.onChangeDepartment.bind(this);
        this.getDepartment = this.getDepartment.bind(this);
        this.updateDepartment = this.updateDepartment.bind(this);
        this.deleteDepartment = this.deleteDepartment.bind(this);

        this.state = {
            currentDepartment: {
                id: null,
                department: "",
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getDepartment(this.props.match.params.id);
    }

    onChangeDepartment(e) {
        const department = e.target.value;

        this.setState(function (prevState) {
            return {
                currentDepartment: {
                    ...prevState.currentDepartment,
                    department: department
                }
            };
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

    updateDepartment() {
        DepartmentDataService.update(
            this.state.currentDepartment.id,
            this.state.currentDepartment
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "Отдел успешно изменён!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteDepartment() {
        DepartmentDataService.delete(this.state.currentDepartment.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/department')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentDepartment } = this.state;

        return (
            <div>
                { currentDepartment ? (
                    <div className="edit-form">
                        <h4>Отдел</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="department">Отдел</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="department"
                                    value={currentDepartment.department}
                                    onChange={this.onChangeDepartment}
                                    />
                            </div>
                        </form>

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteDepartment}
                        >
                            Удалить
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateDepartment}
                        >
                            Изменить
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Выберите отдел для просмотра...</p>
                    </div>
                )}
            </div>
        );
    }
}