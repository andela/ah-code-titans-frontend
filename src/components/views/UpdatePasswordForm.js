import React from "react";
import PropTypes from "prop-types";
import {
  Form, Button, Container, Grid, Header, Dimmer, Loader
} from "semantic-ui-react";
import { HandleErrors } from "./ResetRequestForm";

const UpdatePasswordView = (props) => {
  const { state, onInputChange, onHandleSubmit } = props;

  return (
    <div className="ui page modals dimmer transition visible active">
      <Container className="passwordForm">
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={7}>
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
                  {state.password.value !== "" && !state.password.valid ? <HandleErrors message="Password should be alphanumeric" /> : ""}
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
                  {state.confirmPassword.value !== "" && !state.confirmPassword.value ? <HandleErrors message="Password should be alphanumeric" /> : ""}
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
