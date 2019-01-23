import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router";
import HomePage from "./containers/homePage";
import NotFoundPage from "./views/NotFoundPage";
import RegistrationPage from "./containers/registration";
import "../assets/style/main.scss";
import ResetRequestPage from "./containers/resetRequest";
import UpdatePasswordPage from "./containers/updatePassword";
import LoginPage from "./containers/login";
import SocialAuthenticationLanding from "./containers/socialAuthenticationLanding";
import ProfilePage from "./containers/profile/Profile";
// import HeaderComponent from "./containers/headers/index"

import ArticleContainer from "./containers/articlesContainer";
import SingleArticle from "./views/articles/SingleArticle";
import "../assets/style/articles/style.scss";
import SearchListPage from "./views/SearchListPage";
import SingleArticle from "./views/SingleArticle";
/* eslint-disable react/prefer-stateless-function */
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
        {/* <HeaderComponent location={location} /> */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/social/auth" component={SocialAuthenticationLanding} />
          <Route path="/request_reset" component={ResetRequestPage} />
          <Route path="/change_password" component={UpdatePasswordPage} />
          <Route path="/signup" component={RegistrationPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" render={props => this.checkIfAuthenticated(ProfilePage, props)} />
          <Route path="/create_article" component={ArticleContainer} />
          <Route path="/tagsearch" component={SearchListPage} />
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
