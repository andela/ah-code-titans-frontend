import React from "react";
import { Link } from "react-router-dom";
import {
  Card, Image, Grid, Header
} from "semantic-ui-react";
import PropTypes from "prop-types";

const FollowersFollowingUsers = (props) => {
  const { profile } = props;
  return (
    <div>
      <div className="ui text container font">
        <Grid columns="equal">
          <Grid.Row className="profile__pa">
            <Grid.Column>
              <Header as={Link} to={`/user/${profile.username}`}>
                {profile.username}
              </Header>
              <Card.Description>{profile.bio}</Card.Description>
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
        </Grid>
      </div>
    </div>
  );
};

FollowersFollowingUsers.propTypes = {
  profile: PropTypes.object.isRequired
};

export default FollowersFollowingUsers;
