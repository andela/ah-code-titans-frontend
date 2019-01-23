import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { likeAsync, dislikeAsync } from "../../actions/likeDislikeActions";

import LikeDislikeComponent from "../views/LikeDislikeButtons";

class LikeDislike extends Component {
  constructor(props) {
    super(props);
    this.handleDislike = this.handleDislike.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  handleLike(e) {
    const { likeArticle } = this.props;
    // FIXME remove slug and use from the state
    likeArticle("testing-likes");
  }

  handleDislike(e) {
    const { dislikeArticle } = this.props;
    // FIXME remove slug and use from the state
    dislikeArticle("testing-likes");
  }

  render() {
    return (
      <div>
        <LikeDislikeComponent
          likesDislikes={this.props}
          onClick={{ like: this.handleLike, dislike: this.handleDislike }}
        />
        ;
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dislikeIcon: state.likeDislikeReducer.dislikeIcon,
  likeIcon: state.likeDislikeReducer.likeIcon,
  likes: state.likeDislikeReducer.likes,
  dislikes: state.likeDislikeReducer.dislikes,
  isLiking: state.likeDislikeReducer.isLiking,
  isDisliking: state.likeDislikeReducer.isDisliking
});

const mapDispatchToProps = dispatch => ({
  likeArticle: bindActionCreators(likeAsync, dispatch),
  dislikeArticle: bindActionCreators(dislikeAsync, dispatch)
});

LikeDislike.propTypes = {
  likeArticle: PropTypes.func.isRequired,
  dislikeArticle: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikeDislike);
