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
  Responsive,
  Popup,
  Divider,
  Button,
  Icon
} from "semantic-ui-react";
import * as AuthenticationActions from "../../../actions/authenticationActions";
import { history } from "../../../store/configureStore";
import SearchInput from "../../containers/searchInput";
import DefaultUserPic from "../../../assets/img/person.png";

import LOGO from "../../../assets/img/logo.png";

function UserPopup(props) {
  const { actions, auth } = props;
  return (
    <Menu vertical secondary>
      <Menu.Item name="user">
        <Header as="h5">
          <Image className="user__image" src={DefaultUserPic} />
          {auth.user.username}
        </Header>
      </Menu.Item>
      <Divider />
      <Menu.Item name="createArticle">
        <Link to="/create_article">
          <Header as="h5"><Icon name="write square" />Create an Article</Header>
        </Link>
      </Menu.Item>
      <Menu.Item name="users">
        <Link to="/profiles">
          <Header as="h5"><Icon name="users" />View Users</Header>
        </Link>
      </Menu.Item>
      <Menu.Item name="bookmarks">
        <Link to="/bookmarks">
          <Header as="h5"><Icon name="bookmark" />Bookmarks</Header>
        </Link>
      </Menu.Item>

      <Divider />
      <Menu.Item name="profile">
        <Link to="/profile">
          <Header as="h5"><Icon name="user circle" />Profile</Header>
        </Link>
      </Menu.Item>

      <Menu.Item name="profile">
        <Header
          as="h5"
          onClick={() => {
            actions.auth.logout();
          }}
        ><Icon name="sign out" />
      Log out
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
        <Menu.Item className="header__logo">
          <a href="/">
            <Image src={LOGO} />
          </a>
        </Menu.Item>
        <Menu.Item className="header__text">
          <Header>Authors Haven</Header>
        </Menu.Item>

        <Menu.Menu position="right" className="secondary">
          <Menu.Item className="item">
            <SearchInput />
          </Menu.Item>

          <Responsive
            as={Menu.Item}
            minWidth={Responsive.onlyTablet.minWidth}
            active={currentPath === "/"}
            onClick={() => {
              history.replace("/");
            }}
          >Home
          </Responsive>

          <Responsive
            as={Menu.Item}
            minWidth={Responsive.onlyTablet.minWidth}
            active={currentPath === "/discover"}
            onClick={() => {
              history.replace("/discover");
            }}
          >Discover
          </Responsive>

          <Menu.Item position="right" className="floated user">
            <Link to="/create_article">
              <Button size="mini" color="primary inverted">
                <Icon name="plus" />New Article
              </Button>
            </Link>

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

UserPopup.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(UserHeader);
