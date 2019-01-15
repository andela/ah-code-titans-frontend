import React from "react";
import PropTypes from "prop-types";
import {
  Button, Modal, Header, Form, Dimmer, Loader, Label
} from "semantic-ui-react";

const ErrorMessage = (props) => {
  const { id, message } = props;
  return (
    <Label pointing inverted="true" basic color="red" id={id}>
      {message}
    </Label>
  );
};

ErrorMessage.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

const FormComponent = ({
  onSubmit,
  onChange,
  onBlur,
  emailError,
  usernameError,
  passwordError
}) => (
  <Form onSubmit={onSubmit}>
    <div className="ui form field">
      <input
        autoComplete="off"
        placeholder="Username"
        type="text"
        name="username"
        id="username"
        onChange={onChange}
        onBlur={onBlur}
        required
      />
      {usernameError ? <ErrorMessage id="username-err" message={usernameError} /> : ""}
    </div>
    <div className="ui form field">
      <input
        autoComplete="off"
        placeholder="johndoe@gmail.com"
        type="text"
        name="email"
        id="email"
        onChange={onChange}
        onBlur={onBlur}
        required
      />
      {emailError ? <ErrorMessage id="email-err" message={emailError} /> : ""}
    </div>
    <div className="ui form field block">
      <input
        autoComplete="off"
        placeholder="Password"
        type="password"
        name="password"
        id="password"
        onChange={onChange}
        onBlur={onBlur}
        required
      />
      {passwordError ? <ErrorMessage id="password-err" message={passwordError} /> : ""}
    </div>
    <div className="ui form field">
      <Button content="Sign up" color="green" inverted />
    </div>
  </Form>
);

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

FormComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  emailError: PropTypes.string.isRequired,
  usernameError: PropTypes.string.isRequired,
  passwordError: PropTypes.string.isRequired
};
export default Registration;
