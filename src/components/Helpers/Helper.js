export function CallRESTAPI(endPointUrl) {
  console.log(endPointUrl);
  return fetch(endPointUrl, window.$payload)
    .then(response => { return response.json() })
}

//Global variables
window.$payload = {
  method: 'GET',
  headers: { "Accept": "application/json;odata=verbose" },
  credentials: 'same-origin'    // or credentials: 'include'  
}

window.$Status={
  InProgress : "In Progress",
  L1InProgress : "L1 In Progress",
  L1Rejected : "L1 Rejected",
  L1Approved : "L1 Approved",
  L2InProgress : "L2 In Progress",
  L2Rejected : "L2 Rejected",
  L2Approved : "L2 Approved",
  L3InProgress : "L3 In Progress",
  L3Rejected : "L3 Rejected",
  L3Approved : "L3 Approved",
  L4InProgress : "L4 In Progress",
  L4Rejected : "L4 Rejected",
  L4Approved : "L4 Approved",
  UserCreationConfirmed : "UserCreation Confirmed",
  UserCreationInProgress : "UserCreation In Progress",
}

window.$ListNames={
  EmployeeOnboard:"New User Request"
}


/*To-Do for next developer
From : Devika Sharma
1) Add currentuser flag for Requester dashboard REST API call and skip it for Admin Dashboard, the code is mentioned
in the EmployeeOnboardComp
2) Replace Datatable with ReactBootstrap table to avoid the dependency on the DataTable and Jquery Plugin.
3) Revamp whole code for HardwareOnboard using current EmployeeOnboardComp.js
4) Separate components are made for the Supervisor, Country Head, HR, Infra, VHR, SalesForce and SharedFolderAccess so no code efforts are required.
Just add them whereeever required. Refer the EmployeeOnboardComp.js 
5) Use this helper for common methods and common variables like status is already mentioned and keep adding listnames here.
*/