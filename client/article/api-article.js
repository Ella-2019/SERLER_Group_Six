/* create by Soli 20190930*/

const list = () => {
  return fetch('/api/articleSoli/', {
    method: 'GET',
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}
    
  const read = (params, credentials) => {
    return fetch('/api/articleSoli/' + params.userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    }).then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
  }
  
   
  
  export {
   
    list,
    read
    
  }
  