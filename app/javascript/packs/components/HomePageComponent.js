import React, { Component } from 'react';

class HomePageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false
    }
  }

  componentDidMount() {
    fetch('/api/homes', {credentials: 'same-origin'})
      .then(response => response.json())
      .then(body => {
        let logInStatus = body
        this.setState({ user: logInStatus })
      })
      if (this.state.user == true){
        window.location = "/restaurants";
      }
  }

  render() {
    let LoginPage = (
        <div>
          <a href='users/sign_in' id='lbutton'><button type='button'> Log In </button></a>
          <br />
          <a href='users/sign_up' id='lbutton'><button type='button'> Sign Up </button></a>
        </div>
    )
    return(
      <div className='homepage'>
        {LoginPage}
      </div>
    )
  }

}

export default HomePageComponent;
