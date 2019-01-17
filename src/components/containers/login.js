import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as AuthenticationActions from "../../actions/authenticationActions";
import LoginModal from "../views/loginModal";

/* eslint-disable react/no-unused-state */
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: "",
      disableLoginButton: true
    };

    this.onHandleChange = this.onHandleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onHandleChange = (event) => {
    const { target } = event;
    const value = target.type === "email" ? target.value : target.value;
    const { name } = target;

    this.setState({
      [name]: value
    });
    switch (name) {
      case "email":
        /* eslint-disable no-useless-escape */
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          this.setState({
            emailError: ""
          });
        } else {
          this.setState({
            emailError: "please input a valid email"
          });
        }
        break;
      case "password":
        if (value) {
          this.setState({
            disableLoginButton: false
          });
        } else {
          this.setState({
            disableLoginButton: true
          });
        }
        break;
      default:
        break;
    }
  };

  onSubmit = () => {
    const { email, password } = this.state;
    const { actions } = this.props;
    actions.auth.login({ email, password });
  };

  render() {
    return (
      <LoginModal
        state={this.state}
        onSubmit={this.onSubmit}
        onHandleChange={this.onHandleChange}
      />
    );
  }
}

Login.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  login: state.loginReducer.login
});

const mapDispatchToProps = dispatch => ({
  actions: {
    auth: bindActionCreators(AuthenticationActions, dispatch)
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
