import React, { Component } from 'react';
import { CallRESTAPI } from '../Helpers/Helper';
const { REACT_APP_API_URL } = process.env;

class SystemAccessEnterpriseApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
        EnterpriseApps: '',
    };

  }
  componentDidMount() {
   
    
    this.CallSystemAccessSoftwareList(this.props.thisSystemAccessEAItemId);
  }

  CallSystemAccessSoftwareList = (itemId) => {
     
    var endPointUrl = REACT_APP_API_URL + "/Lists/getbytitle('SystemAccess-Enterprises Application Access')/items" +
      "?$select=RFTicketStatus, GroupId&$filter=GroupId eq " + itemId;
    
    CallRESTAPI(endPointUrl).then(response => {
     
        console.log(response);
      var SystemAccessEAValue = response.d.results.length > 0 ? response.d.results[0].RFTicketStatus : "";
     
      this.setState({ EnterpriseApps: SystemAccessEAValue });
    });
  }

  render() {
    let icon;
    let currentEAStatus = this.state.EnterpriseApps;
    
    switch (currentEAStatus) {
      case "Closed":
        icon = <div><b className="green">Enterprise Access </b></div>;
        break;
        case "Support In Progress":
          icon = <div><b className="orange">Enterprise Access </b></div>;
          break;
          case "L2 In Progress":
          icon = <div><b className="orange">Enterprise Access </b></div>;
          break;
          case "L2 Rejected":
            icon = <div><b className="red">Enterprise Access </b></div>;
            break;
      default:
        
       // icon = <div><b className="orange">VHR, </b></div>;
        break;
    }
    //if (this.props.currentRequestStatus === window.$Status.UserCreationConfirmed) {
      //debugger;
      //icon = <div><b className="green">VHR, </b></div>;
    //}

    return (
      <div>{icon}</div>
    )
  }
}

export default SystemAccessEnterpriseApplications