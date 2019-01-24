import React from "react";
import PropTypes from "prop-types";
import { Comment, Input } from "semantic-ui-react";

const InputComponent = (props) => {
  const { comment, onHandleChange, submit } = props;
  return (
    <div>
      <p>list of reply comments here</p>
      <Input value={comment} onChange={onHandleChange} onKeyPress={submit} placeholder="Reply..." />
    </div>
  );
};

InputComponent.propTypes = {
  comment: PropTypes.string.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired
};

const CommentView = (props) => {
  const { comment, parent } = props;
  return (
    <div>
      <div id="comment">
        <Comment>
          <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
          <Comment.Content>
            <Comment.Author as="a">{comment.user.username}</Comment.Author>
            <Comment.Metadata>
              <div>{comment.created_at}</div>
            </Comment.Metadata>
            <Comment.Text>
              <p>{comment.text}</p>
            </Comment.Text>
            <Comment.Actions>
              <Comment.Action
                onClick={() => {
                  parent.toggleReply();
                }}
              >
                Reply
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
          <Comment.Group>
            {parent.state.toggleReply ? (
              <InputComponent
                comment={parent.state.replyComment}
                onHandleChange={parent.onHandleChange}
                submit={parent.onSubmit}
              />
            ) : null}
          </Comment.Group>
        </Comment>
      </div>
    </div>
  );
};
CommentView.propTypes = {
  comment: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired
};

export default CommentView;
