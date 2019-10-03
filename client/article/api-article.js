const create = (params, credentials, article) => {
    return fetch('/api/articles/new/'+ params.userId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: article
    }).then((response) => {
      return response.json()
    }).catch((err) => {
      console.log(err)
    })
  }
  
  const listByUser = (params, credentials) => {
    return fetch('/api/articles/by/'+ params.userId, {
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
    return fetch('/api/articles/feed/'+ params.userId, {
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
    return fetch('/api/articles/' + params.articleId, {
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
  
  const like = (params, credentials, articleId) => {
    return fetch('/api/articles/like/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({userId:params.userId, articleId: articleId})
    }).then((response) => {
      return response.json()
    }).catch((err) => {
      console.log(err)
    })
  }
  
  const unlike = (params, credentials, articleId) => {
    return fetch('/api/articles/unlike/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({userId:params.userId, articleId: articleId})
    }).then((response) => {
      return response.json()
    }).catch((err) => {
      console.log(err)
    })
  }
  
  const comment = (params, credentials, articleId, comment) => {
    return fetch('/api/articles/comment/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({userId:params.userId, articleId: articleId, comment: comment})
    }).then((response) => {
      return response.json()
    }).catch((err) => {
      console.log(err)
    })
  }
  
  const uncomment = (params, credentials, articleId, comment) => {
    return fetch('/api/articles/uncomment/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({userId:params.userId, articleId: articleId, comment: comment})
    }).then((response) => {
      return response.json()
    }).catch((err) => {
      console.log(err)
    })
  }
  
  export {
    listFeed,
    listByUser,
    create,
    remove,
    like,
    unlike,
    comment,
    uncomment
  }
  