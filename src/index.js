import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import App from './App';
import BeerList from './components/BeerList';
import BeerForm from './components/BeerForm';
import BeerPhoto from './components/BeerPhoto';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={BeerList} />
      <Route path="/new" component={BeerForm} />
      <Route path="/photo" component={BeerPhoto} />
    </Route>
  </Router>,
  document.getElementById('root')
);
