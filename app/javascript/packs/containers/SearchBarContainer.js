import React, { Component } from 'react';
import RestaurantShowContainer from '../containers/RestaurantShowContainer'
import { Link } from 'react-router';

class SearchBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: true,
      searchText: '',
      location: ''
    }
    this.searchSubmit = this.searchSubmit.bind(this)
    this.searchTextChange = this.searchTextChange.bind(this)
  }

  searchTextChange(event) {
    this.setState({searchText: event.target.value});
  }

  searchSubmit(event) {
    event.preventDefault()
    this.setState({location: this.state.searchText})
  }

  componentDidMount() {
    debugger;
    fetch('/api/homes', {credentials: 'same-origin'})
      .then(response => response.json())
      .then(body => {
        let logInStatus = body
        this.setState({ user: logInStatus })
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
    let restaurantShow = (
      <div>
        <RestaurantShowContainer
          location={this.state.location}
        />
      </div>
    )
    if (this.state.user == true){
      if (this.state.location != '')
        conditionalDisplay = restaurantShow;
      else {
        conditionalDisplay = searchBar;
      }
    } else if (this.state.user == false){
      conditionalDisplay = LoginPage;
    }
    return(
      <div>
        {conditionalDisplay}
      </div>
    )
  }

}

export default SearchBarContainer;
