import React, { Component } from 'react';
import Supervisor from '../ReusableComponents/Supervisor';
import CountryHead from '../ReusableComponents/CountryHead';
import HR from '../ReusableComponents/HR';
import Infra from '../ReusableComponents/Infra';
import EmployeeOnboardSubProcess from '../ReusableComponents/EmployeeOnboardSubProcess';
import { CallRESTAPI } from '../Helpers/Helper';
import SystemAccessSubProcess from '../ReusableComponents/SystemAccessSubProcess';


const { REACT_APP_API_URL } = process.env;
//Jquery 3.4 is used only for Data table plugin that is being used in each component.
const $ = require('jquery');
$.DataTable = require('datatables.net');


class SystemAccessComp extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            flagFirstSystemAccessLoad: false,
            currentUserEndPointURL: REACT_APP_API_URL + "/currentUser",
            dasboardEndPointURL: REACT_APP_API_URL + "/Lists/getbytitle('DashboardFlowList')/items?$select=OData__x004c_1,OData__x004c_2,OData__x004c_3,OData__x004c_4&$filter=Title eq 'NewUser'",
            tableTitle: "Enterprise Application",
            data: [],
            headerList: [{
                columnName: "Created Date",
                className: ""
            },
            {
              columnName: "Id",
              className: ""
          },
            {
                columnName: "On Behalf Of",
                className: ""
            },
            
            ],
            subProcessList: []
        }
    }

    //when the componen will load
    componentWillMount() {
       
        //Get Dashboard Headers
        this.GetDashboardHeaders();
        //Get Current User Info
        this.SetCurrentUserInState();
    }

    //To set the header
    SetLevelState = (keyValue, columnValue) => {
        this.state.headerList.push({ columnName: columnValue, className: "" });
        this.setState({ [keyValue]: columnValue });
    };

    GetDashboardHeaders = () => {
        //Hard-coded headers
        this.SetLevelState("L2", "Supervisor")
        this.SetLevelState("L1", "Country Head")
      //  this.SetLevelState("L3", "HR")
        //this.SetLevelState("L4", "Infra")
        this.state.headerList.push({ columnName: "Sub Processes", className: "nosort" });
    };

    //Get current user details: To-do : merge this in the request for requester and skip for Admin code.
    SetCurrentUserInState = () => {
        
        return CallRESTAPI(this.state.currentUserEndPointURL)
            .then(result => {
                
                this.setState({ currentUser: result.d.Id });
                return result.d.Id;
            });
    };


    

    //To set the data in state and one time initialization for Data table
    SetData(endPointUrl) {
       
        CallRESTAPI(endPointUrl).then(response => {
            this.setState({ data: response.d.results })
            if (!this.state.flagFirstSystemAccessLoad) {
                $('#systemAccessTable').DataTable({
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
                this.setState({ flagFirstSystemAccessLoad: true })
            }
        });
    }

    //Initial call for this component
    CallAPIs = () => {
 
        var endPointUrl = REACT_APP_API_URL + "/Lists/getbytitle('SystemAccess Request')/items?" +
        "$select=Id,GroupId,Created,RFOnBehalfOf,RFTicketStatus,RFSupervisorName,RFCountryHead,RFFilezilla,RFmsvisio,RFMsProject,RFMicrosoftOffice,RFSharedFolder,RFOthers0,RFSalesForce,RFSAP,RFOptimum,RFInsightChoice,RFBPC,RFEDI,RFEDI,RFDiamond,RFSAPWeb,RFSAPAdhoc" +
        "&$orderby=Created desc&$top=10&$filter=AuthorId eq '"+this.state.currentUser+"'"


        //var endPointUrl = REACT_APP_API_URL + "/Lists/getbytitle('"+ window.$ListNames.EmployeeOnboard + "')/items?" +
          //  "$select=Id,Created,Title,RFApprovalStatus,RFSupervisorName0,RFCountryHead,RFRequestorName,RFSAPStatus,RFGemsStatus,RFVirtualHR,RFMicrosoftOffice,SAP,RFSharedFolder,RF_Qwiki" +
            //"&$orderby=Created desc&$top=10" 
            //"&$filter=AuthorId eq '"+this.state.currentUser+"'"
          
         
     // var endPointUrl="REACT_APP_API_URL/Lists/getbytitle('New User Request')/items?$top=10&$orderby=Created desc&$filter=AuthorId eq '"+this.state.currentUser+"'"
    this.SetData(endPointUrl);
    }

    //Event method to expand and collapse the collapsible
    CollapseTableData = (element) => {
        element.preventDefault();
        var content = element.currentTarget.nextElementSibling;
        var childWidth = element.currentTarget.parentElement.parentElement.parentElement.parentElement;
        if (content != null) {
            if (content.className === "card-body hide") {
                content.className = "card-body active";
                element.currentTarget.parentElement.className = "card card-box"
                childWidth.classList.remove("child-width");
                this.CallAPIs();
            }
            else {
                content.className = "card-body hide";
                element.currentTarget.parentElement.className = "card"
                childWidth.classList.add("child-width");
            }
        }
    };


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

    render() {
        var subprocess;
        
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
                                            <tr>{this.state.headerList.map((headerColumn, key) =>
                                                <th key={key} className={headerColumn.className}>{headerColumn.columnName}</th>)}
                                            </tr></thead>
                                        <tbody>
                                            
                                            {this.state.data.map((rowData, key) => (
                                            
                                                <tr key={key}>
                                                    <td> {rowData.Created.slice(0, 10)} </td>
                                                    <td> {rowData.Id}</td>
                                                    <td> {rowData.RFOnBehalfOf}</td>
                                                    <td> <i className={this.IndicateStatusForSupervisor( rowData.RFTicketStatus)} data-toggle="tooltip" data-placement="top" title={rowData.RFSupervisorName}></i><span className="hide">{rowData.RFSupervisorName}</span></td>
                                                    <td> <i className={this.IndicateStatusForCountryHead( rowData.RFTicketStatus)} data-toggle="tooltip" data-placement="top" title={rowData.RFCountryHead}></i><span className="hide">{rowData.RFCountryHead}</span></td>
                           
                                                    <td className="subprocess">
                                                      
                                                      <SystemAccessSubProcess thisSubProcessId={rowData.Id} status={rowData.RFTicketStatus} IsFileZilla={rowData.RFFilezilla} IsVisio={rowData.RFmsvisio} IsOffice={rowData.RFMicrosoftOffice} IsSharedFolder={rowData.RFSharedFolder} IsMSProject ={rowData.RFMsProject}  IsSalesForce={rowData.RFSalesForce} IsSAP={rowData.RFSAP} IsOptimum={rowData.RFOptimum} IsInsight={rowData.RFInsightChoice} IsBPC={rowData.RFBPC} IsEDI={rowData.RFEDI} IsGEMS={rowData.RFGems} IsDiamond={rowData.RFDiamond} IsSAPWeb={rowData.RFSAPWeb} IsSAPAdhoc={rowData.RFSAPAdhoc}/>
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
export default SystemAccessComp;