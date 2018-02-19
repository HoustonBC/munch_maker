import React from 'react';

const RestaurantShowComponent = (props) => {

  let imgTag = ''
  if(props.image){
    imgTag = (
      <div id='rimage'>
        <img src={"" + props.image} alt="Restaurant Name" />
      </div>
    )
  }

  let categories = (props.categories || []).map(category => {
    return(
      <span> {category['title']},  </span>
    )}
  )

  let location = ''
    if(props.location){
      if(props.location.display_address){
        location = (
          <p> {props.location.display_address[0]}, {props.location.display_address[1]} </p>
        )
      } else {
        <p> {props.location} </p>
      }
    }

  return(
    <div>
      <h2>{props.name}</h2>
      <p>{props.phone}</p>
      {location}
      {imgTag}
      <div>Rating: {props.rating}</div>
      <div>Price: {props.price}</div>
      <div> Categories:
        {categories}
      </div>
    </div>
  )
}

export default RestaurantShowComponent;
