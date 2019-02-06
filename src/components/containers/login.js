import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as AuthenticationActions from "../../actions/authenticationActions";
import LoginComponent from "../views/LoginForm";

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
        if (value === "") {
          this.setState({
            emailError: ""
          });
        } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
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
    const { login, parent } = this.props;

    return (
      <LoginComponent
        state={this.state}
        onSubmit={this.onSubmit}
        onHandleChange={this.onHandleChange}
        isFetching={login.auth.isFetching}
        parent={parent}
      />
    );
  }
}

Login.propTypes = {
  actions: PropTypes.object.isRequired,
  login: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  login: state.login
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
