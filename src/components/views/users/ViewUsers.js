import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Card, Image, Grid, Header, Icon
} from "semantic-ui-react";

const ViewUsers = (props) => {
  const { onUserNameClick, profile } = props;
  return (
    <div>
      <div className="ui text container font">
        <Grid columns="equal">
          <Grid.Row className="profile__pa">
            <Grid.Column>
              <Header as={Link} to={`/profiles/${profile.username}`} onClick={(event => onUserNameClick(event, profile))}>
                {profile.username}
              </Header>
              <Card.Meta>
                <Icon className="map marker alternate" />
                <span>{profile.location}</span>
              </Card.Meta>
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

ViewUsers.propTypes = {
  profile: PropTypes.object.isRequired,
  onUserNameClick: PropTypes.func.isRequired
};

export default ViewUsers;
