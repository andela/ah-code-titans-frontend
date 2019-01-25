import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import Registration from "../views/RegistrationForm";
import registrationAsync from "../../actions/registrationActions";

class RegistrationContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.resetState = this.resetState.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.fieldValidation = this.fieldValidation.bind(this);
    this.state = {
      emailError: "",
      usernameError: "",
      passwordError: "",
      confirmPasswordError: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch({ user: this.state });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    this.fieldValidation(e);
  }

  handleConfirmPassword(e) {
    const { password } = this.state;
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    if (value === "") {
      this.setState({
        confirmPasswordError: ""
      });
    } else if (password !== value) {
      this.setState({
        confirmPasswordError: "Password do no match."
      });
    } else {
      this.setState({
        confirmPasswordError: ""
      });
    }
  }

  isFormValid() {
    const {
      emailError,
      usernameError,
      passwordError,
      confirmPasswordError,
      password,
      confirmPassword,
      email,
      username
    } = this.state;

    return (
      emailError === ""
      && usernameError === ""
      && passwordError === ""
      && confirmPasswordError === ""
      && password !== ""
      && confirmPassword !== ""
      && username !== ""
      && email !== ""
    );
  }

  fieldValidation(e) {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        /* eslint-disable no-case-declarations */
        /* eslint-disable react/no-access-state-in-setstate */
        /* eslint-disable no-useless-escape */
        const usernameReg = /^[a-zA-Z][a-zA-Z0-9]{3,}$/;

        if (value === "") {
          this.setState({
            usernameError: ""
          });
        } else if (value.match(usernameReg) === null) {
          this.setState({
            usernameError:
              "Enter a username with more than 3 characters. Start with a letter and no spaces in between the characters."
          });
        } else {
          this.setState({
            usernameError: ""
          });
        }
        break;
      case "email":
        const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value === "") {
          this.setState({
            emailError: ""
          });
        } else if (value.match(emailReg) === null) {
          this.setState({
            emailError: "Invalid email address"
          });
        } else {
          this.setState({
            emailError: ""
          });
        }
        break;
      case "password":
        const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (value === "") {
          this.setState({
            passwordError: ""
          });
        } else if (value.match(passReg) === null) {
          this.setState({
            passwordError:
              "Password must be more than 7 characters and at least 1 lowercase 1 uppercase 1 number, 1 special character"
          });
        } else {
          this.setState({
            passwordError: ""
          });
        }
        break;
      default:
        break;
    }
  }

  render() {
    const { isFetching, parent } = this.props;
    const {
      emailError,
      usernameError,
      passwordError,
      confirmPasswordError
    } = this.state;
    return (
      <div>
        <Registration
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          onConfirmChange={this.handleConfirmPassword}
          isFetching={isFetching}
          emailError={emailError}
          usernameError={usernameError}
          passwordError={passwordError}
          confirmPasswordError={confirmPasswordError}
          isFormValid={this.isFormValid}
          parent={parent}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.registrationReducer.isFetching,
  response: state.registrationReducer.response,
  errors: state.registrationReducer.errors
});

const mapDispatchToProps = dispatch => ({
  dispatch: bindActionCreators(registrationAsync, dispatch)
});

RegistrationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  parent: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationContainer);
