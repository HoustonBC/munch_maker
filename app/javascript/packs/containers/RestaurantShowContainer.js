import React, { Component } from 'react';
import RestaurantShowComponent from "../components/RestaurantShowComponent"

class RestaurantShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {}
    }
  }

  componentDidMount() {
    fetch('/api/restaurants')
      .then(response => response.json())
      .then(body => {
        let jsonRestaurant = body
        this.setState({ restaurant: jsonRestaurant })
      })
  }

  render() {
    return(
      <div>
        <div>
          <RestaurantShowComponent
            id={this.state.restaurant.id}
            name={this.state.restaurant.name}
            image={this.state.restaurant.image_url}
            categories={this.state.restaurant.categories} // is an array
            rating={this.state.restaurant.rating}
            price={this.state.restaurant.price}
            location={this.state.restaurant.location} //is a hash
            phone={this.state.restaurant.phone}
          />
        </div>
        <div>
          <span><button type='button'>Dislike!</button></span>
          <span><button type='button'>Like!</button></span>
        </div>
      </div>
    )
  }
}

export default RestaurantShowContainer;
