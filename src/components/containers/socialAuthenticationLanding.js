import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SocialAuthErrorPage from "../views/SocialAuthErrorPage";
import SocialAuthSuccessPage from "../views/SocialAuthSuccessPage";

import * as UserSettingsActions from "../../actions/userSettingsActions";
import * as AuthenticationActions from "../../actions/authenticationActions";

import "../../assets/style/pages/socialAuthenticationPage.scss";

// eslint-disable-next-line react/prefer-stateless-function
export class SocialAuthentication extends Component {
  constructor(props) {
    super(props);

    const { location } = this.props;
    const params = new URLSearchParams(location.search);

    const username = params.get("username");
    const success = params.get("success");
    const newUser = params.get("new_user");
    const accessToken = params.get("t1");
    const refreshToken = params.get("t2");

    let view = 1;

    if (success === "true" && username !== "" && newUser !== "false") {
      view = 2;
    } else if (success === "false") {
      view = 3;
    }

    this.state = {
      view,
      username,
      success,
      accessToken,
      refreshToken
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    const {
      username,
      success,
      accessToken,
      refreshToken
    } = this.state;

    if (success === "true") {
      actions.auth.loginBySocial({
        username,
        token: accessToken,
        refresh_token: refreshToken
      });
    }
  }

  setView() {
    const { view } = this.state;
    const { settings } = this.props;

    switch (view) {
      case 1: return !settings.walkThrough
        ? <Redirect to="/" />
        : <SocialAuthSuccessPage parent={this} />;
      case 2: return <SocialAuthSuccessPage parent={this} />;
      case 3: return (<SocialAuthErrorPage />);
      default: return (<div />);
    }
  }

  render() {
    return (
      this.setView()
    );
  }
}

SocialAuthentication.propTypes = {
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    settings: state.userSettings.settings
  };
}

const mapDispatchToProps = dispatch => ({
  actions: {
    auth: bindActionCreators(AuthenticationActions, dispatch),
    settings: bindActionCreators(UserSettingsActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SocialAuthentication);
