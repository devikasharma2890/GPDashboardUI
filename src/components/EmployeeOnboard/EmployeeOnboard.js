import React, { Component } from 'react';
const $ = require('jquery');
$.DataTable = require('datatables.net');

class EmployeeOnboard extends Component {
  constructor(props){
    super(props);
		this.state ={
      currentUser:'',
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
        {
          columnName: "Supervisor",
          className:""
        },
        {
          columnName: "Country Head",
          className: ""
        },
        {
          columnName: "HR",
          className: ""
        },
        {
          columnName: "Infra",
          className: ""
        },
        {
          columnName: "Sub Process",
          className: "nosort"
        },
      ]
      }
      }
    componentDidMount(){ 
      var payload = {
        method: 'GET',
        headers: { "Accept": "application/json; odata=verbose" },
        credentials: 'same-origin'    // or credentials: 'include'  
    }
      console.log("Component Mounted");
      var endPointUrl="http://localhost:8080/_api/web/currentUser"
      console.log(endPointUrl);
      fetch(endPointUrl,payload)
			.then(response => {
				return response.json();
			}).then(result => {
        console.log(result);
      this.setState({currentUser:result.d.Id})
      return result.d.Id;
			}).then(currentUser =>{
        endPointUrl="http://localhost:8080/_api/web/Lists/getbytitle('New User Request')/items?$top=10&$orderby=Created desc"
        //endPointUrl="http://localhost:8080/_api/web/Lists/getbytitle('New User Request')/items?$top=10&$orderby=Created desc&$filter=AuthorId eq '"+currentUser+"'"
        console.log(endPointUrl)
        fetch(endPointUrl,payload)
			.then(response => {
				return response.json();
			}).then(result => {
        this.setState({data:result.d.results})
        console.log(this.state.data)
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
      //SP
      if(key==="SP"){
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
      else if(status==="UserCreation In Progress")
         statusColor=generalGreen;
    }
      //CH
      if(key==="CH")
      {
        if(status.indexOf("L4")>-1)
        statusColor=""
        else if(status.indexOf("L3")>-1)
        statusColor=this.IndicateStatus(status)
        else if(status.indexOf("L2")>-1)
        statusColor=generalGreen;
        else if(status.indexOf("L1")>-1)
        statusColor=generalGreen;
        else if(status==="UserCreation In Progress")
         statusColor=generalGreen;
      }

      //HR
      if(key==="HR")
      {
        if(status.indexOf("L4")>-1)
        statusColor=""
        else if(status.indexOf("L3")>-1)
        statusColor=""
        else if(status.indexOf("L2")>-1)
        statusColor=this.IndicateStatus(status)
        else if(status.indexOf("L1")>-1)
        statusColor=generalGreen;
        else if(status==="UserCreation In Progress")
         statusColor=generalGreen;
      }

       //IF
       if(key==="IF")
       {
         if(status.indexOf("L4")>-1)
         statusColor=""
         else if(status.indexOf("L3")>-1)
         statusColor=""
         else if(status.indexOf("L2")>-1)
         statusColor=""
         else if(status.indexOf("L1")>-1)
         statusColor=this.IndicateStatus(status)
         else if(status==="UserCreation In Progress")
         statusColor=generalGreen;
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

    HandleClick=function(e,Id){
      Id.preventDefault();
      var content = Id.currentTarget.nextElementSibling;
					content.className = (content.className === "hide") ? "active" : "hide";
    }
   

  FormatSubProcessForAll = function(rowData){

    var formattedHTML=[];
    var subformattedHTML=[];
   
    if(rowData.RFApprovalStatus==="UserCreation In Progress")
    {
      formattedHTML.push(<button key='link' onClick={this.HandleClick.bind(this,rowData.Id)} className="collapsedData btn"><i className="fa fa-th-list"></i></button>)
      if(rowData.RFSAPStatus!=='')
      subformattedHTML.push(<b key='1' className={this.IndicateSubProcessStatus(rowData.RFSAPStatus)}>SAP, </b>)
      if(rowData.RFGemsStatus!=='')
      subformattedHTML.push(<b key='2' className={this.IndicateSubProcessStatus(rowData.RFGemsStatus)}>Gems, </b>)
      formattedHTML.push(<span key='grouped' id="subprocessDetails" className="hide">{subformattedHTML}</span>)
    }
   
    return formattedHTML;
	  }

	  IndicateSubProcessStatus=function(status){
		  return ((status.indexOf("Approve")>-1)?"green":((status.indexOf("In Progress")>-1))?"orange":((status.indexOf("Reject")>-1))?"red":"")
	  }
  render() {
    return (
      <div className="child">
			<div className="row">
				<div className="col-md-12">
					<div className="card">
						<div className="card-header header-blue card-header-primary">
							<h4 className="card-title ">{this.state.tableTitle}</h4> 
							</div>
						<div className="card-body">
							<div className="table-responsive">
								<table className="table" ref="main" >
									<thead className=" text-primary-blue">
                  <tr>{this.state.headerList.map((headerColumn,key) =>
                     <th key={key} className={headerColumn.className}>{headerColumn.columnName}</th>)}
									</tr></thead>
									<tbody>
                    	{this.state.data.map((rowData,key) => (
										<tr key={key}>
										  <td> {rowData.Created.slice(0,10)} </td>
                      <td> {rowData.Title}</td>
                      <td> <i className={this.IndicateStatusForAll("SP",rowData.RFApprovalStatus)} data-toggle="tooltip" data-placement="top" title={rowData.RFSupervisorName0}></i> {this.LabelStatusForAll("SP",rowData.RFApprovalStatus)}</td>
                      <td> <i className={this.IndicateStatusForAll("CH",rowData.RFApprovalStatus)} data-toggle="tooltip" data-placement="top" title={rowData.RFCountryHead}></i> {this.LabelStatusForAll("CH",rowData.RFApprovalStatus)}</td>
                      <td> <i className={this.IndicateStatusForAll("HR",rowData.RFApprovalStatus)}></i>{this.LabelStatusForAll("HR",rowData.RFApprovalStatus)} </td>
                      <td> <i className={this.IndicateStatusForAll("IF",rowData.RFApprovalStatus)}></i>{this.LabelStatusForAll("IF",rowData.RFApprovalStatus)} </td>
                      <td className="subprocess">
                         {this.FormatSubProcessForAll(rowData)}</td>
                      </tr>
                    					))}
									</tbody>
								</table>
							</div>
						</div>
						<div className="card-footer"></div>
					</div>
				</div>
			</div>
		</div>
    );
  }
}

export default EmployeeOnboard;
