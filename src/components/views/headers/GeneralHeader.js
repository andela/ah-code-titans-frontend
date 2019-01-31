import React from "react";
import PropTypes from "prop-types";
import {
  Menu, Container, Header, Responsive, Image
} from "semantic-ui-react";
import { history } from "../../../store/configureStore";
import SearchInput from "../../containers/searchInput";

import AuthenticationPopup from "../AuthenticationPopup";
import LOGO from "../../../assets/img/logo.png";

export default function GeneralHeader(props) {
  const { currentPath } = props;

  return (
    <Menu borderless main="true" className="header--general">
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

          <Menu.Item position="right" className="">
            <AuthenticationPopup />
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

GeneralHeader.propTypes = {
  currentPath: PropTypes.string.isRequired
};
