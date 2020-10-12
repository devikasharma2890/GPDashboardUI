import React, { Component } from 'react';

class HR extends Component {
    render() {
        const currentStatus = this.props.status;
        let icon;
        switch (currentStatus) {
            case "L3 Rejected":
                icon = <div><i className="fa fa-close red"  ></i><span className="hide">{currentStatus}</span></div>;
                break;
            case "L3 In Progress":
                icon = <div><i className="fa fa-clock-o orange"  ></i><span className="hide">{currentStatus}</span></div>;
                break;
            case "L3 Approved":
                icon = <div><i className="fa fa-check green"  ></i><span className="hide">{currentStatus}</span></div>;
                break;
            case "UserCreation In Progress":
                icon = <div><i className="fa fa-check green"  ></i><span className="hide">{currentStatus}</span></div>;
                break;
            case "UserCreation Confirmed":
                icon = <div><i className="fa fa-check green"  ></i><span className="hide">{currentStatus}</span></div>;
                break;
            default:
                icon = <div></div>;
                break;
        }

        return (
            <div>{icon}</div>
        )
    }
}

export default HR