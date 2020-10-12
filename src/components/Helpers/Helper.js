export function CallRESTAPI(endPointUrl) {
  console.log(endPointUrl);
  return fetch(endPointUrl, window.$payload)
    .then(response => { return response.json() })
}