import React from "react";
import PropTypes from "prop-types";
import {
  Form, Button, Container, Header, Dimmer, Loader
} from "semantic-ui-react";
import { HandleErrors } from "./ResetRequestForm";

const UpdatePasswordView = (props) => {
  const { state, onInputChange, onHandleSubmit } = props;

  return (
    <div className="auth__requestReset">
      <Container textAlign="center" className="auth__content">
        <Dimmer active={state.isLoading}>
          <Loader size="large">Loading</Loader>
        </Dimmer>
        <Header icon="pencil alternate" content="Change Password" />
        <Form onSubmit={onHandleSubmit}>
          <Form.Field>
            <input
              type="password"
              name="password"
              value={state.password.value}
              placeholder="New Password"
              onChange={onInputChange}
              required
            />
            {state.password.value !== "" && !state.password.valid ? <HandleErrors message="Password should be alphanumeric and match confirm password" /> : ""}
          </Form.Field>
          <Form.Field>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re enter the password"
              value={state.confirmPassword.value}
              onChange={onInputChange}
              required
            />
            {state.confirmPassword.value !== "" && !state.confirmPassword.valid ? <HandleErrors message="Password should be alphanumeric and match password above" /> : ""}
          </Form.Field>
          <Button
            className="passwordFrom__sendBtn"
            secondary
            disabled={state.passwordButton}
            inverted
            type="submit"
          >Change Password
          </Button>
        </Form>
      </Container>
    </div>
  );
};

UpdatePasswordView.propTypes = {
  state: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onHandleSubmit: PropTypes.func.isRequired
};

export default UpdatePasswordView;
