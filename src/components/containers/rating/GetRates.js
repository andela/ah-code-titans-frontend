import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StarRatings from "react-star-ratings";
import * as rateArticleActions from "../../../actions/rateArticleActions";

class GetRates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.averageRating
    };
  }

  componentDidMount() {
    const { rate } = this.props;
    rate.getRates();
  }

  render() {
    const { rating } = this.state;
    return (
      <StarRatings
        rating={rating}
        starRatedColor="blue"
        numberOfStars={5}
        name="rating"
        starDimension="25px"
        starSpacing="5px"
      />
    );
  }
}

GetRates.propTypes = {
  averageRating: PropTypes.object.isRequired,
  rate: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    averageRating: state.rateArticleReducer.rating
  };
}

function mapDispatchToProps(dispatch) {
  return {
    rate: bindActionCreators(rateArticleActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GetRates);
