import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';


const App = (props) => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={ArticlesIndexContainer} />
        <Route path="/articles/:id" component={ArticleShowContainer}/>
      </Router>
    </div>
  );
}

export default App;
