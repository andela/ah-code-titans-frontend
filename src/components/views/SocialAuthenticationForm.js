/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-multi-assign */
import React from "react";
import PropTypes from "prop-types";
import { Button, Icon, Container } from "semantic-ui-react";

function getLink(provider) {
  window.location.href = `http://ah-codetitans-staging.herokuapp.com/oauth/login/${provider}`;
}

function getButton(provider) {
  let icon = "";
  let color = "";
  let name = "";
  let link = "";

  switch (provider) {
    case "Facebook":
    case "Twitter": {
      icon = color = link = provider.toLowerCase();
      name = provider;
      break;
    }
    case "Google": {
      icon = color = "google plus";
      name = "Google";
      link = "google-oauth2";
      break;
    }
    default: break;
  }

  return (
    <Button icon color={color} size="large" onClick={() => getLink(link)}>
      <Icon name={icon} /><span>{`Continue with ${name}`}</span>
    </Button>
  );
}

function SocialAuthentication(props) {
  const { parent } = props;

  return (
    <div className="auth__social">
      <Container textAlign="center" className="auth__content">
        <h2>Sign In</h2>
        <h3>Be prepared to explore through great content written by passionate writers.</h3>

        {getButton("Facebook")}
        {getButton("Twitter")}
        {getButton("Google")}

        <Button
          id="useEmailBtn"
          icon
          size="large"
          onClick={() => {
            parent.setView(2);
          }}
        >
          <Icon name="mail" /><span>Use Email</span>
        </Button>
        <p className="links--create">No account?
          <a onClick={() => { parent.setView(3); }} className="links__link">Create one</a>
        </p>
      </Container>
    </div>
  );
}

SocialAuthentication.propTypes = {
  parent: PropTypes.object
};

SocialAuthentication.defaultProps = {
  parent: {}
};

export default SocialAuthentication;
