/* eslint-disable react/no-array-index-key */
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
      <Comment.Group id="comment-section" threaded size="huge">
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
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
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
          {comments.comments.map((comment, i) => (
            <NewComment comment={comment} key={i} />
          ))}
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