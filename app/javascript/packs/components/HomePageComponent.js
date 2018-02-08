import React from 'react';

const HomePageComponent = (props) => {
  return(
    <div>
      <a href='users/sign_in'><button type='button'> Log In </button></a>
      <br />
      <a href='users/sign_up'><button type='button'> Sign Up </button></a>
    </div>
  )

}

export default HomePageComponent;
