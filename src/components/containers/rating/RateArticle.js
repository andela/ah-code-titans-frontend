import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StarRatings from "react-star-ratings";
import * as rateArticleActions from "../../../actions/rateArticleActions";

class RateArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    };

    this.changeRating = this.changeRating.bind(this);
  }

  changeRating(newRating, name) {
    const { rate } = this.props;
    const slug = window.location.pathname.slice(9);
    rate.rateArticle(newRating, slug);
    this.setState({
      rating: newRating
    });
  }

  render() {
    const { rating } = this.state;
    return (
      <div>
        <StarRatings
          rating={rating}
          starRatedColor="#00c3ff"
          changeRating={this.changeRating}
          numberOfStars={5}
          name="rating"
          starDimension="25px"
          starSpacing="5px"
        />

      </div>

    );
  }
}

RateArticle.propTypes = {
  rate: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    rate: bindActionCreators(rateArticleActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(RateArticle);
