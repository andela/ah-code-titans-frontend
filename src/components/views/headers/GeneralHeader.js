import React from "react";
import PropTypes from "prop-types";
import {
  Menu, Container
} from "semantic-ui-react";

import AuthenticationPopup from "../AuthenticationPopup";
import LogoSection, { HeaderMenu } from "./common";

export default function GeneralHeader(props) {
  const { currentPath } = props;

  return (
    <Menu borderless main="true" className="header--general">
      <Container>
        <LogoSection />

        <Menu.Menu position="right" className="secondary">
          <HeaderMenu currentPath={currentPath} />

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
