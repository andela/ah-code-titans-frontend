/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Comment, Input } from "semantic-ui-react";
import moment from "moment";
import NewComment from "../../containers/comment";

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
  onHandleChange: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired
};

function renderComments(props) {
  const { comment, comments } = props;
  return comments.map((item, i) => {
    if (item.parent === comment.id) {
      return <NewComment comment={item} key={i} />;
    }

    return null;
  });
}

function CommentComponent(props) {
  const {
    comment, parent, toggleReply, replyComment
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
            <div className={`comment__content--${toggleReply ? "active" : "disabled"}`}>
              <InputComponent
                comment={replyComment}
                onHandleChange={parent.onHandleChange}
                submit={parent.onSubmit}
              />
              {renderComments(props)}
            </div>
          </Comment.Group>
        </Comment>
      </div>
    </div>
  );
}

CommentComponent.propTypes = {
  comment: PropTypes.array.isRequired,
  parent: PropTypes.object.isRequired,
  toggleReply: PropTypes.bool.isRequired,
  replyComment: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  comments: state.commentReducer.comments
});

export default connect(mapStateToProps)(CommentComponent);
