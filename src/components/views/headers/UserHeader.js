import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Menu, Container, Input, Image, Header, Responsive
} from "semantic-ui-react";

import DefaultUserPic from "../../../assets/img/person.png";

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
            <Link to="/profile">
              <Image className="header__user__image" src={DefaultUserPic} avatar />
            </Link>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

UserHeader.propTypes = {
  auth: PropTypes.object.isRequired
};
