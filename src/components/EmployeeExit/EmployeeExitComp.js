import React, { Component } from 'react';
import EmployeeExitSubProcess  from '../ReusableComponents/EmployeeExitSubProcess';
import { CallRESTAPI } from '../Helpers/Helper';
import DeactivateUser from '../ReusableComponents/DeactivateUser';

const { REACT_APP_API_URL } = process.env;

//Jquery 3.4 is used only for Data table plugin that is being used in each component.
const $ = require('jquery');
$.DataTable = require('datatables.net');


class EmployeeExitComp extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            flagFirstEmployeeExitLoad: false,
            currentUserEndPointURL: REACT_APP_API_URL + "/currentUser",
            dasboardEndPointURL: REACT_APP_API_URL + "/Lists/getbytitle('DashboardFlowList')/items?$select=OData__x004c_1,OData__x004c_2,OData__x004c_3,OData__x004c_4&$filter=Title eq 'NewUser'",
            tableTitle: "Employee Exit",
            data: [],
            headerList: [{
                columnName: "Created Date",
                className: ""
            },
            {
                columnName: "On Behalf of",
                className: ""
            },
            {
                columnName: "Country Head",
                className: "nosort"
              },
              {
                columnName: "HR",
                className: "nosort"
              },
            ],
            subProcessList: []
        }
    }

    //when the componen will load
    componentWillMount() {
       
        this.GetDashboardHeaders();
        this.SetCurrentUserInState();
    }

    GetDashboardHeaders = () => {
              
        this.state.headerList.push({ columnName: "Sub Processes", className: "nosort" });
        this.state.headerList.push({ columnName: "Deactivate User", className: "nosort" });
    };

    //To set the header
    SetLevelState = (keyValue, columnValue) => {
        this.state.headerList.push({ columnName: columnValue, className: "" });
        this.setState({ [keyValue]: columnValue });
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
            if (!this.state.flagFirstEmployeeExitLoad) {
                $('#empExitTable').DataTable({
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
                this.setState({ flagFirstEmployeeExitLoad: true })
            }
        });
    }

    //Initial call for this component
    CallAPIs = () => {
      
      
        var endPointUrl = REACT_APP_API_URL + "/Lists/getbytitle('Staff Clearance')/items?" +
            "$select=Id,Created,RFResigneeName,RFTicketStatus,RFSupervisor1,RFCountryHead,RFHR1,RFChenStatus,RFGroupGemsStatus,RFGroupInfraStatus,RFGroupInsightStatus,RFGroupOptimumStatus,RFGroupQwikiStatus,RFGroupSalesForceStatus,RFGroupSAPStatus" +
            "&$orderby=Created desc&$top=10 &$filter=AuthorId eq '"+this.state.currentUser+"'"
          
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

    IndicateStatusForCountryHead= function (status) {
        var statusColor = '';
        var generalGreen = "fa fa-check green";
        
        if (status === "L2 In Progress" )
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
        else if (status === "Support In Progress")
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

      IndicateStatusForHR= function (status) {
        status=status.trim();
        
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
        else if (status === "Support In Progress")
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
                                    <table className="table" id="empExitTable">
                                        <thead className=" text-primary-blue">
                                            <tr>{this.state.headerList.map((headerColumn, key) =>
                                                <th key={key} className={headerColumn.className}>{headerColumn.columnName}</th>)}
                                            </tr></thead>
                                        <tbody>
                                            
                                            {this.state.data.map((rowData, key) => (
                                                <tr key={key}>
                                                    <td> {rowData.Created.slice(0, 10)} </td>
                                                    <td> {rowData.RFResigneeName}</td>
                                                    <td> <i className={this.IndicateStatusForCountryHead( rowData.RFTicketStatus)} data-toggle="tooltip" data-placement="top" title={rowData.RFCountryHead}></i><span className="hide">{rowData.RFSupervisor1}</span></td>
                                                    <td> <i className={this.IndicateStatusForHR( rowData.RFTicketStatus)} data-toggle="tooltip" data-placement="top" title={rowData.RFHR1}></i><span className="hide">{rowData.RFCountryHead}</span></td>
                                                    <td className="subprocess">
                                                    <EmployeeExitSubProcess thisSubProcessId={rowData.Id} ExitTicketStatus={rowData.RFTicketStatus} IsGemsDiamond={rowData.RFGroupGemsStatus} IsSAPWeb={rowData.RFChenStatus} IsSalesForce={rowData.RFGroupSalesForceStatus}  IsSAP={rowData.RFGroupSAPStatus} IsOptimum={rowData.RFGroupOptimumStatus} IsInsight={rowData.RFGroupInsightStatus} IsInfra={rowData.RFGroupInfraStatus} IsQwiki={rowData.RFGroupQwikiStatus} />
                                                  </td>
                                                  <td><DeactivateUser thisSubProcessId={rowData.Id} status={rowData.RFTicketStatus} /></td>
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
export default EmployeeExitComp;