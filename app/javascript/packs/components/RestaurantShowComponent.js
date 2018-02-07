import React from 'react';

const RestaurantShowComponent = (props) => {

  let imgTag = ''
  if(props.image){
    imgTag = (
      <img src={"" + props.image} alt="Restaurant Name" />
    )
  }

  let categories = (props.categories || []).map(category => {
    return(
      <li>{category['title']} </li>
    )
  })

  let location = ''
    if(props.location){
      location = (
        <p> {props.location.display_address[0]}, {props.location.display_address[1]} </p>
      )
    }

  return(
    <div className="restaurant-show">
      <h2>{props.name}</h2>
      <p>{props.phone}</p>
      {location}
      {imgTag}
      <div>Rating: {props.rating}</div>
      <div>Price: {props.price}</div>
      <ul> Categories:
        {categories}
      </ul>
    </div>
  )
}

export default RestaurantShowComponent;
