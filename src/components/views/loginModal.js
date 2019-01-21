import React from "react";
import PropTypes from "prop-types";
import {
  Button, Modal, Header, Label, Form, Dimmer, Loader
} from "semantic-ui-react";
import Registration from "./Registration";

const HandleError = ({ message }) => (
  <Label pointing inverted="true" basic color="red">
    {message}
  </Label>
);

HandleError.propTypes = {
  message: PropTypes.string.isRequired
};

const LoginComponent = ({ onHandleChange, state, onSubmit }) => (
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
    <div className="btn">
      <Button
        id="btn-login"
        content="Sign in"
        color="green"
        inverted
        disabled={state.disableLoginButton}
      />
    </div>
  </Form>
);

LoginComponent.propTypes = {
  state: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onHandleChange: PropTypes.func.isRequired
};

const LoginModal = (props) => {
  const {
    state, onHandleChange, onSubmit, isFetching
  } = props;
  return (
    <Modal
      trigger={<Button>Sign in</Button>}
      basic
      size="mini"
      closeIcon
      closeOnDimmerClick={false}
    >
      <div id="signup-modal">
        <Dimmer active={isFetching}>
          <Loader size="large">Loading</Loader>
        </Dimmer>
        <Header icon="sign-in" content="Sign in" />
        <Modal.Content>
          <LoginComponent
            onSubmit={onSubmit}
            state={state}
            onHandleChange={onHandleChange}
            classNames="ui form"
          />
          <Registration />
        </Modal.Content>
      </div>
    </Modal>
  );
};
LoginModal.propTypes = {
  onHandleChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default LoginModal;
