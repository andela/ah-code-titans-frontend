import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Container } from "semantic-ui-react";

export default function SocialAuthErrorPage() {
  return (
    <div className="bg--error">
      <Container text textAlign="center" className="pageContent">
        <h1>Ohh sorry!</h1>
        <h2>We were unable to authenticate you using your social media account!</h2>

        <Link to="/">
          <Button icon secondary inverted labelPosition="left">
                Homepage
            <Icon name="left arrow" />
          </Button>
        </Link>

      </Container>
    </div>
  );
}
