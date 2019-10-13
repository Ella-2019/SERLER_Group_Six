
import chai, { expect } from 'chai';
import sinon from 'sinon'
//const sinon = require("sinon");
//const chai = require("chai");
//const expect = chai.expect;


const indexPage = require("../controllers/post.controller.js");

const dummyPostObject = {"_id":"5a3cb2399bcc621874d7e42f",
                         "postedBy":{"_id":"5a3cb1779bcc621874d7e428",
                         "name":"Joe"}, "text":"hey!",
                         "created":"2017-12-22T07:20:25.611Z",
                         "comments":[], "likes":[]} 
const dummyAuthObject = {user: {"_id":"5a3cb1779bcc621874d7e428",
                                "name":"Joe",
                                "email":"abc@def.com"}} 

describe("AppController", function()  {
    describe("getIndexPage", function() {
        it("should send hey when show all user", function() {
            // instantiate a user object with an empty isLoggedIn function
            let post = {
                isLoggedIn: function(){}
              }
            //const post = dummyPostObject                      
            
            const islistByUserSub = sinon.stub(post,"listByUser").returns(true);
            
            let req = {
                post: dummyPostObject,
              };

            let res = {
                send: function() {},
              };
        
                                  
            // mock res
            const mock = sinon.mock(res);
            // build how we expect it work
            mock.expects("send").once().withExactArgs("Hey");
                                    
            indexPage.getIndexPage(req, res);
            expect(islistByUserSub.calledOnce).to.be.true;
                                    
            // verify that mock works as expected
            mock.verify();
        });
    });
});
