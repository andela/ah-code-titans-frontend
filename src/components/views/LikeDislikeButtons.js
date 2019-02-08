import React, { Component } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { likeAsync, dislikeAsync } from "../../actions/likeDislikeActions";

export class LikeDislikeButtons extends Component {
  constructor(props) {
    super(props);
    this.handleDislike = this.handleDislike.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.state = {};
  }

  handleLike(e) {
    const { likeArticle, article } = this.props;
    const { slug } = article;
    likeArticle(slug);
  }

  handleDislike(e) {
    const { dislikeArticle, article } = this.props;
    const { slug } = article;
    dislikeArticle(slug);
  }

  render() {
    const { article, isLiking, isDisliking } = this.props;
    const {
      liked, disliked, likes, dislikes
    } = article;
    return (
      <div className="likedislike">
        <Button as="div" labelPosition="right">
          <Button icon loading={isLiking} onClick={this.handleLike}>
            <Icon color="blue" name={liked === true ? "thumbs up" : "thumbs up outline"} />
          </Button>
          <Label basic pointing="left">
            {likes}
          </Label>
        </Button>
        <Button as="div" labelPosition="right">
          <Button icon loading={isDisliking} onClick={this.handleDislike}>
            <Icon color="red" name={disliked === true ? "thumbs down" : "thumbs down outline"} />
          </Button>
          <Label basic pointing="left">
            {dislikes}
          </Label>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLiking: state.likeDislike.isLiking,
  isDisliking: state.likeDislike.isDisliking
});

const mapDispatchToProps = dispatch => ({
  likeArticle: bindActionCreators(likeAsync, dispatch),
  dislikeArticle: bindActionCreators(dislikeAsync, dispatch)
});

LikeDislikeButtons.defaultProps = {
  isLiking: false,
  isDisliking: false
};

LikeDislikeButtons.propTypes = {
  article: PropTypes.object.isRequired,
  likeArticle: PropTypes.func.isRequired,
  dislikeArticle: PropTypes.func.isRequired,
  isLiking: PropTypes.bool,
  isDisliking: PropTypes.bool
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikeDislikeButtons);
