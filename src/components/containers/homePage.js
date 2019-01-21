import React, { Component } from "react";
import PropTypes from "prop-types";

import HeaderComponent from "./headers/index";
import HomePageView from "../views/HomePage";

// eslint-disable-next-line react/prefer-stateless-function
class HomePage extends Component {
  render() {
    const { location } = this.props;
    return (
      <div>
        <HeaderComponent location={location} />
        <HomePageView />
      </div>
    );
  }
}

HomePage.propTypes = {
  location: PropTypes.object.isRequired
};

export default HomePage;
