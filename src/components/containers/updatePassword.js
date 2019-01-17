/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import UpdatePasswordView from "../views/UpdatePasswordForm";
import ResetPasswordAPI from "../../api/resetPasswordAPI";

class UpdatePasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      passwordInputError: "",
      confirmPasswordInputError: "",
      passwordButton: true
    };
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    switch (name) {
      case "password":
        { if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value)) {
          this.setState({
            passwordButton: false,
            passwordInputError: ""
          });
        } else {
          this.setState({
            passwordButton: true,
            passwordInputError: "Password should be alphanumeric"
          });
        }
        }
        break;
      case "confirmPassword":
        { if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value)) {
          this.setState({
            passwordButton: false,
            confirmPasswordInputError: ""
          });
        } else {
          this.setState({
            passwordButton: true,
            confirmPasswordInputError: "Password should be alphanumeric"
          });
        }
        }
        break;
      default:
        break;
    }
  }

  onHandleSubmit = (event) => {
    const { password, confirmPassword } = this.state;
    event.preventDefault();
    if (password === confirmPassword) {
      this.setState({
        passwordButton: false,
        passwordInputError: "",
        confirmPasswordInputError: ""
      });
      const apiURL = `/api${window.location.pathname}`;
      // Call Home
      ResetPasswordAPI.resetPassword(apiURL, password);
    } else {
      this.setState({
        passwordButton: true,
        passwordInputError: "New password should match confirm password",
        confirmPasswordInputError: "Confirm password should match New password"
      });
    }
  };

  render() {
    return (
      <UpdatePasswordView
        state={this.state}
        onInputChange={this.onInputChange}
        onHandleSubmit={this.onHandleSubmit}
      />
    );
  }
}

export default UpdatePasswordPage;
