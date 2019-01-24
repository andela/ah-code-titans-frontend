/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import {
  Button, Comment, Form, Header
} from "semantic-ui-react";

import NewComment from "../../containers/comment";

const CommentsView = (props) => {
  const { parent, comments } = props;
  return (
    <div>
      <Comment.Group size="huge">
        <Header as="h3" dividing>
          Comments
        </Header>

        <Form reply onSubmit={parent.onSubmit} size="large">
          <Form.TextArea
            id="comment-textarea"
            value={parent.state.comment}
            onChange={parent.onHandleChange}
          />
          <Button
            className="btn-add__comment"
            size="large"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>

        {comments.comments.map((comment, i) => (
          <NewComment comment={comment} key={i} />
        ))}
      </Comment.Group>
    </div>
  );
};

CommentsView.propTypes = {
  parent: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired
};

export default CommentsView;
