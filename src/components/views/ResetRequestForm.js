import React from "react";
import PropTypes from "prop-types";
import {
  Button, Form, Modal, Header
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
    <Modal trigger={<Button>Basic Modal</Button>} basic size="tiny" closeIcon>
      <Header icon="send" content="Send reset link" />
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
            {state.emailInputError ? <HandleErrors message={state.emailInputError} /> : ""}
          </Form.Field>
          <Form.Field>
            <Button
              className="ui teal button send_reset_link"
              content="Send request"
              type="Submit"
              disabled={state.emailButtonDisable}
            />
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
