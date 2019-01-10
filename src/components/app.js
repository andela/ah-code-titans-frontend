import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Switch, Route } from "react-router";
import * as WelcomeAction from "../actions/welcomeAction";
import HomePage from "./containers/homePage";
import NotFoundPage from "./views/NotFoundPage";
import ArticleAPI from "../api/articleAPI";

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
    actions.welcomeAction(welcomeMessage);
    ArticleAPI.getArticles();
  }

  render() {
    const { message } = this.props;

    return (
      <div>
        <h1>{message}</h1>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  message: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    welcomeAction: PropTypes.func.isRequired
  }).isRequired
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
