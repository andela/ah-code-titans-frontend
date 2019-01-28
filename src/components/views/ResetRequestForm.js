import React from "react";
import PropTypes from "prop-types";
import {
  Button, Form, Header, Loader, Dimmer, Container, Icon
} from "semantic-ui-react";

export const HandleErrors = (props) => {
  const { message } = props;
  return <div className="ui top pointing red basic label">{message}</div>;
};

HandleErrors.propTypes = {
  message: PropTypes.string.isRequired
};

const ResetView = (props) => {
  const {
    state, onHandleChange, onHandleSubmit, parent
  } = props;

  return (
    <div className="auth__requestReset">
      <Dimmer active={state.isLoading}>
        <Loader size="large">Loading</Loader>
      </Dimmer>
      <Container textAlign="center" className="auth__content">
        <Header icon="send" content="Request password reset" />
        <Form onSubmit={onHandleSubmit}>
          <Form.Field>
            <input
              autoComplete="off"
              type="text"
              name="email"
              id="email"
              value={state.email}
              placeholder="Enter your account email"
              onChange={onHandleChange}
            />
            {state.email !== "" && !state.emailIsValid ? <HandleErrors message="Email is invalid!" /> : ""}
          </Form.Field>
          <Form.Field>
            <Button className="requestReset__sendBtn" disabled={state.emailButtonDisable} color="green" inverted>
              Send request
            </Button>
          </Form.Field>
        </Form>
        <br />
        <Button
          id="backBtn"
          icon
          type="button"
          secondary
          inverted
          onClick={() => {
            parent.setView(2);
          }}
        >
          <Icon name="left arrow" />
            Back to Login
        </Button>
      </Container>

    </div>
  );
};

ResetView.propTypes = {
  state: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  onHandleSubmit: PropTypes.func.isRequired
};

export default ResetView;
