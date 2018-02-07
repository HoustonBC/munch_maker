import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import RestaurantShowContainer from './containers/RestaurantShowContainer';


const App = (props) => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={RestaurantShowContainer} />
      </Router>
    </div>
  );
}

export default App;
