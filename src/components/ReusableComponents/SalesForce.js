import React, { Component } from 'react';
import { CallRESTAPI } from '../Helpers/Helper';
const { REACT_APP_API_URL } = process.env;

class SalesForce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SalesForce: '',
    };

  }
  componentDidMount() {
    this.CallList(this.props.thisItemId);
  }

  CallList = (itemId) => {
    var endPointUrl = REACT_APP_API_URL + "/Lists/getbytitle('NewUser-SalesForce')/items" +
      "?$select=RFApprovalStatus, GroupId&$filter=GroupId eq " + itemId;
    CallRESTAPI(endPointUrl).then(response => {
      var thisApprovalStatus = response.d.results.length > 0 ? response.d.results[0].RFApprovalStatus : "";
      this.setState({ SalesForce: thisApprovalStatus });
    });
  }

  render() {
    let icon;
    switch (this.state.SalesForce) {
      case "Closed":
        icon = <div><b className="green">SalesForce, </b></div>;
        break;
      default:
        icon = <div><b className="orange">SalesForce, </b></div>;
        break;

    }
    if (this.props.currentRequestStatus === window.$Status.UserCreationConfirmed) {
      icon = <div><b className="green">SalesForce, </b></div>;
    }
    return (
      <div>{icon}</div>
    )
  }
}

export default SalesForce