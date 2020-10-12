import React, { Component } from 'react';
import { CallRESTAPI } from '../Helpers/Helper';
const { REACT_APP_API_URL } = process.env;

class VHR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VHR: '',
    };

  }
  componentDidMount() {
    this.CallVHRList(this.props.thisVHRItemId);
  }

  CallVHRList = (itemId) => {
    var endPointUrl = REACT_APP_API_URL + "/Lists/getbytitle('NewUser_VHR')/items" +
      "?$select=RFApprovalStatus, GroupId&$filter=GroupId eq " + itemId;
    CallRESTAPI(endPointUrl).then(response => {
      var VHRValue = response.d.results.length > 0 ? response.d.results[0].RFApprovalStatus : "";
      this.setState({ VHR: VHRValue });
    });
  }

  render() {
    let icon;
    let currentVHRStatus = this.state.VHR;
    switch (currentVHRStatus) {
      case "Closed":
        icon = <div><b className="green">VHR, </b></div>;
        break;
      default:
        icon = <div><b className="orange">VHR, </b></div>;
        break;
    }
    if (this.props.currentRequestStatus === "UserCreation Confirmed") {
      icon = <div><b className="green">VHR, </b></div>;
    }

    return (
      <div>{icon}</div>
    )
  }
}

export default VHR