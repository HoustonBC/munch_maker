import React, { Component } from 'react';
import FuzzyPicker, {FuzzyWrapper} from 'react-fuzzy-picker';


class UserSearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchText: ''
    }
    this.searchTextChange = this.searchTextChange.bind(this)
    this.renderFuzzyPicker = this.renderFuzzyPicker.bind(this)
    this.isCorrectKeyPressed = this.isCorrectKeyPressed.bind(this)
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

  renderFuzzyPicker(isOpen, onClose) {
    let userList = this.state.users.map(user => (
      user.email
    ))
    return(
      <FuzzyPicker
        label='User search'
        isOpen={isOpen}
        onClose={onClose}
        onChange={choice => console.log('You picked', choice)}
        items={userList}
      />
    )
  }

  isCorrectKeyPressed(event) {
    return event.key === '/';
  }

  render(){
    // let userList = this.state.users.map(user => {
    //   let queryString = this.state.searchText
    //   if (user.email.includes(queryString)){
    //     return(
    //       <div>{user.email}</div>
    //     )
    //   }
    // })


    return(
      <FuzzyWrapper
        isKeyPressed={this.isCorrectKeyPressed}
        popup={this.renderFuzzyPicker}
      />
      // <form>
      //   <input
      //     name="searchText"
      //     type="text"
      //     value={this.state.searchText}
      //     onChange={this.searchTextChange}
      //     placeholder="Search for a user"
      //     id='UserSearch'
      //     list='UserSearch'
      //   />
      //   <datalist id="UserSearch">
      //     {userList}
      //   </datalist>
      // </form>
    )
  }


}

export default UserSearchComponent;
