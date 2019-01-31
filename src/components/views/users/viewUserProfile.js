/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import {
  Grid, Header, Image, Button, Card
} from "semantic-ui-react";
import PropTypes from "prop-types";
import ProfilePage from "../ProfilePage";

const ViewUserProfile = (props) => {
  const {
    profile, follow, onFollowUnfollowClick, user
  } = props;
  return (
    <div>
      <div className="ui text container font">
        <Grid columns="equal">
          <Grid.Row className="profile__pa">
            <Grid.Column>
              <Button circular color="twitter" icon="backward" content="More Profiles" href="/profiles" />
              <Header>
                {profile.username}
              </Header>

              <Card.Description>{profile.bio}</Card.Description>
              <br />
              <br />
              {user.user.username === profile.username ? <div />
                : <div>
                  {follow ?
                    <Button
                      className="profile__editBtn"
                      size="mini"
                      onClick={onFollowUnfollowClick}
                    >
                  Unfollow
                    </Button>
                    :  <Button
                      className="profile__editBtn"
                      size="mini"
                      onClick={onFollowUnfollowClick}
                    >
                  Follow
                    </Button>
                  }
                </div>
              }
            </Grid.Column>
            <Grid.Column>
              <Image
                className="profile__image"
                circular
                size="tiny"
                src={profile.image}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <br />
            <ProfilePage profile={profile} />
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

ViewUserProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  follow: PropTypes.bool.isRequired,
  onFollowUnfollowClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default ViewUserProfile;
