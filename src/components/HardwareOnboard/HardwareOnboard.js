import React, { Component } from 'react';
import { CallRESTAPI } from '../Helpers/Helper';

const { REACT_APP_API_URL } = process.env;

const $ = require('jquery');
$.DataTable = require('datatables.net');

class HardwareOnboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstoOnboardHWLoad: false,
      currentUserEndPointURL: REACT_APP_API_URL + "/currentUser",
      dasboardEndPointURL: REACT_APP_API_URL + "/Lists/getbytitle('DashboardFlowList')/items?$select=OData__x004c_1,OData__x004c_2,OData__x004c_3,OData__x004c_4&$filter=Title eq 'NewUser'",
      tableTitle: "Onboard Hardware",
      data: [],
      headerList: [{
        columnName: "Created",
        className: ""
      },
      {
        columnName: "New Employee",
        className: ""
      },
      {
        columnName: "Cost Details",
        className: "nosort"
      },
      {
        columnName: "Upload Quote",
        className: "nosort"
      },
      {
        columnName: "HW Infra",
        className: "nosort"
      },
      {
        columnName: "Supervisor",
        className: "nosort"
      },
      {
        columnName: "Country Head",
        className: "nosort"
      },
      {
        columnName: "Asset Details",
        className: ""
      },
      {
        columnName: "Purchase Dept",
        className: "nosort"
      },
      ],

    }
  }
  async componentWillMount() {
    this.CollapseTableData = this.CollapseTableData.bind(this);
    this.SetCurrentUserInState();
  }

 //Get current user details: To-do : merge this in the request for requester and skip for Admin code.
 SetCurrentUserInState = () => {
        
  return CallRESTAPI(this.state.currentUserEndPointURL)
      .then(result => {
          
          this.setState({ currentUser: result.d.Id });
         
          return result.d.Id;
      });
};

  
  SetHardwareOnboardData() {
  
    var endPointUrl = REACT_APP_API_URL + "/Lists/getbytitle('NewUser-HWList')/items?" +
      "$select=Created,RFOnBehalfOf,Title,RFCost,Attachment,RFTicketStatus,RFAsset,RFCIO,RFSupervisorName,RFCountryHead" +
      "&$top=10&$orderby=Created desc &$filter=AuthorId eq '"+this.state.currentUser+"'"
    //endPointUrl=REACT_APP_API_URL+"/Lists/getbytitle('New User Request')/items?$top=10&$orderby=Created desc&$filter=AuthorId eq '"+currentUser+"'"

    //Get Data and Set in the 
    return CallRESTAPI(endPointUrl)
      .then(result => {
        this.setState({ data: result.d.results })
        if (!this.state.firstoOnboardHWLoad) {
          $('#hwOnboardTable').DataTable({
            paging: false,
            info: false,
            aaSorting: [[0, 'desc']],
            aoColumnDefs: [
              {
                bSortable: false,
                aTargets: ['nosort']
              }
            ]
          });
          this.setState({ firstoOnboardHWLoad: true })
        }
        return this.state.data
      })
      .then(dataRes => {
        console.log(dataRes)
      });
  }

  CollapseTableData(element) {
    element.preventDefault();
    var content = element.currentTarget.nextElementSibling;
    var childWidth = element.currentTarget.parentElement.parentElement.parentElement.parentElement;
    if (content != null) {
      if (content.className === "card-body hide") {
        content.className = "card-body active";
        element.currentTarget.parentElement.className = "card card-box"
        childWidth.classList.remove("child-width");
        this.SetHardwareOnboardData();
      }
      else {
        content.className = "card-body hide";
        element.currentTarget.parentElement.className = "card"
        childWidth.classList.add("child-width");
      }
    }
  }
  
  ValueExists(value, status) {
    var statusIcon = '';
    if (status === "PD InProgress")
      statusIcon = "fa fa-clock-o orange"
    else
      statusIcon = (value !== null) ? "fa fa-check green" : "";
    return statusIcon;
  }

  AssetExists(value, status) {
    var statusIcon = '';
    if (status === "Closed")
      statusIcon = "fa fa-check green";
    return ((value !== null) || (value === "Yes")) ? "fa fa-check green" : statusIcon;
  }

  AttachmentExists(value, status) {
    //debugger;
   // var statusIcon = '';
    //if(value!== null && (value === "Yes"))
    //{
      //statusIcon = "fa fa-check green";
      //return ((value !== null) || (value === "Yes")) ? "fa fa-check green" : statusIcon;
    //}
     var statusIcon = '';
   if (status === "PD InProgress")
   statusIcon = ""
   else if(status === "In Progress")
   statusIcon ="fa fa-clock-o orange"
   else if(value!== null && (value === "Yes"))
   statusIcon = (value === "Yes") ? "fa fa-check green" : "";
   return statusIcon;
  }

  IndicateStatusForInfra= function (status) {
    var statusColor = '';
    var generalGreen = "fa fa-check green";
   
    if (status === "L3 In Progress")
    {
      statusColor= "fa fa-clock-o orange"
    }
    else if (status === "L3 Rejected")
    {
      statusColor= "fa fa-close red"
    }
    else if (status === "AssetNumber In Progress")
    {
      statusColor= generalGreen;
    }
    else if (status === "AssetNumber Approved")
    {
      statusColor= generalGreen;
    }
    else if (status === "L3 Approved")
    {
      statusColor= generalGreen;
    }
    else if (status === "L2 Approved")
    {
      statusColor= generalGreen;
    }
    else if (status === "L1 Approved")
    {
      statusColor= generalGreen;
    }
    else if (status === "L1 In Progress")
    {
      statusColor= generalGreen;
    }
    else if (status === "L2 In Progress")
    {
      statusColor= generalGreen;
    }
    else if (status === "L1 Rejected")
    {
      statusColor= generalGreen;
    }
    else if (status === "L2 Rejected")
    {
      statusColor= generalGreen;
    }
    else if(status=== "Closed")
    {
      statusColor = generalGreen;
    }
    
    return statusColor;
  }

  IndicateStatusForSupervisor= function (status) {
    var statusColor = '';
    var generalGreen = "fa fa-check green";
    
    if (status === "L2 In Progress" || status === "L3 Approved" )
    {
      statusColor= "fa fa-clock-o orange"
    }
    else if (status === "L2 Rejected")
    {
      statusColor= "fa fa-close red"
    }
    else if(status === "L2 Approved")
    {
      statusColor = generalGreen;
    }
    else if (status === "L1 Approved")
    {
      statusColor= generalGreen;
    }
    else if(status=== "Closed")
    {
      statusColor = generalGreen;
    }
    else if (status === "AssetNumber In Progress")
    {
      statusColor= generalGreen;
    }
    else if (status === "AssetNumber Approved")
    {
      statusColor= generalGreen;
    }
    else if (status === "L1 In Progress")
    {
      statusColor= generalGreen;
    }
    else if (status === "L1 Rejected")
    {
      statusColor= generalGreen;
    }
   
    return statusColor;
  }

  IndicateStatusForCountryHead= function (status) {
    var statusColor = '';
    var generalGreen = "fa fa-check green";
    
     if (status === "L1 In Progress" || status=== "L2 Approved")
    {
      statusColor= "fa fa-clock-o orange"
    }
    else if (status === "L1 Rejected")
    {
      statusColor= "fa fa-close red"
    }
    else if (status === "L1 Approved")
    {
      statusColor= generalGreen;
    }
    else if(status=== "Closed")
    {
      statusColor = generalGreen;
    }
    else if (status === "AssetNumber In Progress")
    {
      statusColor= generalGreen;
    }
    else if (status === "AssetNumber Approved")
    {
      statusColor= generalGreen;
    }
   
    return statusColor;
  }
  
  IndicateStatusForPurchaseDepartment= function (status) {
    var statusColor = '';
    var generalGreen = "fa fa-check green";
    if (status === "AssetNumber Approved")
    {
      statusColor= "fa fa-clock-o orange"
    }
    
    else if(status==="Closed")
   {
    statusColor = generalGreen;
   }
    return statusColor;
  }

  IndicateStatusForAsset= function (value,status) {
    
    var statusIcon = '';
    if(value!== null)
    {
      statusIcon = "fa fa-check green";
      return ((value !== null) ) ? "fa fa-check green" : statusIcon;
    }
    else if(status==="AssetNumber In Progress")
    {
      statusIcon= "fa fa-clock-o orange"
      return statusIcon;
    }
    
     
   
  }


  IndicateStatusForAll = function (key, status) {
   
    var statusColor = '';
    var generalGreen = "fa fa-check green";

    //If Asset Number In Progress or Approved.
    if (["AssetNumber In Progress", "AssetNumber Approved", "Closed"].indexOf(status) > -1)
      statusColor = generalGreen;

    //IT approver
    if (key === "L1") {
      if (status === "In Progress")
        statusColor = this.IndicateStatus(status)
      else if (status.indexOf("L3") > -1)
        statusColor = generalGreen;
      else if (status.indexOf("L2") > -1)
        statusColor = generalGreen;
      else if (status.indexOf("L1") > -1)
        statusColor = generalGreen;
    }
    //Supervisor
    if (key === "L2") {
      
      if (status.indexOf("L3") > -1)
        statusColor = generalGreen;
      else if (status.indexOf("L2") > -1)
        statusColor = this.IndicateStatus(status);
      else if (status.indexOf("L1") > -1)
        statusColor = generalGreen;
    }

    //CH
    if (key === "L3") {
      
      if (status.indexOf("L3") > -1)
        statusColor = this.IndicateStatus(status)
      else if (status.indexOf("L2") > -1)
        statusColor = "";
      else if (status.indexOf("L1") > -1)
        statusColor = generalGreen;
    }

    //PD
    if (key === "PD") {
      if (status === "Closed") {
        if (status.indexOf("L3") > -1)
          statusColor = generalGreen
        else if (status.indexOf("L2") > -1)
          statusColor = generalGreen
        else if (status.indexOf("L1") > -1)
          statusColor = generalGreen;
      }
    }
    return statusColor
  }

  IndicateStatus = function (status) {
    return "fa " + ((status.indexOf("Approve") > -1)
      ? "fa-check green"
      : ((status.indexOf("In Progress") > -1) ? "fa-clock-o orange" : ((status.indexOf("Rejected") > -1) ? "fa-close red" : "")))
  }
  render() {
    return (
      <div className="child-long child-width">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <button className="btn card-header-btn" onClick={this.CollapseTableData}>
                <div className="card-header header-grey card-header-primary">
                  <h4 className="card-title ">{this.state.tableTitle}&nbsp;<span className="arrow"><i className="fa fa-angle-down"></i></span></h4>
                </div>
              </button>
              <div className="card-body hide">
                <div className="table-responsive">
                  <table className="table" id="hwOnboardTable">
                    <thead className=" text-primary-blue">
                      <tr>{this.state.headerList.map((headerColumn, key) =>
                        <th key={key} className={headerColumn.className}>{headerColumn.columnName}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((rowData, key) => (
                        <tr key={key}>
                          <td> {rowData.Created.slice(0, 10)} </td>
                          <td> {rowData.RFOnBehalfOf}</td>
                          <td><i className={this.ValueExists(rowData.RFCost, rowData.RFTicketStatus)}></i><span className="hide">{rowData.RFCost}</span></td>
                          <td> <i className={this.AttachmentExists(rowData.Attachment, rowData.RFTicketStatus)}></i> <span className="hide">{rowData.Attachment}</span></td>
                          <td> <i className={this.IndicateStatusForInfra( rowData.RFTicketStatus)}> </i> </td>
                          <td> <i className={this.IndicateStatusForSupervisor( rowData.RFTicketStatus)} data-toggle="tooltip" data-placement="top" title={rowData.RFSupervisorName}></i><span className="hide">{rowData.RFSupervisorName}</span></td>
                          <td> <i className={this.IndicateStatusForCountryHead( rowData.RFTicketStatus)} data-toggle="tooltip" data-placement="top" title={rowData.RFCountryHead}></i><span className="hide">{rowData.RFCountryHead}</span></td>
                          <td> <i className={this.IndicateStatusForAsset(rowData.RFAsset, rowData.RFTicketStatus)}></i><span className="">{rowData.RFAsset}</span></td>
                          <td> <i className={this.IndicateStatusForPurchaseDepartment( rowData.RFTicketStatus)}></i></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

export default HardwareOnboard;
