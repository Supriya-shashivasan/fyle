import React, { Component } from 'react';
import { render } from 'react-dom';
import request from 'axios';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './App.css';

import Main from './components/main'
import Bank from './components/bank'
import Favorites from './components/favorites';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/bank/:id" component={Bank} />
        <Route exact path="/" component={Main} />
        <Route exact path="/favorites" component={Favorites} />
      </div>
    </Router>
  );
}

export default App;
