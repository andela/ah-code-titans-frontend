import React, { Component } from "react";
import {
  Button, Modal
} from "semantic-ui-react";

import TransitionDisplay from "../containers/transitionDisplay";
import SocialAuthentication from "./SocialAuthenticationForm";
import RegistrationForm from "../containers/registration";
import Login from "../containers/login";
import ResetRequestForm from "../containers/resetRequest";

export default class AuthenticationPopup extends Component {
    state = { active: false }

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
