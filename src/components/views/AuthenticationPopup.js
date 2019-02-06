import React, { Component } from "react";
import {
  Button, Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as AuthenticationActions from "../../actions/authenticationActions";
import TransitionDisplay from "../containers/transitionDisplay";
import SocialAuthentication from "./SocialAuthenticationForm";
import RegistrationForm from "../containers/registration";
import Login from "../containers/login";
import ResetRequestForm from "../containers/resetRequest";

class AuthenticationPopup extends Component {
    static propTypes = {
      actions: PropTypes.object.isRequired,
      authPopup: PropTypes.object.isRequired
    };

    state = { active: false }

    componentDidUpdate() {
      const { authPopup, actions } = this.props;

      if (authPopup) {
        this.handleOpen();
        actions.auth.toggleForceAuthPopup();
      }
    }

    handleOpen = () => this.setState({ active: true })

    handleClose = () => this.setState({ active: false })

    render() {
      const { active } = this.state;

      return (
        <Modal
          trigger={<Button onClick={this.handleOpen} primary inverted>Login / Sign Up</Button>}
          open={active}
          onClose={this.handleClose}
          basic
          size="fullscreen"
          id="authPopup"
          closeIcon
        >
          <TransitionDisplay>
            <SocialAuthentication />
            <Login />
            <RegistrationForm />
            <ResetRequestForm />
          </TransitionDisplay>
        </Modal>
      );
    }
}

const mapStateToProps = state => ({
  authPopup: state.login.authPopup
});

const mapDispatchToProps = dispatch => ({
  actions: {
    auth: bindActionCreators(AuthenticationActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationPopup);
