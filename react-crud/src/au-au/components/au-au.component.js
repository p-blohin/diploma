import React, {Component} from "react";
import AuAuDataService from "../../services/au-au.service";
import AssemblyUnitDataService from "../../services/assembly-unit.service";

export default class AuAu extends Component {
    constructor(props) {
        super(props);


        this.state = {
            currentAuAuRelation: {
                id: null,
                parentId: AssemblyUnitDataService.get(),
                childId: null
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getAuAu(this.props.match.params.id);
    }

    getAuAu(id) {
        AuAuDataService.get(id)
            .then(response => {
                this.setState({
                    currentAuAuRelation: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateAuAuRelation() {
        AuAuDataService.update(
            this.state.currentAuAuRelation.id,
            this.state.currentAuAuRelation
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The relation was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteAuAuRelation() {
        AuAuDataService.delete(this.state.currentAuAuRelation.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/au_au')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentAuAuRelation } = this.state;

        return (
            <div>
                { currentAuAuRelation ? (
                    <div className="edit-form">
                        <h4>Details Relations</h4>
                )}
            </div>
        );
    }
}