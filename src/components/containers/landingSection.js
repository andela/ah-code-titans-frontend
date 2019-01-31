import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Slider from "react-slick";

import LandingSectionOne from "../views/LandingSectionOne";
import LandingSectionTwo from "../views/LandingSectionTwo";
import * as articleActions from "../../actions/articleActions";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class LandingSection extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      slider: {
        dots: true,
        infinite: true,
        speed: 1500,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.article.getArticles("landingSection", true);
  }

  render() {
    const { articles } = this.props;
    const { slider } = this.state;
    const articlesList = [[], [], []];

    articles.forEach((article, index) => {
      const listIndex = Math.floor(index / 3);

      if (articlesList[listIndex] === undefined) {
        articlesList.push([]);
      }

      articlesList[listIndex].push(article);
    });

    return (
      <Slider {...slider}>
        <div>
          <LandingSectionOne articles={articlesList[0]} />
        </div>
        <div>
          <LandingSectionTwo articles={articlesList[1]} />
        </div>
        <div>
          <LandingSectionOne articles={articlesList[2]} />
        </div>
      </Slider>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.article.articles.landingSection.results
});

const mapDispatchToProps = dispatch => ({
  actions: {
    article: bindActionCreators(articleActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingSection);
