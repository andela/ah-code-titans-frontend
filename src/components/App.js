import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router";
import HomePage from "./containers/homePage";
import NotFoundPage from "./views/NotFoundPage";
import RegistrationPage from "./containers/registration";
import "../assets/style/main.scss";
import ResetRequestPage from "./containers/resetRequest";
import UpdatePasswordPage from "./containers/updatePassword";
import LoginPage from "./containers/login";
import SocialAuthenticationLanding from "./containers/socialAuthenticationLanding";
/* eslint-disable react/prefer-stateless-function */
class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/social/auth" component={SocialAuthenticationLanding} />
          <Route path="/request_reset" component={ResetRequestPage} />
          <Route path="/change_password" component={UpdatePasswordPage} />
          <Route path="/signup" component={RegistrationPage} />
          <Route path="/login" component={LoginPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default connect()(App);
