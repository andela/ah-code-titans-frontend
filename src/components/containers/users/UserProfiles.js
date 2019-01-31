/* eslint-disable max-len */
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import cuid from "cuid";
import ViewUsers from "../../views/users/ViewUsers";

const UserProfiles = (props) => {
  const { profiles, parent } = props;
  return (
    <div>
      {profiles.map(profile => <ViewUsers onUserNameClick={parent.onUserNameClick} key={cuid()} profile={profile} />)}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    profiles: state.profiles.users
  };
}

UserProfiles.propTypes = {
  profiles: PropTypes.array.isRequired,
  parent: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(UserProfiles);
