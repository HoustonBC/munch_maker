import React, { Component } from 'react';
import { Link } from 'react-router';

class HomePageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: true,
      searchText: '',
    }
    this.searchSubmit = this.searchSubmit.bind(this)
    this.searchTextChange = this.searchTextChange.bind(this)
  }

  searchTextChange(event) {
    this.setState({searchText: event.target.value});
  }

  searchSubmit(event) {
    event.preventDefault()
    let payload = this.state.searchText
    // fetch('/api/restaurants?loc=' + payload, {
    //   method: 'GET',
    //   credentials: 'same-origin',
    //   headers: {
    //    'Content-Type': 'application/json',
    //    'X-Requested-With': 'XMLHttpRequest'
    //   },
    // })
    debugger;
    window.location = '/restaurants/' + payload;
    // this.props.history.push(`/restaurants/${payload}`)
  }

  componentDidMount() {
    fetch('/api/homes', {credentials: 'same-origin'})
      .then(response => response.json())
      .then(body => {
        let logInStatus = body
        this.setState({ user: logInStatus })
        debugger;
      })
  }

  render() {
    let conditionalDisplay;
    let searchBar = (
      <form onSubmit={this.searchSubmit} className='search'>
        <label> Let's get started! Enter your location.
          <input
            name="searchText"
            type="text"
            value={this.state.searchText}
            onChange={this.searchTextChange}
            placeholder="Location"
          />
        </label>
        <input className="button" type="submit" value="Submit"/>
      </form>
    )
    let LoginPage = (
        <div>
          <a href='users/sign_in'><button type='button'> Log In </button></a>
          <br />
          <a href='users/sign_up'><button type='button'> Sign Up </button></a>
        </div>
    )
    if (this.state.user == true){
      conditionalDisplay = searchBar;
    } else {
      conditionalDisplay = LoginPage;
    }
    return(
      <div>
        {conditionalDisplay}
      </div>
    )
  }

}

export default HomePageComponent;
