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
    const slug = window.location.pathname.slice(9);
    rate.getRates(slug);
  }

  componentWillReceiveProps(nextProps) {
    // Any time props.averageRating changes, update state.
    const { averageRating } = this.props;
    if (nextProps.averageRating !== averageRating) {
      this.setState({
        rating: nextProps.averageRating
      });
    }
  }

  render() {
    const { rating } = this.state;

    return (
      <div>
        <StarRatings
          rating={rating}
          starRatedColor="gold"
          numberOfStars={5}
          name="rating"
          starDimension="30px"
          starSpacing="5px"
        />
      </div>

    );
  }
}

GetRates.propTypes = {
  averageRating: PropTypes.object.isRequired,
  rate: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    averageRating: state.rateArticle.rating
  };
}

function mapDispatchToProps(dispatch) {
  return {
    rate: bindActionCreators(rateArticleActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GetRates);
