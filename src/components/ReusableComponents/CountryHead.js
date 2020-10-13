import React, { Component } from 'react';

class CountryHead extends Component {
    render() {
        const currentStatus = this.props.status;
        const currentCountryHead = this.props.countryheadname;
        let icon;
        switch (currentStatus) {
            case window.$Status.L2InProgress:
                icon = <div><i className="fa fa-clock-o orange" data-toggle="tooltip" data-placement="top" title={currentCountryHead}></i><span className="hide">{currentStatus}</span></div>;
                break;
            case window.$Status.L2Rejected:
                icon = <div><i className="fa fa-close red" data-toggle="tooltip" data-placement="top" title={currentCountryHead}></i><span className="hide">{currentStatus}</span></div>;
                break;
            case window.$Status.L2Approved:
                icon = <div><i className="fa fa-check green" data-toggle="tooltip" data-placement="top" title={currentCountryHead}></i><span className="hide">{currentStatus}</span></div>;
                break;
            case window.$Status.L3InProgress:
                icon = <div><i className="fa fa-check green" data-toggle="tooltip" data-placement="top" title={currentCountryHead}></i><span className="hide">{currentStatus}</span></div>;
                break;
            case window.$Status.L3Approved:
                icon = <div><i className="fa fa-check green" data-toggle="tooltip" data-placement="top" title={currentCountryHead}></i><span className="hide">{currentStatus}</span></div>;
                break;
            case window.$Status.L3Rejected:
                icon = <div><i className="fa fa-check green" data-toggle="tooltip" data-placement="top" title={currentCountryHead}></i><span className="hide">{currentStatus}</span></div>;
                break;
            case window.$Status.L4InProgress:
                icon = <div><i className="fa fa-check green" data-toggle="tooltip" data-placement="top" title={currentCountryHead}></i><span className="hide">{currentStatus}</span></div>;
                break;
            case window.$Status.L4Approved:
                icon = <div><i className="fa fa-check green" data-toggle="tooltip" data-placement="top" title={currentCountryHead}></i><span className="hide">{currentStatus}</span></div>;
                break;
            case window.$Status.L4Rejected:
                icon = <div><i className="fa fa-check green" data-toggle="tooltip" data-placement="top" title={currentCountryHead}></i><span className="hide">{currentStatus}</span></div>;
                break;
            case window.$Status.UserCreationInProgress:
                icon = <div><i className="fa fa-check green" data-toggle="tooltip" data-placement="top" title={currentCountryHead}></i><span className="hide">{currentStatus}</span></div>;
                break;
            case window.$Status.UserCreationConfirmed:
                icon = <div><i className="fa fa-check green" data-toggle="tooltip" data-placement="top" title={currentCountryHead}></i><span className="hide">{currentStatus}</span></div>;
                break;
            //In Progress, L1 In Progress, L1 Approved, L1 Rejected
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