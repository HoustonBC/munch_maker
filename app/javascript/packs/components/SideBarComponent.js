import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'

class SideBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      location: '',
      update: false
    }
    this.deleteMatch = this.deleteMatch.bind(this);
  }

  componentDidMount() {
    fetch('/api/matches', {credentials: 'same-origin'})
      .then(response => response.json())
      .then(body => {
        let returned_matches = body
        this.setState({ matches: returned_matches })
      })
      debugger;
      this.setState({ update: false })
  }

  deleteMatch(current_match){
    fetch('/api/matches/' + current_match, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
       'Content-Type': 'application/json',
       'X-Requested-With': 'XMLHttpRequest'
      }
    })
    this.setState({ update: true })
  }

  render(){
    let matches = this.state.matches.map(Match => {
      return(
        <div id="match"> {Match.name} <span onClick={() => this.deleteMatch(Match.id)} className='ecks'><i className="fas fa-times"></i></span></div>
      )
    })
    return(
      <div>
        <Menu id='sideBar'>
          <h1 id='matches'> Matches </h1>
          {matches}
        </Menu>
      </div>
    )
  }


}

export default SideBarComponent;