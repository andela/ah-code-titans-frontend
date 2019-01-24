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
    rate.rateArticle(newRating);
    this.setState({
      rating: newRating
    });
  }

  render() {
    const { rating } = this.state;
    return (
      <StarRatings
        rating={rating}
        starRatedColor="blue"
        changeRating={this.changeRating}
        numberOfStars={5}
        name="rating"
        starDimension="25px"
        starSpacing="5px"
      />
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
