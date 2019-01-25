import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Icon, Container } from "semantic-ui-react";
import { history } from "../../store/configureStore";

export default function SocialAuthSuccessPage(props) {
  const { parent } = props;
  return (
    <div className="bg--success">
      <Container text textAlign="center" className="pageContent">
        <h1>{`Welcome ${parent.state.view === 1 ? "back" : ""} to Authors Haven!`}</h1>
        <h2>Be prepared to explore through great content written by passionate writers.</h2>

        {
          parent.state.view === 1
            ? (
              <Button
                icon
                secondary
                inverted
                labelPosition="right"
                onClick={() => {
                  parent.props.actions.settings.skipWalkThrough();
                  history.replace("/");
                }}
              >
                {"Don't show this again"}
                <Icon name="right arrow" />
              </Button>
            )
            : null
        }

        <Link to={parent.state.view === 1 ? "/" : "/profile"}>
          <Button icon secondary inverted labelPosition="right">
            {parent.state.view === 1 ? "Continue" : "Get Started"}
            <Icon name="right arrow" />
          </Button>
        </Link>
      </Container>
    </div>
  );
}

SocialAuthSuccessPage.propTypes = {
  parent: PropTypes.object.isRequired
};
