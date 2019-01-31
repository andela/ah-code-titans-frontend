import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Card, Image, Icon, Container
} from "semantic-ui-react";

const ViewUsers = (props) => {
  const { onUserNameClick, profile } = props;
  return (
    <Container textAlign="center">
      <Card>
        <Image src={profile.image} />
        <Card.Content>
          <Card.Header as={Link} to={`/profiles/${profile.username}`} onClick={(event => onUserNameClick(event, profile))}>{profile.username}</Card.Header>
          <Card.Meta>
            <Icon className="map marker alternate" />
            <span>{profile.location}</span>
          </Card.Meta>
          <Card.Description>{profile.bio}</Card.Description>
        </Card.Content>
      </Card>
    </Container>
  );
};

ViewUsers.propTypes = {
  profile: PropTypes.object.isRequired,
  onUserNameClick: PropTypes.func.isRequired
};

export default ViewUsers;
