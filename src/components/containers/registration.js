import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import Registration from "../views/Registration";
import registrationAsync from "../../actions/registrationActions";

class RegistrationContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      emailError: "",
      usernameError: "",
      passwordError: "",
      buttonActive: false
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
  }

  handleBlur(e) {
    const { name, value } = e.target;
    if (value !== "") {
      switch (name) {
        case "username":
          /* eslint-disable no-case-declarations */
          /* eslint-disable react/no-access-state-in-setstate */
          /* eslint-disable no-useless-escape */
          const usernameReg = /^[a-zA-Z][a-zA-Z0-9]{3,}$/;

          if (value.match(usernameReg) === null) {
            this.setState({
              ...this.state,
              usernameError:
                "Enter a username with more than 4 characters. Start with a letter and no spaces in between the characters."
            });
          } else {
            this.setState({
              ...this.state,
              usernameError: ""
            });
          }
          break;
        case "email":
          const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (value.match(emailReg) === null) {
            this.setState({
              ...this.state,
              emailError: "Invalid email"
            });
          } else {
            this.setState({
              ...this.state,
              emailError: ""
            });
          }
          break;
        case "password":
          const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
          if (value.match(passReg) === null) {
            this.setState({
              ...this.state,
              passwordError:
                "Password must be more than 7 characters and at least 1 lowercase 1 uppercase 1 number, 1 special character"
            });
          } else {
            this.setState({
              ...this.state,
              passwordError: ""
            });
          }
          break;
        default:
          break;
      }
    }
  }

  render() {
    const { isFetching } = this.props;
    const { emailError, usernameError, passwordError } = this.state;
    return (
      <div>
        <Registration
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          isFetching={isFetching}
          emailError={emailError}
          usernameError={usernameError}
          passwordError={passwordError}
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
  isFetching: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationContainer);
