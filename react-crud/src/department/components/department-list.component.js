import React, {Component} from "react";
import DepartmentDataService from "../../services/department.service";
import {Link} from "react-router-dom";

export default class DepartmentList extends Component {
    constructor(props) {
        super(props);
        this.retrieveDepartments = this.retrieveDepartments.bind(this);
        this.onChangeSearchDepartment = this.onChangeSearchDepartment.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveDepartment = this.setActiveDepartment.bind(this);
        this.searchDepartment = this.searchDepartment.bind(this);

        this.state = {
            departments: [],
            currentDepartment: null,
            currentIndex: -1,
            searchDepartment: ""
        };
    }

    componentDidMount() {
        this.retrieveDepartments();
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

    onChangeSearchDepartment(e) {
        const searchDepartment = e.target.value;

        this.setState({
            searchDepartment: searchDepartment
        });
    }

    refreshList() {
        this.setState({
            currentDepartment: null,
            currentIndex: -1
        });
    }

    setActiveDepartment(department, index) {
        this.setState({
            currentDepartment: department,
            currentIndex: index
        });
    }

    searchDepartment() {
        this.setState({
            currentDepartment: null,
            currentIndex: -1
        });
        DepartmentDataService.findByDepartment(this.state.searchDepartment)
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

    render() {
        const { searchDepartment, departments, currentDepartment, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Поиск по названию отдела"
                            value={searchDepartment}
                            onChange={this.onChangeSearchDepartment}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchDepartment}
                            >
                                Найти
                            </button>
                        </div>
                        <div className="btn-link">
                            <Link to={"/addDepartment"} className="nav-link">
                                Добавить отдел
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Список отделов</h4>

                    <ul className="list-group">
                        {departments &&
                        departments.map((department, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveDepartment(department, index)}
                                key={index}
                            >
                                {department.department}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-mb-6">
                    {currentDepartment ? (
                        <div>
                            <h4>Отдел</h4>
                            <div>
                                <label>
                                    <strong>Наименование отдела:</strong>
                                </label>{" "}
                                {currentDepartment.department}
                            </div>

                            <Link
                                to={"/department/" + currentDepartment.id}
                                className="badge badge-warning"
                            >
                                Изменить
                            </Link>

                            <Link
                                to={"/department/" + currentDepartment.id + "/relations/"}
                                className="badge badge-info"
                            >
                                Просмотреть изготавливаемые детали
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Выбериет отдел для просмотра...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}