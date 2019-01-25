import React from "react";
import PropTypes from "prop-types";
import {
  Menu, Container, Input, Image, Header, Responsive, Popup, Divider
} from "semantic-ui-react";

import DefaultUserPic from "../../../assets/img/person.png";

function UserPopup() {
  return (
    <Menu vertical secondary>

      <Menu.Item name="createArticle">
        <a href="/create_article">
          <Header as="h3">Create an Article</Header>
        </a>
      </Menu.Item>

      <Divider horizontal />

      <Menu.Item name="profile">
        <a href="/profile">
          <Header as="h3">Profile</Header>
        </a>
      </Menu.Item>

      <Menu.Item name="profile">
        <Header as="h3">Log out</Header>
      </Menu.Item>
    </Menu>
  );
}

export default function UserHeader(props) {
  const { auth } = props;

  return (
    <Menu borderless main="true" className="header--user">
      <Container>
        <Menu.Item><Header>Authors Haven</Header></Menu.Item>

        <Menu.Menu position="right" className="secondary">

          <Responsive as={Menu.Menu} minWidth={Responsive.onlyTablet.minWidth}>
            <Menu.Item className="item">
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
          </Responsive>

          <Menu.Item position="right" className="floated user">
            <span className="header__user__name">{auth.user.username}</span>

            <Popup
              trigger={<Image className="header__user__image" src={DefaultUserPic} avatar />}
              content={<UserPopup />}
              on="click"
              position="top right"
            />
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

UserHeader.propTypes = {
  auth: PropTypes.object.isRequired
};
