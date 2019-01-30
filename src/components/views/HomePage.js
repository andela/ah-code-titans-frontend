import React from "react";
import { Grid, Container } from "semantic-ui-react";
import LandingSection from "../containers/landingSection";
import TopStoriesSection from "../containers/topStoriesSection";
import RecentStoriesSection from "../containers/recentStoriesSection";
import TagSection from "./TagSection";

import "../../assets/style/pages/homepage.scss";

const HomePage = props => (
  <div>
    <div className="hp__landing">
      <LandingSection />
    </div>
    <div className="hp__tags">
      <TagSection />
    </div>
    <div className="hp__section__1">
      <Grid container>
        <Grid.Row>
          <Grid.Column width={8}>
            <Container>
              <TopStoriesSection />
            </Container>
          </Grid.Column>
          <Grid.Column width={8}>
            <Container>
              <RecentStoriesSection />
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  </div>
);

export default HomePage;
