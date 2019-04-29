import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom' ;
import Header from './components/Header';
import Home from './components/pages/Home';
import Collection from './components/pages/Collection';
import Collections from './components/pages/Collections';
import Photo from './components/pages/Photo';
import Search from './components/pages/Search';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
            <Route path="/search/collections/:query" component={Search}></Route>
            <Route path="/search/users/:query" component={Search}></Route>
            <Route path="/search/photos/:query" component={Search}></Route>
            <Route path="/collections/:id" component={Collection}></Route>
            <Route path="/collections" component={Collections}></Route>
            <Route exact path="/photo/:id" component={Photo}></Route>
            <Route exact path="/" component={Home}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
