import React, { Component } from 'react';


class UserSearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchText: ''
    }
    this.searchTextChange = this.searchTextChange.bind(this)
  }

  componentDidMount(){
    fetch('/api/users', {credentials: 'same-origin'})
      .then(response => response.json())
      .then(body => {
        let useresponse = body
        this.setState({ users: useresponse })

      })
  }

  searchTextChange(event) {
    this.setState({searchText: event.target.value});
  }

  render(){
    let userList = this.state.users.map(user => {
      let queryString = this.state.searchText
      if (user.email.includes(queryString)){
        return(
          <div>{user.email}</div>
        )
      }
    })

    return(
      <form>
        <input
          name="searchText"
          type="text"
          value={this.state.searchText}
          onChange={this.searchTextChange}
          placeholder="Search for a user"
          id='UserSearch'
          list='UserSearch'
        />
        <datalist id="UserSearch">
          {userList}
        </datalist>
      </form>
    )
  }


}

export default UserSearchComponent;
