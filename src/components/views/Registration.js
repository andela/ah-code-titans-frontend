import React from "react";
import PropTypes from "prop-types";
import {
  Button, Modal, Header, Dimmer, Loader
} from "semantic-ui-react";

import FormComponent from "./RegistrationForm";

const Registration = (props) => {
  const {
    onSubmit,
    onChange,
    isFetching,
    onBlur,
    emailError,
    usernameError,
    passwordError
  } = props;

  return (
    <Modal trigger={<Button>Sign up</Button>} basic size="tiny" closeIcon>
      <Dimmer active={isFetching}>
        <Loader size="large">Loading</Loader>
      </Dimmer>
      <Header icon="add user" content="Create an account" />
      <Modal.Content>
        <FormComponent
          onSubmit={onSubmit}
          onChange={onChange}
          onBlur={onBlur}
          emailError={emailError}
          usernameError={usernameError}
          passwordError={passwordError}
          classNames="ui form"
        />
      </Modal.Content>
    </Modal>
  );
};

Registration.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  emailError: PropTypes.string.isRequired,
  usernameError: PropTypes.string.isRequired,
  passwordError: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default Registration;
