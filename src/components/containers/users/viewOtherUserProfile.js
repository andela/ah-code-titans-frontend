import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import HeaderComponent from "../headers/index";
import ViewUserProfile from "../../views/users/viewUserProfile";
import RetrieveUserProfilesAPI from "../../../api/fetchProfilesAPI";
import * as profileSearchActions from "../../../actions/searchedProfileActions";

class ViewOtherUserProfile extends Component {
  constructor(props) {
    const { author } = props;
    super(props);

    const follow = author === undefined ? false : author.following;
    this.state = { follow };
  }

  componentDidMount() {
    const { actions, match } = this.props;
    actions.author.fetchOtherProfile(match.params.username);
  }

  onFollowUnfollowClick = () => {
    const { follow } = this.state;
    const username = window.location.pathname;
    if (!follow) {
      const followUser = RetrieveUserProfilesAPI.followUser(username.slice(6));
      followUser.then(() => {
        this.setState({
          follow: true
        });
      });
    } else {
      const unFollowUser = RetrieveUserProfilesAPI.unFollowUser(username.slice(6));
      unFollowUser.then(() => {
        this.setState({
          follow: false
        });
      });
    }
  }

  render() {
    const { author, user, location } = this.props;
    const { follow } = this.state;

    if (author.username === undefined) return <div />;
    return (
      <div>
        <HeaderComponent location={location} />
        <ViewUserProfile
          profile={author}
          user={user}
          onFollowUnfollowClick={this.onFollowUnfollowClick}
          follow={follow}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  author: state.searchedProfile.user,
  article: state.article.singleArticle,
  user: state.login.auth
});

const mapDispatchToProps = dispatch => ({
  actions: {
    author: bindActionCreators(profileSearchActions, dispatch)
  }
});

ViewOtherUserProfile.propTypes = {
  actions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewOtherUserProfile);
