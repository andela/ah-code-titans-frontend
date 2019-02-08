import React from "react";
import {
  Menu, Header, Image, Responsive
} from "semantic-ui-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import SearchInput from "../../containers/searchInput";
import { history } from "../../../store/configureStore";
import LOGO from "../../../assets/img/logo.png";

export default function LogoSection() {
  return (
    <Menu.Menu position="left" className="secondary">
      <Menu.Item className="header__logo">
        <Link to="/">
          <Image src={LOGO} />
        </Link>
      </Menu.Item>

      <Menu.Item className="header__text">
        <Link to="/">
          <Header>Authors Haven</Header>
        </Link>
      </Menu.Item>
    </Menu.Menu>
  );
}

export const HeaderMenu = (props) => {
  const { currentPath } = props;
  return (
    <Menu.Menu position="right" className="secondary">

      {
              currentPath === "/discover"
                ? <div />
                : (
                  <Menu.Item className="item">
                    <SearchInput />
                  </Menu.Item>
                )
          }
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
    </Menu.Menu>
  );
};

HeaderMenu.propTypes = {
  currentPath: PropTypes.string.isRequired
};
