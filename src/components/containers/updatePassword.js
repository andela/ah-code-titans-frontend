/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import UpdatePasswordView from "../views/UpdatePasswordForm";
import ResetPasswordAPI from "../../api/resetPasswordAPI";

import "../../assets/style/pages/updatePasswordPage.scss";

class UpdatePasswordPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

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
    const { history } = this.props;

    event.preventDefault();
    if (password.value === confirmPassword.value) {
      this.setState({
        passwordButton: false,
        isLoading: true
      });
      const apiURL = `/api${window.location.pathname}`;
      const changePassword = ResetPasswordAPI.resetPassword(apiURL, password.value, history);
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

export default withRouter(UpdatePasswordPage);
