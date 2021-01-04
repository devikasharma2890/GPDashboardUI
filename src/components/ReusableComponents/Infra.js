import React, { Component } from 'react';

class Infra extends Component {
    render() {
        const currentStatus = this.props.status;
       
        let icon;
        switch (currentStatus) {
            case window.$Status.L4Rejected:
                icon = <div><i className="fa fa-close red"  ></i><span className="hide">{currentStatus}</span></div>;
                break;
            case window.$Status.L4InProgress:
                icon = <div><i className="fa fa-clock-o orange"  ></i><span className="hide">{currentStatus}</span></div>;
                break;
            case window.$Status.L4Approved:
                icon = <div><i className="fa fa-check green"  ></i><span className="hide">{currentStatus}</span></div>;
                break;
            case window.$Status.UserCreationInProgress:
                icon = <div><i className="fa fa-check green"  ></i><span className="hide">{currentStatus}</span></div>;
                break;
            case window.$Status.UserCreationConfirmed:
                icon = <div><i className="fa fa-check green"  ></i><span className="hide">{currentStatus}</span></div>;
                break;
            
            //In Progress, L1/L2/L3 In Progress, L1/L2/L3 Approved, L1/L2/L3 Rejected 
            default:
                icon = <div></div>;
                break;
        }

        return (
            <div>{icon}</div>
        )
    }
}

export default Infra