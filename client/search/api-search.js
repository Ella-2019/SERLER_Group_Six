  const create = (params, credentials, search) => {
    return fetch('/api/search/new/'+ params.userId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: search
    }).then((response) => {
      return response.json()
    }).catch((err) => {
      console.log(err)
    })
  }
  
  const listByUser = (params, credentials) => {
    return fetch('/api/search/by/'+ params.userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    }).then(response => {
      return response.json()
    }).catch((err) => console.log(err))
  }
  
  const listFeed = (params, credentials) => {
    return fetch('/api/search/feed/'+ params.userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    }).then(response => {
      return response.json()
    }).catch((err) => console.log(err))
  }
  
  const remove = (params, credentials) => {
    return fetch('/api/search/' + params.searchId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    }).then((response) => {
      return response.json()
    }).catch((err) => {
      console.log(err)
    })
  }
  
  //add soli 2019/10/2
  /*const listArticle = () => {
    return fetch('/api/searches/searchArticleList/', {
      method: 'GET',
    }).then(response => {
      return response.json()
    }).catch((err) => console.log(err))
  }*
  
  /*const list = () => {
  return fetch('/api/articleSoli/findArticle/', {
    method: 'GET',
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}*/
  

  export {
    listFeed,
    listByUser,
    create,
    remove,
    listArticle
  }
  