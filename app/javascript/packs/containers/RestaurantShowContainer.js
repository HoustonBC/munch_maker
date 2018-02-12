import React, { Component } from 'react';
import RestaurantShowComponent from "../components/RestaurantShowComponent"

class RestaurantShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {},
      repeats: []
    }
    this.onLike = this.onLike.bind(this)
    this.onDisLike = this.onDisLike.bind(this)
  }

  componentDidMount() {
    let payload = this.props.location
    fetch('/api/restaurants?loc=' + payload, {
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
    fetch('/api/restaurants', {
      method: 'POST',
      body: JSON.stringify(payload),
      credentials: 'same-origin',
      headers: {
       'Content-Type': 'application/json',
       'X-Requested-With': 'XMLHttpRequest'
      },
    })
    this.onDisLike(event)
  }

  onDisLike(event){
    event.preventDefault();
    let payload = this.props.location
    fetch('/api/restaurants?loc=' + payload, {
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
          let jsonRestaurant = body
          let previousState = this.state.repeats
          this.setState({repeats: previousState.concat(body.id)})
          this.setState({ restaurant: jsonRestaurant })
        }
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
            phone={this.state.restaurant.display_phone}
          />
        </div>
        <div>
          <span><button onClick={this.onDisLike} type='button'>Dislike!</button></span>
          <span><button onClick={this.onLike} type='button'>Like!</button></span>
        </div>
      </div>
    )
  }
}

export default RestaurantShowContainer;
