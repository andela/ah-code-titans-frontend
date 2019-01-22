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
      password: {
        value: "",
        valid: false
      },
      confirmPassword: {
        value: "",
        valid: false
      },
      passwordButton: true,
      isLoading: false
    };
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    this.setState({
      [name]: {
        value,
        valid: passwordRegex.test(value)
      },
      passwordButton: !passwordRegex.test(value)
    });
  }

  onHandleSubmit = (event) => {
    const { password, confirmPassword } = this.state;
    event.preventDefault();
    if (password.value === confirmPassword.value) {
      this.setState({
        passwordButton: false,
        isLoading: true
      });
      const apiURL = `/api${window.location.pathname}`;
      const changePassword = ResetPasswordAPI.resetPassword(apiURL, password.value);
      changePassword.then(() => {
        this.setState({
          isLoading: false
        });
      });
    } else {
      this.setState({
        passwordButton: true
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
