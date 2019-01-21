/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import {
  Button, Label, Form, Container, Header, Icon, Dimmer, Loader, Divider
} from "semantic-ui-react";

const HandleError = ({ message }) => (
  <Label pointing inverted="true" basic color="red">
    {message}
  </Label>
);

HandleError.propTypes = {
  message: PropTypes.string.isRequired
};

const LoginComponent = ({
  onHandleChange, state, onSubmit, isFetching, parent
}) => (
  <div className="auth__login">
    <Dimmer active={isFetching}>
      <Loader size="large">Loading</Loader>
    </Dimmer>
    <Container textAlign="center" className="auth__content">
      <Header icon="sign-in" content="Sign in" />

      <Form onSubmit={onSubmit}>
        <div className="ui form field">
          <input
            autoComplete="off"
            placeholder="johndoe@gmail.com"
            type="text"
            name="email"
            value={state.email}
            onChange={onHandleChange}
            required
          />
          {state.emailError ? <HandleError message={state.emailError} /> : ""}
        </div>
        <div className="ui form field block">
          <input
            autoComplete="off"
            placeholder="Password"
            type="password"
            name="password"
            value={state.password}
            onChange={onHandleChange}
            required
          />
        </div>
        <div className="ui form field">
          <Button
            content="Sign in"
            secondary
            inverted
            disabled={state.disableLoginButton}
          />
        </div>

        <div className="links--create">
          {"Don't have an account?"}
          <a
            className="links__link"
            role="presentation"
            onClick={() => {
              parent.setView(3);
            }}
          >Create one
          </a>
        </div>

        <div className="links--forgot">
          <a
            className="links__link"
            role="presentation"
            onClick={() => {
              parent.setView(4);
            }}
          >Forgot password?
          </a>
        </div>

        <Divider horizontal><Header as="h4" inverted>or</Header></Divider>
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

LoginComponent.propTypes = {
  state: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  parent: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default LoginComponent;
