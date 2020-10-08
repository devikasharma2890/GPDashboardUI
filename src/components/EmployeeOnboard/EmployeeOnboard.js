import React, { Component } from 'react';
import SubProcessComponent from './SubProcessComponent/SubProcessComponent';
const $ = require('jquery');
$.DataTable = require('datatables.net');

class EmployeeOnboard extends Component {
  constructor(props){
    super(props);
		this.state ={
      flagFirstEmployeeOnboardLoad:false,
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
        //Get Dashboard Headers
        this.GetDashboardHeaders();
      

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

   
    CallAPIs(){
 

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
  if(!this.state.flagFirstEmployeeOnboardLoad)
{
  $('#empOnboardTable').DataTable({ 
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
    this.setState({flagFirstEmployeeOnboardLoad:true})
}
 return this.state.data
   })
  .then(dataRes=>{
   console.log(dataRes)
 });
 
});

    }

	  IndicateStatus=function(status) {
			  return "fa "+ ((status.indexOf("Approve")>-1)
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
    
    CollapseTableData(element){
      element.preventDefault();
        var content = element.currentTarget.nextElementSibling;
        var childWidth=element.currentTarget.parentElement.parentElement.parentElement.parentElement;
				if(content!=null){
				if(content.className === "card-body hide")
				{
					content.className =	"card-body active";
          element.currentTarget.parentElement.className = "card card-box"
          childWidth.classList.remove("child-width");
          this.CallAPIs();
				}
				else{
					content.className =	"card-body hide";
          element.currentTarget.parentElement.className = "card"
          childWidth.classList.add("child-width");
				}
      }
      }
    ShowSubProcess(rowData)
    {
        if(["UserCreation In Progress","UserCreation Confirmed"].indexOf(rowData.RFApprovalStatus)>-1)
        return <SubProcessComponent thisSubProcessId={rowData.Id}/>;
        else
        return "";
    }
  render() {
    return (
      <div className="child child-width">
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
								<table className="table" id="empOnboardTable">
									<thead className=" text-primary-blue">
                  <tr>{this.state.headerList.map((headerColumn,key) =>
                     <th key={key} className={headerColumn.className}>{headerColumn.columnName}</th>)}
									</tr></thead>
									<tbody>
                    	{this.state.data.map((rowData,key) => (
										<tr key={key}>
										  <td> {rowData.Created.slice(0,10)} </td>
                      <td> {rowData.Title}</td>
                      <td> <i className={this.IndicateStatusForAll("L1",rowData.RFApprovalStatus)} data-toggle="tooltip" data-placement="top" title={rowData.RFSupervisorName0}></i> {this.LabelStatusForAll("L1",rowData.RFApprovalStatus)}</td>
                      <td> <i className={this.IndicateStatusForAll("L2",rowData.RFApprovalStatus)} data-toggle="tooltip" data-placement="top" title={rowData.RFCountryHead}></i> {this.LabelStatusForAll("L2",rowData.RFApprovalStatus)}</td>
                      <td> <i className={this.IndicateStatusForAll("L3",rowData.RFApprovalStatus)}></i>{this.LabelStatusForAll("L3",rowData.RFApprovalStatus)} </td>
                      <td> <i className={this.IndicateStatusForAll("L4",rowData.RFApprovalStatus)}></i>{this.LabelStatusForAll("L4",rowData.RFApprovalStatus)} </td>
                      <td className="subprocess">
                         {this.ShowSubProcess(rowData)}
                         </td>
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