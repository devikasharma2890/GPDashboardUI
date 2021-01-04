import React, { Component } from 'react';

class Supervisor extends Component {
    render() {

        const currentStatus = this.props.status;
        const currentSupervisor = this.props.supervisorname;
        
        let icon;
        switch (currentStatus) {
            case window.$Status.L1Rejected:
                icon = <div><i className="fa fa-close red" data-toggle="tooltip" data-placement="top" title={currentSupervisor}></i><span className="hide">{currentStatus}</span></div>;
                break;
            case window.$Status.InProgress:
                icon = <div><i className="fa fa-clock-o orange" data-toggle="tooltip" data-placement="top" title={currentSupervisor}></i><span className="hide">{currentStatus}</span></div>;
                break;
            case window.$Status.L1InProgress:
                icon = <div><i className="fa fa-clock-o orange" data-toggle="tooltip" data-placement="top" title={currentSupervisor}></i><span className="hide">{currentStatus}</span></div>;
                break;
                
            //UserCreationConfirmed, UserCreation In Progress, L1/L2/L3/L4 Approved, L2/L3/L4 In Progress,L2,L3,L4 Rejected
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