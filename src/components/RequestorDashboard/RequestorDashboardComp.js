import React, { Component } from 'react';
import { CallRESTAPI } from '../Helpers/Helper';

const { REACT_APP_API_URL } = process.env;
//Jquery 3.4 is used only for Data table plugin that is being used in each component.
const $ = require('jquery');
$.DataTable = require('datatables.net');


class RequestorDashboardComp extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          flagFirstHardwareAdLoad: false,
            currentUserEndPointURL: REACT_APP_API_URL + "/currentUser",
            dasboardEndPointURL: REACT_APP_API_URL + "/Lists/getbytitle('DashboardFlowList')/items?$select=OData__x004c_1,OData__x004c_2,OData__x004c_3,OData__x004c_4&$filter=Title eq 'NewUser'",
            tableTitle: "Requestor Dashboard",
            data: [],
            
            subProcessList: []
        }
    }

    //when the componen will load
    componentWillMount() {
       
       
    }

    
   


    
    

    

   
  
    render() {
        var subprocess;
        
        return (
            <div className="child child-width">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <button className="btn card-header-btn" >
                                <div className="card-header header-grey card-header-primary">
                                    <h4 className="card-title-dashboard">{this.state.tableTitle}&nbsp;</h4>
                                </div>
                            </button>
                            <div className="card-body hide">
                                <div className="table-responsive">
                                    <table className="table" id="hardwareTable">
                                        <thead className=" text-primary-blue">
                                           </thead>
                                        <tbody>
                                            
                                            
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
export default RequestorDashboardComp;