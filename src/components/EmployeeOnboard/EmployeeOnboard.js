import React, { Component } from 'react';
const $ = require('jquery');
$.DataTable = require('datatables.net');

class EmployeeOnboard extends Component {
  constructor(props){
    super(props);
		this.state ={
      payload : {
        method: 'GET',
        headers: { "Accept": "application/json;odata=verbose" },
        credentials: 'same-origin'    // or credentials: 'include'  
      },
      currentUserEndPointURL:"http://localhost:8080/_api/web/currentUser",
      dasboardEndPointURL:"http://localhost:8080/_api/web/Lists/getbytitle('DashboardFlowList')/items?$select=OData__x004c_1,OData__x004c_2,OData__x004c_3,OData__x004c_4&$filter=Title eq 'NewUser'",
			tableTitle:"Employee Onboard",
	    data:[],
      headerList: [{
          columnName: "Created",
          className: ""
        },
        {
          columnName: "New Employee",
          className: ""
        },
      ],
      subProcessList:[]
      }
      }
    componentWillMount(){
      this.CollapseTableData = this.CollapseTableData.bind(this);
      this.HandleClick = this.HandleClick.bind(this);
      this.CallAPIs();
    }
    
    SetLevelState=function(keyValue,columnValue){
      this.state.headerList.push({columnName: columnValue,className:""});
      this.setState({[keyValue]:columnValue});
    }

    CallRESTAPI(endPointUrl)
    {
      //console.log(endPointUrl);
      return fetch(endPointUrl,this.state.payload)
      .then(response=>{return response.json()})
    }

    GetDashboardHeaders(){
     // this.CallRESTAPI(this.state.dasboardEndPointURL)
      //.then(headerResult=>{
      //var level=headerResult.d.results[0];
      // this.SetLevelState("L1",level.OData__x004c_1)
      // this.SetLevelState("L2",level.OData__x004c_2)
      // this.SetLevelState("L3",level.OData__x004c_3)
      // this.SetLevelState("L4",level.OData__x004c_4)
      //Hard-coded headers
      this.SetLevelState("L1","Supervisor")
      this.SetLevelState("L2","Country Head")
      this.SetLevelState("L3","HR")
      this.SetLevelState("L4","Infra")
      this.state.headerList.push({columnName: "Sub Processes",className:"nosort"});
    //});
    }

    SetCurrentUserInState()
    {
      return this.CallRESTAPI(this.state.currentUserEndPointURL)
      .then(result => {
        this.setState({currentUser:result.d.Id});
        return result.d.Id;
			});
    }

    SetSharedFolderMSOfficeAccessStatus(itemId){
      console.log("Set Shared Status for "+itemId);
      var endPointUrl="http://localhost:8080/_api/web/Lists/getbytitle('NewUser_SharedFolder-MSOffice-Accesscard')/items"+
      "?$select=RFApprovalStatus, GroupId&$filter=GroupId eq "+itemId;
      return this.CallRESTAPI(endPointUrl);
    }

    SetVHRStatus(itemId){
      console.log("Set VHR for "+itemId);
      var endPointUrl="http://localhost:8080/_api/web/Lists/getbytitle('NewUser_VHR')/items"+
      "?$select=RFApprovalStatus, GroupId&$filter=GroupId eq "+itemId
      return this.CallRESTAPI(endPointUrl)
    }

    SetSalesForceStatus(itemId){
      console.log("Set SalesForce Status for "+itemId);
      var endPointUrl="http://localhost:8080/_api/web/Lists/getbytitle('NewUser-SalesForce')/items"+
      "?$select=RFApprovalStatus, GroupId&$filter=GroupId eq "+itemId
      return this.CallRESTAPI(endPointUrl)
    }    

    CallAPIs(){
 //Get Dashboard Headers
 this.GetDashboardHeaders();

 //Set Current User in the state
 return this.SetCurrentUserInState()
 .then(currentUser =>{
   var endPointUrl="http://localhost:8080/_api/web/Lists/getbytitle('New User Request')/items?"+
   "$select=Id,Created,Title,RFApprovalStatus,RFSupervisorName0,RFCountryHead,RFRequestorName,RFSAPStatus,RFGemsStatus,RFVirtualHR,RFMicrosoftOffice,SAP,RFSharedFolder"+
   "&$top=10&$orderby=Created desc"
   //endPointUrl="http://localhost:8080/_api/web/Lists/getbytitle('New User Request')/items?$top=10&$orderby=Created desc&$filter=AuthorId eq '"+currentUser+"'"
   
   //Get Data and Set in the 
   return this.CallRESTAPI(endPointUrl)
   .then(result => {
  this.setState({data:result.d.results})
   $('.table').DataTable({ 
     paging:false,
     info:false,
     aaSorting: [[0, 'desc']],
 aoColumnDefs: [
   {
     bSortable: false,
     aTargets: ['nosort']
   }
 ]
     });
 return this.state.data
   })
 .then(dataResponse=>{
  dataResponse.forEach((element)=>{
    var SharedFolderMSOfficeAccessValue='',VHRValue='',SalesForceValue='';  
    var endPointUrl="http://localhost:8080/_api/web/Lists/getbytitle('NewUser_SharedFolder-MSOffice-Accesscard')/items"+
    "?$select=RFApprovalStatus, GroupId&$filter=GroupId eq "+element.Id;
     this.CallRESTAPI(endPointUrl).then(response=>{
     if(response.d.results.length>0){
       element["SharedFolderMSOfficeAccess"]=response.d.results[0].RFApprovalStatus;
       SharedFolderMSOfficeAccessValue=response.d.results[0].RFApprovalStatus;
       Object(this.state.subProcessList).forEach((ele)=>{
        if(ele["Id"]===element.Id)
        ele["SharedFolderMSOfficeAccess"]=SharedFolderMSOfficeAccessValue;
      });
     }
   });

    endPointUrl="http://localhost:8080/_api/web/Lists/getbytitle('NewUser_VHR')/items"+
   "?$select=RFApprovalStatus, GroupId&$filter=GroupId eq "+element.Id;
    this.CallRESTAPI(endPointUrl).then(response=>{
       if(response.d.results.length>0){
         element["VHR"]=response.d.results[0].RFApprovalStatus;
         VHRValue=response.d.results[0].RFApprovalStatus;
         Object(this.state.subProcessList).forEach((ele)=>{
          if(ele["Id"]===element.Id)
          ele["VHR"]=VHRValue;
        });
       }
     });

      endPointUrl="http://localhost:8080/_api/web/Lists/getbytitle('NewUser-SalesForce')/items"+
     "?$select=RFApprovalStatus, GroupId&$filter=GroupId eq "+element.Id
      this.CallRESTAPI(endPointUrl).then(response=>{
     if(response.d.results.length>0){
       element["SalesForce"]=response.d.results[0].RFApprovalStatus;
       SalesForceValue=response.d.results[0].RFApprovalStatus;
       Object(this.state.subProcessList).forEach((ele)=>{
         if(ele["Id"]===element.Id)
         ele["SalesForce"]=SalesForceValue;
       });
     }
   });
   this.state.subProcessList.push(
    {
      Id:element.Id,
      SharedFolderMSOfficeAccess:SharedFolderMSOfficeAccessValue,
      VHR: VHRValue,
      SalesForce:SalesForceValue,
      RFApprovalStatus:element.RFApprovalStatus,
      RFSAPStatus:element.RFSAPStatus,
    });
 });
 return this.state
 }).then(dataRes=>{
   console.log(dataRes)
 });
 
});
    }

	  IndicateStatus=function(status) {
			  return "fa "+ ((status.indexOf("Approved")>-1)
			  ?"fa-check green"
			  :((status.indexOf("In Progress")>-1)?"fa-clock-o orange":((status.indexOf("Rejected")>-1)?"fa-close red":"")))
    }
    
    IndicateStatusForAll=function(key,status) {
      var statusColor='';
      var generalGreen="fa fa-check green";
      
      //If User Creation In Progress or Confirmed
      if(status==="UserCreation In Progress"|| status==="UserCreation Confirmed")
         statusColor=generalGreen;

      //SP
      if(key==="L1"){
      if(status==="In Progress")
      statusColor=this.IndicateStatus(status)
      else if(status.indexOf("L4")>-1)
      statusColor=this.IndicateStatus(status)
      else if(status.indexOf("L3")>-1)
      statusColor=generalGreen;
      else if(status.indexOf("L2")>-1)
      statusColor=generalGreen;
      else if(status.indexOf("L1")>-1)
      statusColor=generalGreen;  
    }
      //CH
      if(key==="L2")
      {
        if(status.indexOf("L4")>-1)
        statusColor=""
        else if(status.indexOf("L3")>-1)
        statusColor=generalGreen;
        else if(status.indexOf("L2")>-1)
        statusColor=this.IndicateStatus(status);
        else if(status.indexOf("L1")>-1)
        statusColor=generalGreen;
      }

      //HR
      if(key==="L3")
      {
        if(status.indexOf("L4")>-1)
        statusColor=""
        else if(status.indexOf("L3")>-1)
        statusColor=this.IndicateStatus(status)
        else if(status.indexOf("L2")>-1)
        statusColor="";
        else if(status.indexOf("L1")>-1)
        statusColor=generalGreen;
      }

       //IF
       if(key==="L4")
       {
         if(status.indexOf("L4")>-1)
         statusColor=this.IndicateStatus(status)
         else if(status.indexOf("L3")>-1)
         statusColor=""
         else if(status.indexOf("L2")>-1)
         statusColor=""
         else if(status.indexOf("L1")>-1)
         statusColor=generalGreen
       }
		  return statusColor
  }

    LabelStatusForAll=function(key,status){
      var formattedLabelHTML=[];
      var statusIndicator=this.IndicateStatusForAll(key,status)
      if(statusIndicator.indexOf("green")>-1)
      formattedLabelHTML.push(<span key='green' className="hide">Approved</span>)
      if(statusIndicator.indexOf("orange")>-1)
      formattedLabelHTML.push(<span key='orange' className="hide">In Progress</span>)
      if(statusIndicator.indexOf("red")>-1)
      formattedLabelHTML.push(<span key='red' className="hide">Rejected</span>)
      return formattedLabelHTML;
    }

    HandleClick=function(element){
      element.preventDefault();
      var content = element.currentTarget.nextElementSibling;
					content.className = (content.className === "hide") ? "active" : "hide";
    }
   

  FormatSubProcessForAll = function(rowData){

    var formattedHTML=[];
    var subformattedHTML=[];
    if(rowData.RFApprovalStatus==="UserCreation In Progress"|| rowData.RFApprovalStatus==="UserCreation Confirmed")
    {
      formattedHTML.push(<button key='link' onClick={this.HandleClick} className="collapsedData btn"><i className="fa fa-th-list"></i></button>)
      if(rowData.SalesForce)
      subformattedHTML.push(<b key='1' className={this.IndicateSubProcessStatus(rowData.SalesForce)}>SalesForce, </b>)
      if(rowData.RFSAPStatus)
      subformattedHTML.push(<b key='4' className={this.IndicateSubProcessStatus(rowData.RFSAPStatus)}>SAP, </b>)
      if(rowData.VHR){
      subformattedHTML.push(<b key='2' className={this.IndicateSubProcessStatus(rowData.VHR)}>VHR, </b>)
      }
      if(rowData.SharedFolderMSOfficeAccess)
      subformattedHTML.push(<b key='3' className={this.IndicateSubProcessStatus(rowData.SharedFolderMSOfficeAccess)}>SharedFolderMSOfficeAccess </b>)
      formattedHTML.push(<span key='grouped' id="subprocessDetails" className="hide">{subformattedHTML}</span>)
    }
    return formattedHTML;
	  }

	  IndicateSubProcessStatus=function(status){
      if(status===undefined)
      return "";
      else 
    return ((status.indexOf("Approve")>-1)?"green":((status.indexOf("In Progress")>-1))?"orange":((status.indexOf("Reject")>-1))?"red":"")
    }
    
    CollapseTableData(element){
      element.preventDefault();
        var content = element.currentTarget.nextElementSibling;
				if(content!=null){
				if(content.className === "card-body hide")
				{
					content.className =	"card-body active";
					element.currentTarget.parentElement.className = "card card-box"
				}
				else{
					content.className =	"card-body hide";
					element.currentTarget.parentElement.className = "card"
				}
			}
      }
  render() {
    return (
      <div className="child">
			<div className="row">
				<div className="col-md-12">
					<div className="card">
          <button className="btn card-header-btn" onClick={this.CollapseTableData}>
						<div className="card-header header-grey card-header-primary">
							<h4 className="card-title ">{this.state.tableTitle}<span className="arrow"><i className="fa fa-angle-down"></i></span></h4> 
							</div>
              </button>
						<div className="card-body hide">
							<div className="table-responsive">
								<table className="table">
									<thead className=" text-primary-blue">
                  <tr>{this.state.headerList.map((headerColumn,key) =>
                     <th key={key} className={headerColumn.className}>{headerColumn.columnName}</th>)}
									</tr></thead>
									<tbody>
                    	{this.state.data.map((rowData,key) => (
										<tr key={key}>
										  <td> {rowData.Created.slice(0,10)} </td>
                      <td> {rowData.Title} {rowData.RFApprovalStatus}</td>
                      <td> <i className={this.IndicateStatusForAll("L1",rowData.RFApprovalStatus)} data-toggle="tooltip" data-placement="top" title={rowData.RFSupervisorName0}></i> {this.LabelStatusForAll("L1",rowData.RFApprovalStatus)}</td>
                      <td> <i className={this.IndicateStatusForAll("L2",rowData.RFApprovalStatus)} data-toggle="tooltip" data-placement="top" title={rowData.RFCountryHead}></i> {this.LabelStatusForAll("L2",rowData.RFApprovalStatus)}</td>
                      <td> <i className={this.IndicateStatusForAll("L3",rowData.RFApprovalStatus)}></i>{this.LabelStatusForAll("L3",rowData.RFApprovalStatus)} </td>
                      <td> <i className={this.IndicateStatusForAll("L4",rowData.RFApprovalStatus)}></i>{this.LabelStatusForAll("L4",rowData.RFApprovalStatus)} </td>
                      <td className="subprocess">
                         {this.FormatSubProcessForAll(rowData)}</td>
                      </tr>
                    					))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    );
  }
}

export default EmployeeOnboard;