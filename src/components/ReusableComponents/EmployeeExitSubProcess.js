import React, { Component } from 'react';
import { CallRESTAPI } from '../Helpers/Helper';
const { REACT_APP_API_URL } = process.env;

class EmployeeExitSubProcess extends Component {

  constructor(props) {
     
    super(props);
    this.state = {
        thisSubProcessId: this.props.thisSubProcessId,
        IsGemsDiamond: this.props.IsGemsDiamond,
        IsSAPWeb : this.props.IsSAPWeb,
        IsSalesForce: this.props.IsSalesForce,
        IsSAP: this.props.IsSAP,
        IsOptimum: this.props.IsOptimum,
        IsInsight: this.props.IsInsight,
        IsInfra: this.props.IsInfra,
        IsQwiki: this.props.IsQwiki,
        ExitTicketStatus: this.props.ExitTicketStatus
    };

  }
  componentDidMount() {
   
  
  }

 


  HandleClick = function (element) {
      
    element.preventDefault();
    var content = element.currentTarget.nextElementSibling;
    if (content.className === "hide") {
      content.className = "active";
    }
    else {
      content.className = "hide";
    }
  }

  render() {
    debugger;
    let subprocessExist;
    let Gems;
    let SAPWeb;
    let Infra;
    let SalesForce;
    let SAP;
    let Optimum;
    let Insight;
    let Qwiki;
    const currentStatus = this.props.ExitTicketStatus;
    const currentItemId = this.props.thisSubProcessId;
    switch (this.props.IsGemsDiamond) {
        case "Closed":
            Gems = <div><b className="green">GemsDiamond </b></div>;
          break;
          case "Open":
            Gems = <div><b className="orange">GemsDiamond </b></div>;
            break;
        default:
          
         // icon = <div><b className="orange">VHR, </b></div>;
          break;
      }
      switch (this.props.IsSAPWeb) {
        case "Closed":
            SAPWeb = <div><b className="green">SAPWeb </b></div>;
          break;
          case "Open":
            SAPWeb = <div><b className="orange">SAPWeb </b></div>;
            break;
        default:
          
         // icon = <div><b className="orange">VHR, </b></div>;
          break;
      }
      switch (this.props.IsInfra) {
        case "Closed":
            Infra = <div><b className="green">Infra </b></div>;
          break;
          case "Open":
            Infra = <div><b className="orange">Infra </b></div>;
            break;
        default:
          
         // icon = <div><b className="orange">VHR, </b></div>;
          break;
      }
      switch (this.props.IsSalesForce) {
        case "Closed":
            SalesForce = <div><b className="green">SalesForce </b></div>;
          break;
          case "Open":
            SalesForce = <div><b className="orange">SalesForce </b></div>;
            break;
        default:
          
         // icon = <div><b className="orange">VHR, </b></div>;
          break;
      }
      switch (this.props.IsSAP) {
        case "Closed":
            SAP = <div><b className="green">SAP </b></div>;
          break;
          case "Open":
            SAP = <div><b className="orange">SAP </b></div>;
            break;
        default:
          
         // icon = <div><b className="orange">VHR, </b></div>;
          break;
      }
      switch (this.props.IsOptimum) {
        case "Closed":
            Optimum = <div><b className="green">Optimum </b></div>;
          break;
          case "Open":
            Optimum = <div><b className="orange">Optimum </b></div>;
            break;
        default:
          
         // icon = <div><b className="orange">VHR, </b></div>;
          break;
      }

      switch (this.props.IsInsight) {
        case "Closed":
            Insight = <div><b className="green">Insight </b></div>;
          break;
          case "Open":
            Insight = <div><b className="orange">Insight </b></div>;
            break;
        default:
          
         // icon = <div><b className="orange">VHR, </b></div>;
          break;
      }

      switch (this.props.IsQwiki) {
        case "Closed":
            Qwiki = <div><b className="green">Qwiki </b></div>;
          break;
          case "Open":
            Qwiki = <div><b className="orange">Qwiki </b></div>;
            break;
        default:
          
         // icon = <div><b className="orange">VHR, </b></div>;
          break;
      }

      if (currentStatus.includes("Support In Progress") || currentStatus.includes("Closed") ) {
     
      console.log("Render method of EmployeeExitSubProcess");
      subprocessExist = <div><button onClick={this.HandleClick} className="collapsedData btn">

        <i className="fa fa-th-list"></i>
      </button>
        <span id="subprocessDetails" className="hide">
        <div>{Gems}</div>
        <div>{SAPWeb}</div>
        <div>{SalesForce}</div>
        <div>{SAP}</div>
        <div>{Optimum}</div>
        <div>{Insight}</div>
        <div>{Qwiki}</div>
        <div>{Infra}</div>
          </span>
      </div>;
    }
    else {
      subprocessExist = <div> </div>;
    }


    return (
      <div>{subprocessExist}</div>
    )
  }
}

export default EmployeeExitSubProcess