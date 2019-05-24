import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom' ;
import  { connect } from 'react-redux';
import Header from './components/Header';
import Home from './components/pages/Home';
import Collection from './components/pages/collections/Collection';
import Collections from './components/pages/collections/Collections';
import Photo from './components/pages/Photo';
import Search from './components/pages/Search';
import { unsplash, getQueryStringValue, history } from './utils/Utils';
import { AuthenticateUser, LogoutUser } from './redux/actions/AuthenticateUser'
import { toJson } from "unsplash-js";
import SearchUsers from './components/pages/SearchUsers';
import SearchCollections from './components/pages/SearchCollections';
import Profile from './components/pages/Profile';
import UserCollections from './components/pages/profile/UserCollections';
import UserLikes from './components/pages/profile/UserLikes';


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

  componentDidUpdate(prevProps) {
    if(window.location.href.toString().includes('?code') && !prevProps.auth.isAuthenticated && this.props.auth.isAuthenticated) {
      history.push('/');
    }
  }
  logout = () => {
    this.props.LogoutUser();
  }
  render() {
    return (
      <>
        {/* {window.location.href.toString().includes('?code') && this.props.auth.isAuthenticated && <Redirect to="/" />} */}
        <Header logout={this.logout} isAuthenticated={this.props.auth.isAuthenticated} />
        <Switch>
            <Route path="/search/collections/:query" component={SearchCollections}></Route>
            <Route path="/search/users/:query" component={SearchUsers}></Route>
            <Route path="/search/photos/:query" component={Search}></Route>
            <Route path="/collections/:id" component={Collection}></Route>
            <Route path="/collections" component={Collections}></Route>
            <Route exact path="/photo/:id" component={Photo}></Route>
            <Route exact path="/:username" component={Profile}></Route>
            <Route path="/:username/likes" component={UserLikes}></Route>
            <Route path="/:username/collections" component={UserCollections}></Route>
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