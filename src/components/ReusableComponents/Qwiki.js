import React, { Component } from 'react';
import { CallRESTAPI } from '../Helpers/Helper';
const { REACT_APP_API_URL } = process.env;

class Qwiki extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Qwiki: '',
    };

  }
  componentDidMount() {
   
    this.CallQwikiList(this.props.thisQwikiItemId);
  }

  CallQwikiList = (itemId) => {
    var endPointUrl = REACT_APP_API_URL + "/Lists/getbytitle('NewUser_Qwiki')/items" +
      "?$select=RFApprovalStatus, GroupId&$filter=GroupId eq " + itemId;
     
    CallRESTAPI(endPointUrl).then(response => {
    
      var QwikiValue = response.d.results.length > 0 ? response.d.results[0].RFApprovalStatus : "";
      this.setState({ Qwiki: QwikiValue });
    });
  }

  render() {
    let icon;
    let currentQwikiStatus = this.state.Qwiki;
   
    switch (currentQwikiStatus) {
      case "Closed":
        icon = <div><b className="green">Qwiki </b></div>;
        break;
        case "In Progress":
          icon = <div><b className="orange">Qwiki </b></div>;
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

export default Qwiki