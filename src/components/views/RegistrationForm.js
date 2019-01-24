import React from "react";
import {
  Button, Form, Label, Container, Header, Dimmer, Loader, Icon, Divider
} from "semantic-ui-react";
import PropTypes from "prop-types";

const RegistrationFormComponent = ({
  onSubmit,
  onChange,
  onBlur,
  isFetching,
  emailError,
  parent,
  usernameError,
  passwordError
}) => (
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
            onBlur={onBlur}
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
            onBlur={onBlur}
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
            onBlur={onBlur}
            required
          />
          {passwordError ? <ErrorMessage id="err--username" message={passwordError} /> : ""}
        </div>
        <div className="ui form field">
          <Button content="Sign up" secondary inverted />
        </div>

        <Divider horizontal><Header as="h4" color="white">or</Header></Divider>
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
  onBlur: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  emailError: PropTypes.string.isRequired,
  usernameError: PropTypes.string.isRequired,
  passwordError: PropTypes.string.isRequired,
  parent: PropTypes.object.isRequired
};

export default RegistrationFormComponent;
