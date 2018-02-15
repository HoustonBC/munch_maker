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
      location: ''
    }
    this.searchSubmit = this.searchSubmit.bind(this)
    this.searchTextChange = this.searchTextChange.bind(this)

    // this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  showSettings (event) {
    event.preventDefault();
  }

  // onSetSidebarOpen(open){
  //   this.setState({sidebarOpen: open});
  // }

  searchTextChange(event) {
    this.setState({searchText: event.target.value});
  }

  searchSubmit(event) {
    event.preventDefault()
    this.setState({location: this.state.searchText})
  }

  componentDidMount() {
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
      <form onSubmit={this.searchSubmit} className='searchBox'>
        <label>
          <input
            name="searchText"
            type="text"
            value={this.state.searchText}
            onChange={this.searchTextChange}
            placeholder="Enter your Location"
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
        />
      </div>
    )
    let sideBar = (
      <SideBarComponent
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
