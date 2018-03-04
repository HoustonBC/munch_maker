import React, { Component } from 'react';
import RestaurantShowComponent from "../components/RestaurantShowComponent"
import UserSearchComponent from "../components/UserSearchComponent"
import { Link } from 'react-router'


class RestaurantPlanContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {}
    }
  }

  componentDidMount(){
    let payload = this.props.params.id
    fetch('/api/restaurants/' + payload, {
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

  render(){
    return(
      <div>
      <div id='search'> <Link to={`/restaurants`} id='sblink'> Return to Search </Link> </div>
        <div className='restaurant-show'>
          <RestaurantShowComponent
            id={this.state.restaurant.id}
            name={this.state.restaurant.name}
            image={this.state.restaurant.image_url}
            rating={this.state.restaurant.rating}
            price={this.state.restaurant.price}
            location={this.state.restaurant.location}
            phone={this.state.restaurant.display_phone}
          />
          <br />
          <br />
          <h3>
            Press '/' to search for Users to invite
          </h3>
        </div>
        <UserSearchComponent
          restaurant={this.state.restaurant}
        />
      </div>

    )

  }



}

export default RestaurantPlanContainer;
