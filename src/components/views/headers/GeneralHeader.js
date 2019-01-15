import React from "react";
import PropTypes from "prop-types";
import {
  Menu, Container, Input, Header, Responsive
} from "semantic-ui-react";
import { history } from "../../../store/configureStore";

import AuthenticationPopup from "../AuthenticationPopup";

export default function GeneralHeader(props) {
  const { currentPath } = props;

  return (
    <Menu borderless main="true" className="header--general">
      <Container>
        <Menu.Item><Header>Authors Haven</Header></Menu.Item>

        <Menu.Menu position="right" className="secondary">

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

          <Responsive as={Menu.Menu} minWidth={Responsive.onlyTablet.minWidth}>
            <Menu.Item className="item">
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
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
