import React, { Component } from 'react';

class DeactivateUser extends Component {
    render() {
        const currentStatus = this.props.status;
     
        let icon;
        if(currentStatus==="Closed")
        {
            icon = <div><i className="fa fa-check green"  ></i><span className="hide">{currentStatus}</span></div>;
        }
        else if(currentStatus ==="Support In Progress")
        {
            icon = <div><i className="fa fa-clock-o orange"  ></i><span className="hide">{currentStatus}</span></div>;
        }
        else
        {
            icon = <div></div>;
        }
        

        return (
            <div>{icon}</div>
        )
    }
}

export default DeactivateUser