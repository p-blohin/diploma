import React, {Component} from "react";
import DepartmentDataService from "../../services/department.service";

export default class AddDepartment extends Component {
    constructor(props) {
        super(props);
        this.onChangeDepartment = this.onChangeDepartment.bind(this);
        this.saveDepartment = this.saveDepartment.bind(this);
        this.newDepartment = this.newDepartment.bind(this);

        this.state = {
            id: null,
            department: "",

            submitted: false
        };
    }

    onChangeDepartment(e) {
        this.setState({
            department: e.target.value
        });
    }

    saveDepartment() {
        var data = {
            department: this.state.department
        };

        DepartmentDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    department: response.data.department,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newDepartment() {
        this.setState({
            id: null,
            department: "",

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Отдел успешно добавлен!</h4>
                        <button className="btn btn-success" onClick={this.newDepartment}>
                            Добавить новый отдел
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="department">Название отдела</label>
                            <input
                                type="text"
                                className="from-control"
                                id="department"
                                required
                                value={this.state.department}
                                onChange={this.onChangeDepartment}
                                name="department"
                            />
                        </div>

                        <button onClick={this.saveDepartment} className="btn btn-success">
                            Добавить
                        </button>
                    </div>
                )}
            </div>
        );
    }
}