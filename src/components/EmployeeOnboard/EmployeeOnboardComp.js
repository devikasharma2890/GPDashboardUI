import React, { Component } from 'react';
import Supervisor from '../ReusableComponents/Supervisor';
import CountryHead from '../ReusableComponents/CountryHead';
import HR from '../ReusableComponents/HR';
import Infra from '../ReusableComponents/Infra';
import EmployeeOnboardSubProcess from '../ReusableComponents/EmployeeOnboardSubProcess';
import { CallRESTAPI } from '../Helpers/Helper';

const { REACT_APP_API_URL } = process.env;
//Jquery 3.4 is used only for Data table plugin that is being used in each component.
const $ = require('jquery');
$.DataTable = require('datatables.net');


class EmployeeOnboardComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flagFirstEmployeeOnboardLoad: false,
            currentUserEndPointURL: REACT_APP_API_URL + "/currentUser",
            dasboardEndPointURL: REACT_APP_API_URL + "/Lists/getbytitle('DashboardFlowList')/items?$select=OData__x004c_1,OData__x004c_2,OData__x004c_3,OData__x004c_4&$filter=Title eq 'NewUser'",
            tableTitle: "Employee Onboard",
            data: [],
            headerList: [{
                columnName: "Created",
                className: ""
            },
            {
                columnName: "New Employee",
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
    }

    //To set the header
    SetLevelState = (keyValue, columnValue) => {
        this.state.headerList.push({ columnName: columnValue, className: "" });
        this.setState({ [keyValue]: columnValue });
    };

    GetDashboardHeaders = () => {
        //Hard-coded headers
        this.SetLevelState("L1", "Supervisor")
        this.SetLevelState("L2", "Country Head")
        this.SetLevelState("L3", "HR")
        this.SetLevelState("L4", "Infra")
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
            if (!this.state.flagFirstEmployeeOnboardLoad) {
                $('#empOnboardTable').DataTable({
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
                this.setState({ flagFirstEmployeeOnboardLoad: true })
            }
        });
    }

    //Initial call for this component
    CallAPIs = () => {
        var endPointUrl = REACT_APP_API_URL + "/Lists/getbytitle('"+ window.$ListNames.EmployeeOnboard + "')/items?" +
            "$select=Id,Created,Title,RFApprovalStatus,RFSupervisorName0,RFCountryHead,RFRequestorName,RFSAPStatus,RFGemsStatus,RFVirtualHR,RFMicrosoftOffice,SAP,RFSharedFolder" +
            "&$top=10&$orderby=Created desc"
            debugger;
        //endPointUrl="REACT_APP_API_URL/Lists/getbytitle('New User Request')/items?$top=10&$orderby=Created desc&$filter=AuthorId eq '"+currentUser+"'"
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
                                            <tr>{this.state.headerList.map((headerColumn, key) =>
                                                <th key={key} className={headerColumn.className}>{headerColumn.columnName}</th>)}
                                            </tr></thead>
                                        <tbody>
                                            {this.state.data.map((rowData, key) => (
                                                <tr key={key}>
                                                    <td> {rowData.Created.slice(0, 10)} </td>
                                                    <td> {rowData.Title}</td>
                                                    <td><Supervisor status={rowData.RFApprovalStatus} supervisorname={rowData.RFSupervisorName0} /></td>
                                                    <td><CountryHead status={rowData.RFApprovalStatus} countryheadname={rowData.RFCountryHead} /></td>
                                                    <td><HR status={rowData.RFApprovalStatus} /></td>
                                                    <td><Infra status={rowData.RFApprovalStatus} /></td>
                                                    <td className="subprocess">
                                                        <EmployeeOnboardSubProcess thisSubProcessId={rowData.Id} status={rowData.RFApprovalStatus} />
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
export default EmployeeOnboardComp;