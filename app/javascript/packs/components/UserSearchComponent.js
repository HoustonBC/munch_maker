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
    this.sendEmail = this.sendEmail.bind(this)

  }

  componentDidMount(){
    fetch('/api/users', {credentials: 'same-origin'})
      .then(response => response.json())
      .then(body => {
        let useresponse = body['users']
        this.setState({ users: useresponse })
      })
  }

  searchTextChange(event) {
    this.setState({searchText: event.target.value});
  }

  sendEmail(choice){
    let payload = this.props.restaurant.name
    fetch('/api/matches.json?recipient=' + choice, {
      method: 'POST',
      body: JSON.stringify(payload),
      credentials: 'same-origin',
      headers: {
       'content-type': 'application/json',
       'X-Requested-With': 'XMLHttpRequest'
      },
    })
    console.log('your email has been sent to', choice)
  }

  renderFuzzyPicker(isOpen, onClose) {
    let userList
    if (this.state.users.lenght > 0){
      let userList = this.state.users.map(user => (
        user.email
      ))
    }
    return(
      <FuzzyPicker
        label='User search'
        isOpen={isOpen}
        onClose={onClose}
        onChange={choice => this.sendEmail(choice)}
        items={userList}
      />
    )
  }

  isCorrectKeyPressed(event) {
    return event.key === '/';
  }

  render(){
    return(
      <FuzzyWrapper
        isKeyPressed={this.isCorrectKeyPressed}
        popup={this.renderFuzzyPicker}
      />
    )
  }


}

export default UserSearchComponent;
