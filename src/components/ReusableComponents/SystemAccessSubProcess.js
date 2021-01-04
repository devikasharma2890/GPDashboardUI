import React, { Component } from 'react';

import { CallRESTAPI } from '../Helpers/Helper';

import SystemAccessIT from './SystemAccessIT';
import SystemAccessSalesForce from './SystemAccessSalesForce';
import SystemAccessEnterpriseApplications from './SystemAccessEnterpriseApplications';

const { REACT_APP_API_URL } = process.env;
class SystemAccessSubProcess extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      thisSubProcessId: this.props.thisSubProcessId,
      IsFileZilla: this.props.IsFileZilla,
      IsVisio: this.props.IsVisio,
      IsOffice: this.props.IsOffice,
      IsSharedFolder: this.props.IsSharedFolder,
      IsMSProject: this.props.IsMSProject,
     
      IsSalesForce: this.props.IsSalesForce,
      IsSAP: this.props.IsSAP,
      IsOptimum: this.props.IsOptimum,
      IsInsight: this.props.IsInsight,
      IsBPC: this.props.IsBPC,
      IsEDI: this.props.IsEDI,
      IsGEMS: this.props.IsGEMS,
      IsDiamond: this.props.IsDiamond,
      IsSAPWeb: this.props.IsSAPWeb,
      IsSAPAdhoc: this.props.IsSAPAdhoc
      //SharedFolderMSOfficeAccess: '',
      //SalesForce: '',
     // IsVHR:this.props.IsVHR,
     // IsQwiki:this.props.IsQwiki,
     // IsSalesForce: this.props.IsSalesForce,
     // IsSharedFolder: this.props.IsSharedFolder
    };

  }

  

  SetSalesForce(endPointUrl) {
    
    CallRESTAPI(endPointUrl).then(response => {
      var SharedFolderMSOfficeAccessValue = response.d.results.length > 0 ? response.d.results[0].RFApprovalStatus : "";
      this.setState({ SharedFolderMSOfficeAccess: SharedFolderMSOfficeAccessValue });
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
    var IsSoftwareSelected ;
    var IsSalesForceSelected;
    var IsEnterpriseAppsSelected;
   if(this.props.IsFileZilla || this.props.IsMSProject || this.props.IsOffice || this.props.IsVisio || this.props.IsSharedFolder )
   {
   
        IsSoftwareSelected= true;
   }
   if(this.props.IsSalesForce)
   {
     IsSalesForceSelected= true; 
   }
   if(this.props.IsSAP || this.props.IsOptimum || this.props.IsInsight!= null || this.props.IsBPC || this.props.IsEDI || this.props.IsGEMS || this.props.IsDiamond || this.props.IsSAPWeb || this.props.IsSAPAdhoc != null      )
   {
     IsEnterpriseAppsSelected= true; 
   }

    //if (currentStatus.includes("UserCreation")) {
      if (currentStatus.includes("L1 Approved") && (IsSoftwareSelected || IsSalesForceSelected || IsEnterpriseAppsSelected ) ) {
     
      console.log("Render method of EmployeeOnBoardSubProcess");
      subprocessExist = <div><button onClick={this.HandleClick} className="collapsedData btn">

        <i className="fa fa-th-list"></i>
      </button>
        <span id="subprocessDetails" className="hide">
          <SystemAccessIT thisSystemAccessITItemId={currentItemId} currentRequestStatus={currentStatus} />
          <SystemAccessSalesForce thisSystemAccessSalesForceItemId={currentItemId} currentRequestStatus={currentStatus} />
          <SystemAccessEnterpriseApplications thisSystemAccessEAItemId={currentItemId} currentRequestStatus={currentStatus} />
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

export default SystemAccessSubProcess;
