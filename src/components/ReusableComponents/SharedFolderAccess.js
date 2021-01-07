import React, { Component } from 'react';
import { CallRESTAPI } from '../Helpers/Helper';
const { REACT_APP_API_URL } = process.env;

class SharedFolderAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SharedFolderAccess: '',
    };

  }
  componentDidMount() {
    this.CallList(this.props.thisItemId);
  }

  CallList = (itemId) => {
    var endPointUrl = REACT_APP_API_URL + "/Lists/getbytitle('NewUser_SharedFolder-MSOffice-Accesscard')/items" +
      "?$select=RFApprovalStatus, GroupId&$filter=GroupId eq " + itemId;
    CallRESTAPI(endPointUrl).then(response => {
      var thisApprovalStatus = response.d.results.length > 0 ? response.d.results[0].RFApprovalStatus : "";
      this.setState({ SharedFolderAccess: thisApprovalStatus });
    });
  }

  render() {
    let icon;
    switch (this.state.SharedFolderAccess) {
      case "Closed":
        icon = <div><b className="green">IT </b></div>;
        break;
        case "In Progress":
        icon = <div><b className="orange">IT </b></div>;
        break;
      default:
      //  icon = <div><b className="orange">SharedFolderAccess </b></div>;
        break;

    }
    //if (this.props.currentRequestStatus === window.$Status.UserCreationConfirmed) {
      //icon = <div><b className="green">SharedFolderAccess </b></div>;
    //}
    return (
      <div>{icon}</div>
    )
  }
}

export default SharedFolderAccess