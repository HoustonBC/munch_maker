import React, { Component } from 'react';
import RestaurantShowContainer from '../containers/RestaurantShowContainer'
import SideBarComponent from '../components/SideBarComponent'
import { Link } from 'react-router';
import { slide as Menu } from 'react-burger-menu'

class SearchBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      location: '',
      matches: [],
      repeats: [],
      restaurant: {}
    }
    this.searchSubmit = this.searchSubmit.bind(this)
    this.searchTextChange = this.searchTextChange.bind(this)
    this.deleteMatch = this.deleteMatch.bind(this)
    this.initialRender = this.initialRender.bind(this)
    this.onLike = this.onLike.bind(this)
    this.onDisLike = this.onDisLike.bind(this)
    this.getMatches = this.getMatches.bind(this)

  }

  searchTextChange(event) {
    this.setState({searchText: event.target.value});
  }

  searchSubmit(event) {
    event.preventDefault();
    this.setState({location: this.state.searchText});
  }

  getMatches(){
    fetch('/api/matches', {credentials: 'same-origin'})
    .then(response => response.json())
    .then(body => {
      let returned_matches = body
      this.setState({ matches: returned_matches })
      debugger;
    })
  }

  componentDidMount() {
    fetch('/api/matches', {credentials: 'same-origin'})
    .then(response => response.json())
    .then(body => {
      let returned_matches = body
      this.setState({ matches: returned_matches })
    })
  }

  initialRender(){
    let payload = this.state.location
    fetch('/api/restaurants.json?loc=' + payload, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
       'Content-Type': 'application/json',
       'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(response => response.json())
    .then(body => {
      let jsonRestaurant = body
      this.setState({ restaurant: jsonRestaurant })
    })
  }

  onLike(event){
    let payload= {restaurant: this.state.restaurant}
    fetch('/api/restaurants.json', {
      method: 'POST',
      body: JSON.stringify(payload),
      credentials: 'same-origin',
      headers: {
       'content-type': 'application/json',
       'X-Requested-With': 'XMLHttpRequest'
      },
    })
    this.onDisLike(event);
  }

  onDisLike(event){
    event.preventDefault();
    let jsonRestaurant;
    let payload = this.state.location
    fetch('/api/restaurants.json?loc=' + payload, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
       'Content-Type': 'application/json',
       'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(response => response.json())
      .then(body => {
        if (this.state.repeats.includes(body.id)){
          this.onDisLike(event)
        } else {
          jsonRestaurant = body
          let previousState = this.state.repeats
          this.setState({repeats: previousState.concat(body.id)})
          this.setState({ restaurant: jsonRestaurant })
          this.getMatches();
        }
      })
  }

  deleteMatch(current_match){
    fetch('/api/matches/' + current_match, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
       'Content-Type': 'application/json',
       'X-Requested-With': 'XMLHttpRequest'
      }
    }).then((response) => {
      const newMatches = this.state.matches.filter(match => match.id !== current_match)
      this.setState({matches: newMatches})
    })
  }

  render() {
    let conditionalDisplay;
    let searchBar = (
      <form onSubmit={this.searchSubmit} className='searchBox'>
        <label>
          <input
            name="searchText"
            type="text"
            value={this.state.searchText}
            onChange={this.searchTextChange}
            placeholder="Enter your City"
            id='searchBar'
          />
        </label>
        <input className="button" id='sbutton' type="submit" value="Submit"/>
      </form>
    )
    let restaurantShow = (
      <div>
        <RestaurantShowContainer
          location={this.state.location}
          initialRender={this.initialRender}
          handleLike={this.onLike}
          handleDisLike={this.onDisLike}
          restaurant={this.state.restaurant}
        />
      </div>
    )
    let sideBar = (
      <SideBarComponent
        matches={this.state.matches}
        handleDelete={this.deleteMatch}
      />
    )
    if (this.state.location != '')
      conditionalDisplay = restaurantShow;
    else {
      conditionalDisplay = searchBar;
    }
    return(
      <div>
        <div>
          {sideBar}
        </div>
        <div>
          {conditionalDisplay}
        </div>
      </div>
    )
  }

}

export default SearchBarContainer;
