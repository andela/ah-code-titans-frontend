import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as WelcomeAction from "./actions/WelcomeAction";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      welcomeMessage: "Welcome to Authors Haven Frontend"
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    const { welcomeMessage } = this.state;
  }

  render() {
    const { message } = this.props;

    return (
      <div className="App">
        <h1>{message}</h1>
      </div>
    );
  }
}

App.propTypes = {
  message: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownState) {
  return {
    message: state.welcomeReducer.message
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(WelcomeAction, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
