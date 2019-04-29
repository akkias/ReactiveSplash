import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom' ;
import  { connect } from 'react-redux';
import Header from './components/Header';
import Home from './components/pages/Home';
import Collection from './components/pages/Collection';
import Collections from './components/pages/Collections';
import Photo from './components/pages/Photo';
import Search from './components/pages/Search';
import { unsplash, getQueryStringValue } from './utils/Utils';
import { AuthenticateUser, LogoutUser } from './redux/actions/AuthenticateUser'
import { toJson } from "unsplash-js";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    }
  }
  componentDidMount() {
    if(!this.props.auth.isAuthenticated && window.location.href.toString().includes('?code')) {
      let token = getQueryStringValue('code');
      unsplash.auth.userAuthentication(token)
      .then(toJson)
      .then(json => {
          unsplash.auth.setBearerToken(json.access_token);
          this.props.AuthenticateUser(json.access_token);
      });
    }
  }
  logout = () => {
    this.props.LogoutUser();
  }
  render() {
    return (
      <>
        {window.location.href.toString().includes('?code') && this.props.auth.isAuthenticated && <Redirect to="/" />}
        <Header logout={() => this.logout()} isAuthenticated={this.props.auth.isAuthenticated} />
        <Switch>
            <Route path="/search/collections/:query" component={Search}></Route>
            <Route path="/search/users/:query" component={Search}></Route>
            <Route path="/search/photos/:query" component={Search}></Route>
            <Route path="/collections/:id" component={Collection}></Route>
            <Route path="/collections" component={Collections}></Route>
            <Route exact path="/photo/:id" component={Photo}></Route>
            <Route exact path="/" component={Home}></Route>
        </Switch>
      </>
    );
  }
}


const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  AuthenticateUser: (token) => dispatch(AuthenticateUser(token)),
  LogoutUser: () => dispatch(LogoutUser())
})
export default connect(mapStateToProps, mapDispatchToProps)(App);