import React, { Component } from 'react';
import RestaurantShowComponent from "../components/RestaurantShowComponent"

class RestaurantShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.props.initialRender()
  }

  render() {
    return(
      <div className='restaurant-show'>
        <div>
          <RestaurantShowComponent
            id={this.props.restaurant.id}
            name={this.props.restaurant.name}
            image={this.props.restaurant.image_url}
            categories={this.props.restaurant.categories} // is an array
            rating={this.props.restaurant.rating}
            price={this.props.restaurant.price}
            location={this.props.restaurant.location} //is a hash
            phone={this.props.restaurant.display_phone}
          />
        </div>
        <div>
          <span><button onClick={this.props.handleDisLike} type='button'>Dislike!</button></span>
          <span><button onClick={this.props.handleLike} type='button'>Like!</button></span>
        </div>
      </div>
    )
  }
}

export default RestaurantShowContainer;
