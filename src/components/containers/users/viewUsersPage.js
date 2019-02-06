import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import HeaderComponent from "../headers/index";
import ViewUserProfile from "../../views/users/viewUserProfile";
import RetrieveUserProfilesAPI from "../../../api/fetchProfilesAPI";
import UserProfiles from "./UserProfiles";
import * as listUsers from "../../../actions/listUsersActions";

class ViewUsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedUser: {},
      showProfile: false,
      follow: ""
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.listProfiles.profiles();
  }

  onUserNameClick = (event, data) => {
    this.setState({
      clickedUser: data,
      showProfile: true,
      follow: data.following
    });
  };

  onFollowUnfollowClick = () => {
    const { follow } = this.state;
    const username = window.location.pathname;
    if (!follow) {
      const followUser = RetrieveUserProfilesAPI.followUser(username.slice(10));
      followUser.then(() => {
        this.setState({
          follow: true
        });
      });
    } else {
      const unFollowUser = RetrieveUserProfilesAPI.unFollowUser(username.slice(10));
      unFollowUser.then(() => {
        this.setState({
          follow: false
        });
      });
    }
  }

  renderProfiles() {
    const { location } = this.props;
    return (
      <div>
        <HeaderComponent location={location} />
        <UserProfiles parent={this} />
      </div>
    );
  }

  renderProfile() {
    const { clickedUser, follow } = this.state;
    const { location, user } = this.props;
    return (
      <div>
        <HeaderComponent location={location} />
        <ViewUserProfile
          profile={clickedUser}
          follow={follow}
          onFollowUnfollowClick={this.onFollowUnfollowClick}
          user={user}
        />
      </div>
    );
  }

  render() {
    const { showProfile } = this.state;
    if (showProfile) {
      return this.renderProfile();
    }
    return this.renderProfiles();
  }
}
function mapStateToProps(state) {
  return {
    user: state.login.auth
  };
}

const mapDispatchToProps = dispatch => ({
  actions: {
    listProfiles: bindActionCreators(listUsers, dispatch)
  }
});

ViewUsersPage.propTypes = {
  actions: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewUsersPage);
