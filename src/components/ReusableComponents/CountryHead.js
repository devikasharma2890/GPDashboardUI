import React, { Component } from 'react';

class CountryHead extends Component {
    render() {
        const currentStatus = this.props.status;
        const currentCountryHead = this.props.countryhead;
        let icon;
        switch (currentStatus) {
            case "L2 Rejected":
                icon = <div><i className="fa fa-close red" data-toggle="tooltip" data-placement="top" title={currentCountryHead}></i><span className="hide">{currentStatus}</span></div>;
                break;
            case "L2 In Progress":
                icon = <div><i className="fa fa-clock-o orange" data-toggle="tooltip" data-placement="top" title={currentCountryHead}></i><span className="hide">{currentStatus}</span></div>;
                break;
            case "L2 Approved":
                icon = <div><i className="fa fa-check green" data-toggle="tooltip" data-placement="top" title={currentCountryHead}></i><span className="hide">{currentStatus}</span></div>;
                break;
            case "UserCreation In Progress":
                icon = <div><i className="fa fa-check green" data-toggle="tooltip" data-placement="top" title={currentCountryHead}></i><span className="hide">{currentStatus}</span></div>;
                break;
            case "UserCreation Confirmed":
                icon = <div><i className="fa fa-check green" data-toggle="tooltip" data-placement="top" title={currentCountryHead}></i><span className="hide">{currentStatus}</span></div>;
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

export default CountryHead