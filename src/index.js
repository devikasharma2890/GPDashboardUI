import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import HardwareOnboard from './components/HardwareOnboard';
import EmployeeOnboardComp from './components/EmployeeOnboard/EmployeeOnboardComp';

//Global variables
window.$payload = {
  method: 'GET',
  headers: { "Accept": "application/json;odata=verbose" },
  credentials: 'same-origin'    // or credentials: 'include'  
}

ReactDOM.render(<EmployeeOnboardComp />, document.getElementById('employeeOnboard'));
ReactDOM.render(<HardwareOnboard />, document.getElementById('hardwareOnboard'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
