import React from "react";
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
    <div className="hp__tags SB">
      <TagSection />
    </div>
    <div className="hp__sections">

      <div className="hp__topStories">
        <TopStoriesSection />
      </div>
      <div className="hp__recentStories">
        <RecentStoriesSection />
      </div>

    </div>
  </div>
);

export default HomePage;
