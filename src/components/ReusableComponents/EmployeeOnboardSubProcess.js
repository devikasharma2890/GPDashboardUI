import React, { Component } from 'react';
import VHR from "../ReusableComponents/VHR";
import { CallRESTAPI } from '../Helpers/Helper';
import SalesForce from './SalesForce';
import SharedFolderAccess from './SharedFolderAccess';
import Qwiki from './Qwiki';


const { REACT_APP_API_URL } = process.env;
class EmployeeOnboardSubProcess extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      thisSubProcessId: this.props.thisSubProcessId,
      //SharedFolderMSOfficeAccess: '',
      //SalesForce: '',
      IsVHR:this.props.IsVHR,
      IsQwiki:this.props.IsQwiki,
      IsSalesForce: this.props.IsSalesForce,
      IsSharedFolder: this.props.IsSharedFolder
    };

  }

  SetVHR(endPointUrl) {
    
    CallRESTAPI(endPointUrl).then(response => {
      var VHRValue = response.d.results.length > 0 ? response.d.results[0].RFApprovalStatus : "";
      
      this.setState({ VHR: VHRValue });
    });
  }

  SetSalesForce(endPointUrl) {
    
    CallRESTAPI(endPointUrl).then(response => {
      var SharedFolderMSOfficeAccessValue = response.d.results.length > 0 ? response.d.results[0].RFApprovalStatus : "";
      this.setState({ SharedFolderMSOfficeAccess: SharedFolderMSOfficeAccessValue });
    });
  }

  SetSharedAccessCard(endPointUrl) {
   
    CallRESTAPI(endPointUrl).then(response => {
      var SalesForceValue = response.d.results.length > 0 ? response.d.results[0].RFApprovalStatus : "";
      this.setState({ SalesForce: SalesForceValue });
    });
  }

  SetSubProcessValues = function (itemId) {
    var endPointUrl = REACT_APP_API_URL + "/Lists/getbytitle('NewUser_VHR')/items" +
      "?$select=RFApprovalStatus, GroupId&$filter=GroupId eq " + itemId;
    this.SetSharedAccessCard(endPointUrl);

  }

  IndicateSubProcessStatus = function (status) {
    return ((["Approve", "Closed"].indexOf(status) > -1) ? "green" : ((status.indexOf("In Progress") > -1)) ? "orange" : ((status.indexOf("Reject") > -1)) ? "red" : "")
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
    let subprocessExist;
  
    const currentStatus = this.props.status;
    const currentItemId = this.props.thisSubProcessId;
    const currentVHRStatus = this.props.IsVHR;
    const currentQwikiStatus = this.props.IsQwiki;
    const currentSalesForceStatus = this.props.IsSalesForce;
    const currentSharedFolderStatus = this.props.IsSharedFolder;
    


    //if (currentStatus.includes("UserCreation")) {
      if (currentStatus.includes("UserCreation Confirmed") && (currentVHRStatus ||currentQwikiStatus || currentSalesForceStatus ||currentSharedFolderStatus) ) {
     
      console.log("Render method of EmployeeOnBoardSubProcess");
      subprocessExist = <div><button onClick={this.HandleClick} className="collapsedData btn">

        <i className="fa fa-th-list"></i>
      </button>
        <span id="subprocessDetails" className="hide">
          <VHR thisVHRItemId={currentItemId} currentRequestStatus={currentStatus} />
          <Qwiki thisQwikiItemId={currentItemId} currentRequestStatus={currentStatus} />
          <SalesForce thisItemId={currentItemId} currentRequestStatus={currentStatus} />
          <SharedFolderAccess thisItemId={currentItemId} currentRequestStatus={currentStatus} />
        
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

export default EmployeeOnboardSubProcess;
