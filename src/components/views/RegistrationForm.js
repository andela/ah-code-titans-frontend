import React from "react";
import {
  Button,
  Form,
  Label,
  Container,
  Header,
  Dimmer,
  Loader,
  Icon,
  Divider
} from "semantic-ui-react";
import PropTypes from "prop-types";

const RegistrationFormComponent = ({
  onSubmit,
  onChange,
  isFetching,
  emailError,
  parent,
  usernameError,
  passwordError,
  onConfirmChange,
  confirmPasswordError,
  isFormValid
}) => {
  const viewPassword = (e) => {
    if (document.getElementById("password").type === "password") {
      document.getElementById("password").type = "text";
      document.getElementById("confirm-password").type = "text";
      e.target.textContent = "Hide";
    } else {
      document.getElementById("password").type = "password";
      document.getElementById("confirm-password").type = "password";
      e.target.textContent = "Show";
    }
  };
  /* eslint-disable jsx-a11y/click-events-have-key-events */
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  return (
    <div className="auth__signup">
      <Dimmer active={isFetching}>
        <Loader size="large">Loading</Loader>
      </Dimmer>
      <Container textAlign="center" className="auth__content">
        <Header icon="add user" content="Create an account" />
        <Form onSubmit={onSubmit}>
          <div className="ui form field">
            <input
              autoComplete="off"
              placeholder="Username"
              type="text"
              name="username"
              id="username"
              onChange={onChange}
              required
            />
            {usernameError ? <ErrorMessage id="err--username" message={usernameError} /> : ""}
          </div>
          <div className="ui form field">
            <input
              autoComplete="off"
              placeholder="johndoe@gmail.com"
              type="text"
              name="email"
              id="email"
              onChange={onChange}
              required
            />
            {emailError ? <ErrorMessage id="err--email" message={emailError} /> : ""}
          </div>
          <div className="ui form field block">
            <input
              autoComplete="off"
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              onChange={onChange}
              required
            />
            <span id="password__show" onClick={e => viewPassword(e)}>
              Show
            </span>
            {passwordError ? <ErrorMessage id="err--username" message={passwordError} /> : ""}
          </div>
          <div className="ui form field">
            <input
              autoComplete="off"
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              id="confirm-password"
              onChange={onConfirmChange}
              required
            />
            {confirmPasswordError ? (
              <ErrorMessage id="password-err" message={confirmPasswordError} />
            ) : (
              ""
            )}
          </div>
          <div className="ui form field">
            <Button content="Sign up" secondary disabled={!isFormValid()} inverted />
          </div>

          <Divider horizontal>
            <Header as="h4">or</Header>
          </Divider>
          <br />

          <Button
            id="backBtn"
            icon
            type="button"
            secondary
            inverted
            onClick={() => {
              parent.setView(1);
            }}
          >
            <Icon name="left arrow" />
            Back to Social Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

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

RegistrationFormComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  emailError: PropTypes.string.isRequired,
  usernameError: PropTypes.string.isRequired,
  passwordError: PropTypes.string.isRequired,
  parent: PropTypes.object.isRequired,
  onConfirmChange: PropTypes.func.isRequired,
  confirmPasswordError: PropTypes.string.isRequired,
  isFormValid: PropTypes.func.isRequired
};

export default RegistrationFormComponent;
