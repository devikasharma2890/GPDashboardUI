import React, { Component } from 'react';

class Supervisor extends Component {
    render() {

        const currentStatus = this.props.status;
        const currentSupervisor = this.props.Supervisor;
        let icon;
        switch (currentStatus) {
            case "L1 Rejected":
                icon = <div><i className="fa fa-close red" data-toggle="tooltip" data-placement="top" title={currentSupervisor}></i><span className="hide">{currentStatus}</span></div>;
                break;
            case "L1 In Progress":
                icon = <div><i className="fa fa-clock-o orange" data-toggle="tooltip" data-placement="top" title={currentSupervisor}></i><span className="hide">{currentStatus}</span></div>;
                break;
            case "In Progress":
                icon = <div><i className="fa fa-clock-o orange" data-toggle="tooltip" data-placement="top" title={currentSupervisor}></i><span className="hide">{currentStatus}</span></div>;
                break;
            default:
                icon = <div><i className="fa fa-check green" data-toggle="tooltip" data-placement="top" title={currentSupervisor}></i><span className="hide">{currentStatus}</span></div>;
                break;
        }

        return (
            <div>{icon}</div>
        )
    }
}

export default Supervisor