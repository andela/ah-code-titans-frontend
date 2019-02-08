import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import GeneralHeader from "./generalHeader";
import UserHeader from "./userHeader";

export function Header(props) {
  const { auth, location } = props;
  return (
    auth.authentication !== ""
      ? <UserHeader currentPath={location.pathname} />
      : <GeneralHeader currentPath={location.pathname} />
  );
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.login.auth
});

export default connect(mapStateToProps)(Header);
