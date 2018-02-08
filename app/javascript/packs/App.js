import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import RestaurantShowContainer from './containers/RestaurantShowContainer';
import HomePageComponent from './components/HomePageComponent'

const App = (props) => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={HomePageComponent} />
        <Route path='/restaurants' component={RestaurantShowContainer} />
      </Router>
    </div>
  );
}

export default App;
