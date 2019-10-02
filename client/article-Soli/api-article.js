/* create by Soli 20190930*/

const list = () => {
  return fetch('/api/articleSoli/findArticle/', {
    method: 'GET',
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}
    
  
   
  
  export {
   
    list
  
    
  }
  