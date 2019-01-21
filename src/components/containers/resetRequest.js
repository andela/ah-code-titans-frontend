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
      emailIsValid: false,
      emailButtonDisable: true,
      isLoading: false
    };
  }

  onHandleChange = (event) => {
    this.setState({ email: event.target.value });
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({
      emailIsValid: emailRegex.test(event.target.value),
      emailButtonDisable: !emailRegex.test(event.target.value)
    });
  };

  onHandleSubmit = (event) => {
    const { email } = this.state;
    event.preventDefault();
    this.setState({
      isLoading: true
    });
    const linkSend = ResetPasswordAPI.sendLink(email);
    linkSend.then(() => {
      this.setState({
        isLoading: false,
        email: ""
      });
    });
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
