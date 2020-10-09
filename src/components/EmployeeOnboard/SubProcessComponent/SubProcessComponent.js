import React, { Component } from 'react';
const { REACT_APP_API_URL } = process.env;
class SubProcessComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: {
        method: 'GET',
        headers: { "Accept": "application/json;odata=verbose" },
        credentials: 'same-origin'    // or credentials: 'include'  
      },
      thisSubProcessId: this.props.thisSubProcessId,
      VHR: '',
      SharedFolderMSOfficeAccess: '',
      SalesForce: ''
    };

  }
  componentDidMount() {
    this.HandleClick = this.HandleClick.bind(this);
    this.SetSubProcessValues(this.props.thisSubProcessId);
    //var itemId=this.props.thisSubProcessId;



  }

  async CallRESTAPI(endPointUrl) {
    //console.log(endPointUrl);
    const response = await fetch(endPointUrl, this.state.payload);
    return response.json();
  }

  SetVHR(endPointUrl) {
    this.CallRESTAPI(endPointUrl).then(response => {
      var VHRValue = response.d.results.length > 0 ? response.d.results[0].RFApprovalStatus : "";
      this.setState({ VHR: VHRValue });
    });
  }

  SetSalesForce(endPointUrl) {
    this.CallRESTAPI(endPointUrl).then(response => {
      var SharedFolderMSOfficeAccessValue = response.d.results.length > 0 ? response.d.results[0].RFApprovalStatus : "";
      this.setState({ SharedFolderMSOfficeAccess: SharedFolderMSOfficeAccessValue });
    });
  }

  SetSharedAccessCard(endPointUrl) {
    this.CallRESTAPI(endPointUrl).then(response => {
      var SalesForceValue = response.d.results.length > 0 ? response.d.results[0].RFApprovalStatus : "";
      this.setState({ SalesForce: SalesForceValue });
    });
  }

  SetSubProcessValues = function (itemId) {
    var endPointUrl = REACT_APP_API_URL+"/Lists/getbytitle('NewUser_VHR')/items" +
      "?$select=RFApprovalStatus, GroupId&$filter=GroupId eq " + itemId;
    this.SetVHR(endPointUrl);
    endPointUrl = REACT_APP_API_URL+"/Lists/getbytitle('NewUser_SharedFolder-MSOffice-Accesscard')/items" +
      "?$select=RFApprovalStatus, GroupId&$filter=GroupId eq " + itemId;
    this.SetSalesForce(endPointUrl);

    endPointUrl = REACT_APP_API_URL+"/Lists/getbytitle('NewUser_VHR')/items" +
      "?$select=RFApprovalStatus, GroupId&$filter=GroupId eq " + itemId;
    this.SetSharedAccessCard(endPointUrl);

  }

  IndicateSubProcessStatus = function (status) {
    return ((["Approve", "Closed"].indexOf(status) > -1) ? "green" : ((status.indexOf("In Progress") > -1)) ? "orange" : ((status.indexOf("Reject") > -1)) ? "red" : "")
  }

  HandleClick = function (element) {
    element.preventDefault();
    var content = element.currentTarget.nextElementSibling;
    content.className = (content.className === "hide") ? "active" : "hide";
  }
  render() {
    return <div>
      <button onClick={this.HandleClick} className="collapsedData btn">
        <i className="fa fa-th-list"></i>
      </button>
      <span id="subprocessDetails" className="hide">
        <b className={this.IndicateSubProcessStatus(this.state.VHR)}>VHR, </b>
        <b className={this.IndicateSubProcessStatus(this.state.SalesForce)}>SalesForce, </b>
        <b className={this.IndicateSubProcessStatus(this.state.SharedFolderMSOfficeAccess)}>SharedFolderMSOfficeAccess </b>
      </span>
    </div>;
  }
}

export default SubProcessComponent;
