import React from "react";
import { Switch, Route } from "react-router";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HomePage from "./containers/homePage";
import NotFoundPage from "./views/NotFoundPage";
import UpdatePasswordPage from "./containers/updatePassword";
import SocialAuthenticationLanding from "./containers/socialAuthenticationLanding";
import ProfilePage from "./containers/profile/Profile";
import ArticleContainer from "./containers/articlesContainer";
import SingleArticle from "./views/articles/SingleArticle";
import DiscoverPage from "./containers/discoverPage";

import "../assets/style/main.scss";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.checkIfAuthenticated = this.checkIfAuthenticated.bind(this);
  }

  checkIfAuthenticated(Component, props) {
    const { auth } = this.props;
    return auth.authentication !== ""
      ? <Component {...props} />
      : <Redirect to="/" />;
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/social/auth" component={SocialAuthenticationLanding} />
          <Route path="/change_password" component={UpdatePasswordPage} />
          <Route path="/profile" render={props => this.checkIfAuthenticated(ProfilePage, props)} />
          <Route path="/create_article" component={ArticleContainer} />
          <Route path="/discover" component={DiscoverPage} />
          <Route path="/article/:slug" component={SingleArticle} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.loginReducer.auth
});

export default connect(mapStateToProps)(App);
