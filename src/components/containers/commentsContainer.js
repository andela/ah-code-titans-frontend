import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as ActionCreators from "../../actions/commentsActions";
import CommentsView from "../views/articles/Comments";

class CommentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };
  }

  onHandleChange = (event) => {
    this.setState({
      comment: event.target.value
    });
  };

  onSubmit = () => {
    const { actions, article } = this.props;
    const { comment } = this.state;
    const { slug } = article;
    actions.createComment({ comment, slug });
  };

  render() {
    const { comments } = this.props;
    return <CommentsView parent={this} comments={comments} />;
  }
}
CommentsContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  article: state.articleReducer.articles.single_article,
  comments: state.commentReducer.articles.comments
});

const mapDispatchToProp = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
});

export default connect(
  mapStateToProp,
  mapDispatchToProp
)(CommentsContainer);
