import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import SearchBarContainer from './containers/SearchBarContainer';
import HomePageComponent from './components/HomePageComponent'

const App = (props) => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={HomePageComponent} />
        <Route path='/restaurants' component={SearchBarContainer} />
      </Router>
    </div>
  );
}

export default App;
