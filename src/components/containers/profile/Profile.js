import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Header, Button, Grid, Image, Menu, Card
} from "semantic-ui-react";
import * as profileActions from "../../../actions/profileActions";
import ProfilePage from "../../views/ProfilePage";
import EditProfile from "./EditProfile";
import HeaderComponent from "../headers/index";

import "../../../assets/style/profile.scss";

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      activeItem: "profile"
    };

    this.toggleEditProfile = this.toggleEditProfile.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentDidMount = () => {
    const { actions, username } = this.props;
    actions.getProfile(username);
  };

  toggleEditProfile = editing => this.setState({ editing });

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { editing, activeItem } = this.state;
    const { getProfile, location } = this.props;

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
                      inverted
                      size="mini"
                      onClick={() => this.toggleEditProfile(true)}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Button
                      className="profile__editBtn"
                      primary
                      inverted
                      size="mini"
                      onClick={() => this.toggleEditProfile(false)}
                    >
                      close
                    </Button>
                  )}
                </Header>

                <Card.Description>{getProfile.bio}</Card.Description>
              </Grid.Column>
              <Grid.Column>
                <Image
                  className="profile__image"
                  circular
                  size="tiny"
                  src={getProfile.image}
                />
              </Grid.Column>
            </Grid.Row>
            <Menu attached="top" tabular>
              <Menu.Item
                name="profile"
                active={activeItem === "profile"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="Articles"
                active={activeItem === "Articles"}
                onClick={this.handleItemClick}
              />
            </Menu>
            {activeItem === "profile" ? (
              <Grid.Row>
                <Grid.Column>
                  {!editing ? (
                    <ProfilePage profile={getProfile} />
                  ) : (
                    <EditProfile parent={this} />
                  )}
                </Grid.Column>
              </Grid.Row>
            ) : (
              <Grid.Row>
                <Grid.Column>
                  <p>No articles</p>
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
  location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    getProfile: state.profileReducer.profile,
    username: state.loginReducer.auth.user.username
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(profileActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
