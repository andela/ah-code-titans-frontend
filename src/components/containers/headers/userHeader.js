import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserHeaderView from "../../views/headers/UserHeader";

function UserHeader(props) {
  const { currentPath, auth } = props;
  return (
    <UserHeaderView currentPath={currentPath} auth={auth} />
  );
}

UserHeader.propTypes = {
  auth: PropTypes.object.isRequired,
  currentPath: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.loginReducer.auth
});

export default connect(mapStateToProps)(UserHeader);
