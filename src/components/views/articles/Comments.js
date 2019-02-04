/* eslint-disable react/no-array-index-key */
/* eslint-disable implicit-arrow-linebreak */
import React from "react";
import PropTypes from "prop-types";
import {
  Button, Comment, Form, Header, Container, Loader
} from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import "../../../assets/style/main.scss";
import NewComment from "../../containers/comment";

const CommentsView = (props) => {
  const { parent, comments } = props;
  return (
    <div>
      <Comment.Group id="comment-section" threaded size="tiny">
        <Header as="h2" dividing>
          Comments
        </Header>

        <Form reply onSubmit={parent.onSubmit} size="large">
          <Form.TextArea
            autoHeight
            id="comment-textarea"
            value={parent.state.comment}
            onChange={parent.onHandleChange}
          />
          <Button
            id="btn-add__comment"
            size="large"
            content="Add Comment"
            labelPosition="left"
            icon="edit"
            primary
            disabled={parent.state.enableCommentButton}
          />
        </Form>

        <InfiniteScroll
          pageStart={0}
          loadMore={parent.loadMore}
          hasMore={comments.hasMore}
          loader={(
            <Container textAlign="center">
              <Loader size="medium" active inline />
            </Container>
)}
        >
          {comments.comments.map((comment, i) =>
            (comment.parent === 0
              ? (
                <NewComment
                  articleSlug={parent.props.articleSlug}
                  comment={comment}
                  key={i}
                />
              ) : null))}
        </InfiniteScroll>
      </Comment.Group>
    </div>
  );
};

CommentsView.propTypes = {
  parent: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired
};

export default CommentsView;
