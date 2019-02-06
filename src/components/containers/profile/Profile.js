import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import {
  Header, Button, Grid, Image, Menu, Card, Icon
} from "semantic-ui-react";
import { readingStatsAsync, articleReadStats } from "../../../actions/readingStatsAction";
import * as profileActions from "../../../actions/profileActions";
import ProfilePage from "../../views/ProfilePage";
import EditProfile from "./EditProfile";
import HeaderComponent from "../headers/index";
import profileApi from "../../../api/profile";

import ReadStats from "../../views/ReadStats";
import "../../../assets/style/pages/profilePage.scss";

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      activeItem: "profile",
      myFollowers: [],
      following: []
    };

    this.toggleEditProfile = this.toggleEditProfile.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentDidMount() {
    const {
      actions, username, getReadingStats, getArticlesReadStats
    } = this.props;
    actions.getProfile(username);
    getArticlesReadStats();
    getReadingStats(username);

    profileApi.retrieveUserFollowers().then((response) => {
      this.setState({
        myFollowers: response.data
      });
    });
    profileApi.retrieveUsersFollowing().then((response) => {
      this.setState({
        following: response.data
      });
    });
  }

  toggleEditProfile = editing => this.setState({ editing });

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const {
      editing, activeItem, myFollowers, following
    } = this.state;
    const {
      getProfile,
      location,
      readArticleCount,
      isFetching,
      createdArticles,
      createdArticleCount
    } = this.props;

    return (
      <div>
        <HeaderComponent location={location} />
        <div className="ui text container font">
          <Grid columns="equal">
            <Grid.Row className="profile__pa">
              <Grid.Column>
                <Header>
                  {getProfile.username}
                  {!editing ? (
                    <Button
                      className="profile__editBtn"
                      primary
                      size="mini"
                      onClick={() => this.toggleEditProfile(true)}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Button
                      className="profile__editBtn"
                      primary
                      size="mini"
                      onClick={() => this.toggleEditProfile(false)}
                    >
                      close
                    </Button>
                  )}
                </Header>

                <Card.Description>{getProfile.bio}</Card.Description>
                <br />
                <div className="profile__follow" as={Link} to="/followers">
                  <div className="extra content">
                    <Icon className="users icon" />
                    {`${myFollowers.length} Followers`}
                  </div>
                </div>
                <div className="profile__follow" as={Link} to="/following">
                  <div className="extra content">
                    <Icon className="users icon" />
                    {`Following ${following.length}`}
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column>
                <Image className="profile__image" circular size="tiny" src={getProfile.image} />
              </Grid.Column>
            </Grid.Row>
            <Menu attached="top" tabular>
              <Menu.Item
                name="profile"
                active={activeItem === "profile"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="Stats"
                active={activeItem === "Stats"}
                onClick={this.handleItemClick}
              />
            </Menu>
            {activeItem === "profile" ? (
              <Grid.Row>
                <Grid.Column>
                  {!editing ? <ProfilePage profile={getProfile} /> : <EditProfile parent={this} />}
                </Grid.Column>
              </Grid.Row>
            ) : (
              <Grid.Row>
                <Grid.Column>
                  <ReadStats
                    readArticleCount={readArticleCount}
                    createdArticleCount={createdArticleCount}
                    createdArticles={createdArticles}
                    isFetching={isFetching}
                  />
                </Grid.Column>
              </Grid.Row>
            )}
          </Grid>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfile: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  readArticleCount: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  getReadingStats: PropTypes.func.isRequired,
  getArticlesReadStats: PropTypes.func.isRequired,
  createdArticles: PropTypes.array.isRequired,
  createdArticleCount: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    getProfile: state.profileReducer.profile,
    username: state.loginReducer.auth.user.username,
    readArticleCount: state.readingStats.read.count,
    createdArticleCount: state.readingStats.authored.count,
    createdArticles: state.readingStats.authored.results,
    isFetching: state.readingStats.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(profileActions, dispatch),
    getReadingStats: bindActionCreators(readingStatsAsync, dispatch),
    getArticlesReadStats: bindActionCreators(articleReadStats, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
