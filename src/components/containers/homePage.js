import React from "react";
import PropTypes from "prop-types";

import HeaderComponent from "./headers/index";
import HomePageView from "../views/HomePage";

import "../../assets/style/pages/homepage.scss";

const HomePage = (props) => {
  const { location } = props;
  return (
    <div>
      <HeaderComponent location={location} />
      <HomePageView />
    </div>
  );
};

HomePage.propTypes = {
  location: PropTypes.object.isRequired
};

export default HomePage;
