import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import GINAComp from './components/GINA/GINAComp';
import HardwareOnboard from './components/HardwareOnboard';
import EmployeeOnboardComp from './components/EmployeeOnboard/EmployeeOnboardComp';
import SystemAccessComp from './components/SystemAccess/SystemAccessComp';
import HardwareSoftwareComp from './components/HardwareSoftware/HardwareSoftwareComp';
import EmployeeExitComp from './components/EmployeeExit/EmployeeExitComp';
import RequestorDashboardComp from './components/RequestorDashboard/RequestorDashboardComp';


ReactDOM.render(<RequestorDashboardComp />, document.getElementById('requestorDashboard'));
ReactDOM.render(<EmployeeOnboardComp />, document.getElementById('employeeOnboard'));
ReactDOM.render(<HardwareOnboard />, document.getElementById('hardwareOnboard'));
ReactDOM.render(<SystemAccessComp />, document.getElementById('systemAccess'));
ReactDOM.render(<HardwareSoftwareComp />, document.getElementById('hardware'));
ReactDOM.render(<GINAComp />, document.getElementById('ginaAccess'));
ReactDOM.render(<EmployeeExitComp />, document.getElementById('employeeExit'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
