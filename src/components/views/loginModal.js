import React from "react";
import PropTypes from "prop-types";
import {
  Button, Modal, Header, Label, Form, ModalActions
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
    <div className="ui form field">
      <Button content="Sign in" color="green" inverted disabled={state.disableLoginButton} />
    </div>
  </Form>
);

LoginComponent.propTypes = {
  state: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onHandleChange: PropTypes.func.isRequired
};

const LoginModal = (props) => {
  const { state, onHandleChange, onSubmit } = props;
  return (
    <Modal trigger={<Button>Sign in</Button>} basic size="tiny" closeIcon>
      <Header icon="sign-in" content="Sign in" />
      <Modal.Content>
        <LoginComponent
          onSubmit={onSubmit}
          state={state}
          onHandleChange={onHandleChange}
          classNames="ui form"
        />
      </Modal.Content>
      <ModalActions>
        <Registration />
      </ModalActions>
    </Modal>
  );
};
LoginModal.propTypes = {
  onHandleChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default LoginModal;
