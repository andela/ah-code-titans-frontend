import React, { Component } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import PropTypes from "prop-types";

export class LikeDislikeButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { likesDislikes, onClick } = this.props;
    const {
      likes, dislikes, isFetching, likeIcon, dislikeIcon, isLiking
    } = likesDislikes;
    const { like, dislike } = onClick;

    return (
      <div className="likedislike">
        <Button as="div" labelPosition="right" onClick={like}>
          <Button icon loading={isLiking}>
            <Icon name={likeIcon} />
          </Button>
          <Label basic pointing="left">
            {likes}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={dislike}>
          <Button icon loading={isFetching}>
            <Icon name={dislikeIcon} />
          </Button>
          <Label basic pointing="left">
            {dislikes}
          </Label>
        </Button>
      </div>
    );
  }
}

LikeDislikeButtons.propTypes = {
  likesDislikes: PropTypes.object.isRequired,
  onClick: PropTypes.object.isRequired
};

export default LikeDislikeButtons;
