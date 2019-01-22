import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";

import Article from "./articles/article1";

export default function LandingSectionTwo(props) {
  const { articles } = props;
  if (articles.length < 3) return (<div />);
  return (
    <Grid>
      <Grid.Column>
        <Grid.Column>
          <Article article={articles[1]} />
        </Grid.Column>
        <Grid.Column>
          <Article article={articles[2]} />
        </Grid.Column>
      </Grid.Column>

      <Grid.Column>
        <Article article={articles[0]} />
      </Grid.Column>
    </Grid>
  );
}

LandingSectionTwo.propTypes = {
  articles: PropTypes.array
};

LandingSectionTwo.defaultProps = {
  articles: []
};
