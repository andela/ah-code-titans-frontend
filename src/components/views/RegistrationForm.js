import React from "react";
import { Button, Form, Label } from "semantic-ui-react";
import PropTypes from "prop-types";

const FormComponent = ({
  onSubmit,
  onChange,
  onBlur,
  emailError,
  usernameError,
  passwordError
}) => (
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
      {usernameError ? <ErrorMessage id="username-err" message={usernameError} /> : ""}
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
      {emailError ? <ErrorMessage id="email-err" message={emailError} /> : ""}
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
      {passwordError ? <ErrorMessage id="password-err" message={passwordError} /> : ""}
    </div>
    <div className="ui form field">
      <Button content="Sign up" color="green" inverted />
    </div>
  </Form>
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

FormComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  emailError: PropTypes.string.isRequired,
  usernameError: PropTypes.string.isRequired,
  passwordError: PropTypes.string.isRequired
};

export default FormComponent;
