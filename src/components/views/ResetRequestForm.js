import React from "react";
import PropTypes from "prop-types";
import {
  Button, Form, Modal, Header, Loader, Dimmer
} from "semantic-ui-react";

export const HandleErrors = (props) => {
  const { message } = props;
  return <div className="ui top pointing red basic label">{message}</div>;
};

HandleErrors.propTypes = {
  message: PropTypes.string.isRequired
};

const ResetView = (props) => {
  const { state, onHandleChange, onHandleSubmit } = props;

  return (
    <Modal trigger={<Button>Forgot Password?</Button>} basic size="mini" closeIcon closeOnDimmerClick={false}>
      <Dimmer active={state.isLoading}>
        <Loader size="large">Loading</Loader>
      </Dimmer>
      <Header icon="send" content="Request password reset" />
      <Modal.Content>
        <Form onSubmit={onHandleSubmit}>
          <Form.Field>
            <input
              autoComplete="off"
              type="text"
              name="email"
              value={state.email}
              placeholder="Enter your account email"
              onChange={onHandleChange}
            />
            {state.email !== "" && !state.emailIsValid ? <HandleErrors message="Email is invalid!" /> : "" }
          </Form.Field>
          <Form.Field>
            <Button id="btn-login" disabled={state.emailButtonDisable} color="green" inverted>
               Send request
            </Button>
          </Form.Field>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

ResetView.propTypes = {
  state: PropTypes.object.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  onHandleSubmit: PropTypes.func.isRequired
};
export default ResetView;
