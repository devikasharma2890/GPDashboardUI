import React, { Component } from 'react';
import { CallRESTAPI } from '../Helpers/Helper';
const { REACT_APP_API_URL } = process.env;

class SystemAccessSalesForce extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      SalesForce: '',
    };

  }
  componentDidMount() {
    
    this.CallList(this.props.thisSystemAccessSalesForceItemId);
  }

  CallList = (itemId) => {
      
    var endPointUrl = REACT_APP_API_URL + "/Lists/getbytitle('SystemAccess-SalesForce')/items" +
      "?$select=RFTicketStatus, GroupId&$filter=GroupId eq " + itemId;
    CallRESTAPI(endPointUrl).then(response => {
        
        //console.log(response);
       
      var thisApprovalStatus = response.d.results.length > 0 ? response.d.results[0].RFTicketStatus : "";
      this.setState({ SalesForce: thisApprovalStatus });
    });
  }

  render() {
    let icon;
    
    switch (this.state.SalesForce) {
      case "Closed":
        icon = <div><b className="green">SalesForce </b></div>;
        break;
        case "In Progress":
        icon = <div><b className="orange">SalesForce </b></div>;
        break;
        case "L2 Rejected":
          icon = <div><b className="red">SalesForce </b></div>;
          break;
          case "L2 Approved":
            icon = <div><b className="orange">SalesForce </b></div>;
            break;
            case "L1 In Progress":
              icon = <div><b className="orange">SalesForce </b></div>;
              break;
              case "L2 In Progress":
                icon = <div><b className="orange">SalesForce </b></div>;
                break;
                
      default:
      //  icon = <div><b className="orange">SalesForce, </b></div>;
        break;

    }
   // if (this.props.currentRequestStatus === window.$Status.UserCreationConfirmed) {
     // icon = <div><b className="green">SalesForce, </b></div>;
    //}
    return (
      <div>{icon}</div>
    )
  }
}

export default SystemAccessSalesForce