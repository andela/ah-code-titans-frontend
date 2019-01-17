import React from "react";
import PropTypes from "prop-types";
import {
  Form, Button, Container, Grid, Header
} from "semantic-ui-react";
import { HandleErrors } from "./ResetRequestForm";

const UpdatePasswordView = (props) => {
  const { state, onInputChange, onHandleSubmit } = props;

  return (
    <div className="ui page modals dimmer transition visible active">
      <Container className="center_password_form">
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={7}>
              <Header icon="pencil alternate" content="Change Password" />
              <Form onSubmit={onHandleSubmit}>
                <Form.Field>
                  <input
                    type="password"
                    name="password"
                    value={state.password}
                    placeholder="New Password"
                    onChange={onInputChange}
                    required
                  />
                  {state.passwordInputError ? <HandleErrors message={state.passwordInputError} /> : ""}
                </Form.Field>
                <Form.Field>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Re enter the password"
                    onChange={onInputChange}
                    required
                  />
                  {state.confirmPasswordInputError ? <HandleErrors message={state.confirmPasswordInputError} /> : ""}
                </Form.Field>
                <Button color="green" disabled={state.passwordButton} inverted type="submit">Change Password</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
