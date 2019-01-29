/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Comment, Input, CommentAction } from "semantic-ui-react";
import moment from "moment";
import ReplyComponent from "./ReplyComment";

const InputComponent = (props) => {
  const { comment, onHandleChange, submit } = props;
  return (
    <div>
      <Input value={comment} onChange={onHandleChange} onKeyPress={submit} placeholder="Reply..." />
    </div>
  );
};

InputComponent.propTypes = {
  comment: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  onHandleChange: PropTypes.func.isRequired
};

function renderComments(props) {
  const { comment, comments } = props;
  return comments.map((item, i) => {
    if (item.parent === comment.id) {
      return <ReplyComponent comment={item} key={i} />;
    }

    return null;
  });
}

function CommentComponent(props) {
  const {
    comment, parent, toggleReply, replyComment, toggleReplyComment
  } = props;

  const time = moment(comment.created_at, "YYYY-MM-DD HH:mm:ss")
    .utc(3)
    .local();
  const createdTime = moment.duration(time.diff(moment()), "milliseconds").humanize();
  return (
    <div>
      <div id="comment">
        <Comment>
          <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
          <Comment.Content>
            <Comment.Author as="a">{comment.user.username}</Comment.Author>
            <Comment.Metadata>
              <div>{`${createdTime} ago`}</div>
            </Comment.Metadata>
            <Comment.Text>
              <p>{comment.text}</p>
            </Comment.Text>
            <Comment.Actions className="comment__actions">
              <CommentAction
                className="comment__button__replies"
                onClick={() => {
                  parent.toggleReplyComments();
                }}
              >
                View replies
                <div className={`comment__content--${toggleReplyComment ? "active" : "disabled"}`}>
                  {renderComments(props)}
                </div>
              </CommentAction>

              <Comment.Action
                onClick={() => {
                  parent.toggleReply();
                }}
              >
                Reply
              </Comment.Action>
              <div className={`comment__content--${toggleReply ? "active" : "disabled"}`}>
                <InputComponent
                  comment={replyComment}
                  onHandleChange={parent.onHandleChange}
                  submit={parent.onSubmit}
                />
              </div>
            </Comment.Actions>
          </Comment.Content>
          <Comment.Group />
        </Comment>
      </div>
    </div>
  );
}

CommentComponent.propTypes = {
  comment: PropTypes.array.isRequired,
  parent: PropTypes.array.isRequired,
  toggleReply: PropTypes.bool.isRequired,
  replyComment: PropTypes.array.isRequired,
  toggleReplyComment: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  comments: state.commentReducers.comments
});

export default connect(mapStateToProps)(CommentComponent);
