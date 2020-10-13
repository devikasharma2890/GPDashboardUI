import React, { Component } from 'react';
import VHR from "../ReusableComponents/VHR";
import SalesForce from './SalesForce';
import SharedFolderAccess from './SharedFolderAccess';

class EmployeeOnboardSubProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
    if (currentStatus.includes("UserCreation")) {
      console.log("Render method of EmployeeOnBoardSubProcess");
      subprocessExist = <div><button onClick={this.HandleClick} className="collapsedData btn">
        <i className="fa fa-th-list"></i>
      </button>
        <span id="subprocessDetails" className="hide">
          <VHR thisVHRItemId={currentItemId} currentRequestStatus={currentStatus} />
          <SalesForce thisItemId={currentItemId} currentRequestStatus={currentStatus} />
          <SharedFolderAccess thisItemId={currentItemId} currentRequestStatus={currentStatus} />
        </span>
      </div>;
    }
    else {
      subprocessExist = <div></div>;
    }


    return (
      <div>{subprocessExist}</div>
    )
  }
}

export default EmployeeOnboardSubProcess;
