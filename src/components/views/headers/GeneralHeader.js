import React from "react";
import {
  Menu, Container, Input, Header, Responsive
} from "semantic-ui-react";

import AuthenticationPopup from "../AuthenticationPopup";

export default function GeneralHeader(props) {
  return (
    <Menu borderless main="true" className="header--general">
      <Container>
        <Menu.Item><Header>Authors Haven</Header></Menu.Item>

        <Menu.Menu position="right" className="secondary">

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
