import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'

class SideBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    }
  }

  render(){
    let matches = this.props.matches.map(Match => {
      return(
        <div id="match"> {Match.name} <span onClick={() => this.props.handleDelete(Match.id)} className='ecks'><i className="fas fa-times"></i></span></div>
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
