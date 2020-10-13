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