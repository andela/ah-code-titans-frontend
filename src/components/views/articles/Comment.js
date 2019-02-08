/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Comment,
  Form,
  Icon,
  Popup,
  Grid,
  TextArea,
  Button,
  List,
  Transition
} from "semantic-ui-react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import moment from "moment";
import NewComment from "../../containers/comment";

const InputComponent = (props) => {
  const {
    comment, onHandleChange, submit, placeholder
  } = props;
  return (
    <div>
      <Form reply size="tiny" rows={2} onSubmit={submit}>
        <TextArea
          className="actions__inputs"
          value={comment}
          rows={1}
          onChange={onHandleChange}
          placeholder={placeholder}
        />
        <Button
          className="comment__actions__reply--button"
          icon="send"
          primary
          size="tiny"
          content="Send"
        />
      </Form>
    </div>
  );
};

InputComponent.propTypes = {
  comment: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
};

function renderComments(comments, slug) {
  return (
    <Transition.Group duration={1800} as={List}>
      {comments.map((item, i) => (
        <List.Item>
          <NewComment articleSlug={slug} comment={item} key={i} />
        </List.Item>
      ))}
    </Transition.Group>
  );
}

export const confirmDelete = (props) => {
  confirmAlert({
    title: "Confirm delete",
    message: "Are you sure you want to delete this comment?",
    buttons: [
      {
        label: "Yes",
        className: "btn__hover",
        onClick: () => {
          props();
        }
      },
      {
        label: "No",
        onClick: () => {}
      }
    ]
  });
};

function CommentComponent(props) {
  const {
    comment,
    parent,
    user,
    toggleReply,
    editCommentToggle,
    replyComment,
    toggleReplyComment
  } = props;

  const replies = parent.repliesComments(props);
  const time = moment(comment.created_at, "YYYY-MM-DD HH:mm:ss")
    .utc(3)
    .local();
  const createdTime = moment.duration(time.diff(moment()), "milliseconds").humanize();
  return (
    <div>
      <div id="comment">
        <Comment>
          <Comment.Avatar src={comment.user.image} />
          <Comment.Content>
            <Comment.Author
              as="a"
              onClick={parent.handleCommentAuthorClick}
              href={`/user/${comment.user.username}`}
            >
              {comment.user.username}
            </Comment.Author>
            <Comment.Metadata>
              <div>{`${createdTime} ago`}</div>
            </Comment.Metadata>
            <Comment.Text className="comment__text">
              <p className="comment__text__body">{comment.text}</p>
            </Comment.Text>

            <Comment.Actions className="comment__actions">
              {comment.parent === 0 && replies.length > 0 ? (
                <Comment.Action
                  className="comment__button__replies"
                  onClick={() => {
                    parent.toggleReplyComments();
                  }}
                >
                  {toggleReplyComment ? "Hide replies" : "View replies"}
                </Comment.Action>
              ) : (
                <div />
              )}
              {comment.parent === 0 ? (
                <Comment.Action
                  className="comment__actions__reply"
                  onClick={() => {
                    parent.toggleReply();
                  }}
                >
                  Reply
                </Comment.Action>
              ) : (
                <div />
              )}

              <Comment.Action className="comment__actions__options">
                {user.user.username === comment.user.username ? (
                  <Popup
                    size="small"
                    trigger={<Icon size="large" name="ellipsis horizontal" />}
                    flowing
                    hoverable
                  >
                    <Grid centered divided columns={2}>
                      <Grid.Column textAlign="center">
                        <Icon
                          size="large"
                          link
                          name="pencil alternate"
                          onClick={() => {
                            parent.toggleEditComments();
                          }}
                        />
                      </Grid.Column>
                      <Grid.Column textAlign="center">
                        <Icon
                          size="large"
                          link
                          name="trash alternate"
                          onClick={() => {
                            confirmDelete(parent.deleteComment);
                          }}
                        />
                      </Grid.Column>
                    </Grid>
                  </Popup>
                ) : (
                  ""
                )}
              </Comment.Action>
              <div className={`comment__content--${toggleReplyComment ? "active" : "disabled"}`}>
                {renderComments(replies, parent.props.articleSlug)}
              </div>
              <div className={`comment__content--${editCommentToggle ? "active" : "disabled"}`}>
                <InputComponent
                  comment={replyComment}
                  onHandleChange={parent.onHandleChange}
                  submit={parent.editComment}
                  placeholder=""
                />
              </div>
              <div className={`comment__content--${toggleReply ? "active" : "disabled"}`}>
                <InputComponent
                  comment={replyComment}
                  onHandleChange={parent.onHandleChange}
                  submit={parent.onSubmit}
                  placeholder="write a reply..."
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
  comment: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
  toggleReply: PropTypes.bool.isRequired,
  replyComment: PropTypes.string.isRequired,
  toggleReplyComment: PropTypes.bool.isRequired,
  editCommentToggle: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  comments: state.comment.comments
});

export default connect(mapStateToProps)(CommentComponent);
