import React, { Component } from 'react';
import { CallRESTAPI } from '../Helpers/Helper';
const { REACT_APP_API_URL } = process.env;

class SystemAccessIT extends Component {
  constructor(props) {
    super(props);
    this.state = {
        IT: '',
    };

  }
  componentDidMount() {
   
    
    this.CallSystemAccessSoftwareList(this.props.thisSystemAccessITItemId);
  }

  CallSystemAccessSoftwareList = (itemId) => {
    var endPointUrl = REACT_APP_API_URL + "/Lists/getbytitle('SystemAccess-Software')/items" +
      "?$select=RFTicketStatus, GroupId&$filter=GroupId eq " + itemId;
    
    CallRESTAPI(endPointUrl).then(response => {
     
      var SystemAccessITValue = response.d.results.length > 0 ? response.d.results[0].RFTicketStatus : "";
     
      this.setState({ IT: SystemAccessITValue });
    });
  }

  render() {
    let icon;
    let currentITStatus = this.state.IT;
    
    switch (currentITStatus) {
      case "Closed":
        icon = <div><b className="green">IT </b></div>;
        break;
        case "In Progress":
          icon = <div><b className="orange">IT </b></div>;
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

export default SystemAccessIT