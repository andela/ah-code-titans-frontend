import React from "react";
import PropTypes from "prop-types";
import { Grid, Table, Header } from "semantic-ui-react";

const ProfilePage = ({ profile }) => (
  <Grid>
    <Grid.Row className="profile__margin-left">
      <Header className="profile__info">Personal Information</Header>
      <Table basic="very">
        <Table.Body>
          <Table.Row />
          <Table.Row>
            <Table.Cell>Location</Table.Cell>
            <Table.Cell>{profile.location}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Company</Table.Cell>
            <Table.Cell>{profile.company}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Phone</Table.Cell>
            <Table.Cell>{profile.phone}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Website</Table.Cell>
            <Table.Cell>{profile.website}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Grid.Row>
  </Grid>
);

ProfilePage.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfilePage;
