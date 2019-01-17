/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import ResetView from "../views/ResetRequestForm";
import ResetPasswordAPI from "../../api/resetPasswordAPI";

class ResetRequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailInputError: "",
      emailButtonDisable: true
    };
  }

  onHandleChange = (event) => {
    this.setState({
      email: event.target.value
    });
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)
    ) {
      this.setState({
        emailInputError: "",
        emailButtonDisable: false
      });
    } else {
      this.setState({
        emailInputError: "Invalid Email address",
        emailButtonDisable: true
      });
    }
  };

  onHandleSubmit = (event) => {
    const { email } = this.state;
    event.preventDefault();
    ResetPasswordAPI.sendLink(email);
  };

  render() {
    return (
      <ResetView
        state={this.state}
        onHandleChange={this.onHandleChange}
        onHandleSubmit={this.onHandleSubmit}
      />
    );
  }
}

export default ResetRequestPage;
