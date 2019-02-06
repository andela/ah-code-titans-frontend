import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import {
  Menu,
  Container,
  Image,
  Header,
  Popup,
  Divider
} from "semantic-ui-react";
import * as AuthenticationActions from "../../../actions/authenticationActions";
import DefaultUserPic from "../../../assets/img/person.png";
import LogoSection, { HeaderMenu } from "./common";

function UserPopup(props) {
  const { actions } = props;
  return (
    <Menu vertical secondary>
      <Menu.Item name="createArticle">
        <Link to="/create_article">
          <Header as="h5">Create an Article</Header>
        </Link>
      </Menu.Item>
      <Divider />
      <Menu.Item name="users">
        <a href="/profiles">
          <Header as="h5">View Users</Header>
        </a>
      </Menu.Item>
      <Menu.Item name="bookmarks">
        <Link to="/bookmarks">
          <Header as="h5">Bookmarks</Header>
        </Link>
      </Menu.Item>

      <Divider />
      <Menu.Item name="profile">
        <Link to="/profile">
          <Header as="h5">Profile</Header>
        </Link>
      </Menu.Item>
      <Menu.Item name="profile">
        <Header
          as="h5"
          onClick={() => {
            actions.auth.logout();
          }}
        >Log out
        </Header>
      </Menu.Item>
    </Menu>
  );
}

UserPopup.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      auth: bindActionCreators(AuthenticationActions, dispatch)
    }
  };
}

function UserHeader(props) {
  const { currentPath, auth } = props;

  return (
    <Menu borderless main="true" className="header--user">
      <Container>
        <LogoSection />

        <Menu.Menu position="right" className="secondary">
          <HeaderMenu currentPath={currentPath} />

          <Menu.Item position="right" className="floated user">
            <span className="user__name">{auth.user.username}</span>

            <Popup
              trigger={<Image className="user__image" src={DefaultUserPic} avatar />}
              content={<UserPopup {...props} />}
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
  auth: PropTypes.object.isRequired,
  currentPath: PropTypes.string.isRequired
};

export default connect(null, mapDispatchToProps)(UserHeader);
