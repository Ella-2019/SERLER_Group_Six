import React, { Component } from 'react';
import axios from 'axios';

const User = props => (
  <tr>
      <td>{props.user.login}</td>
      <td>{props.user.full_name}</td>
      <td>{props.user.email}</td>
      <td>{props.user.role}</td>
  </tr>
)

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentDidMount() {
      //axios.get('/api/v1/users')
      axios.get('http://localhost:9001/api/v1/users')
          .then(response => {
              this.setState({ users: response.data });
          })
          .catch(function (error){
              console.log(error);
          })
    } 

    userList() {
      return this.state.users.map(function(currentUser, i){
          return <User user={currentUser} key={i} />;
      })
    }

    render() {
      return (
        <div className="App">
        <header className="App-header">
        <h3>User List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }} >
            <thead>
                <tr>
                    <th>Login</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                { this.userList() }
            </tbody>
        </table>
        </header>
        </div>
      )
    }
}
