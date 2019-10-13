import autht from './../auth/auth-helper.js'
import Post from '../post/Post.js'
import React from 'react'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import sinon from 'sinon'
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';


sinon.mock('./../auth/auth-helper.js') 

const dummyPostObject = {"_id":"5a3cb2399bcc621874d7e42f",
                         "postedBy":{"_id":"5a3cb1779bcc621874d7e428",
                         "name":"Joe"}, "text":"hey!",
                         "created":"2017-12-22T07:20:25.611Z",
                         "comments":[], "likes":[]} 
const dummyAuthObject = {user: {"_id":"5a3cb1779bcc621874d7e428",
                                "name":"Joe",
                                "email":"abc@def.com"}} 

 console.log("1")                               
describe('App Component testing', function() {
  it('delete option visible only to authorized user', () => {
    const post = dummyPostObject 
    const auth = dummyAuthObject 
   console.log("2")
   autht.isAuthenticated.mock.verify(auth) 

  
    const component = renderer.create(
       <MemoryRouter>
           <Post post={post} key={post._id} ></Post>
       </MemoryRouter>
    ) 
    })
    let tree = component.toJSON()   
    expect(tree).toMatchSnapshot() 
}) 