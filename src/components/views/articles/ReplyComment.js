/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import { Comment } from "semantic-ui-react";
import moment from "moment";

function ReplyComponent(props) {
  const { comment } = props;
  const time = moment(comment.created_at, "YYYY-MM-DD HH:mm:ss")
    .utc(3)
    .local();
  const createdTime = moment.duration(time.diff(moment()), "milliseconds").humanize();
  return (
    <div>
      <div id="comment">
        <Comment>
          <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
          <Comment.Content>
            <Comment.Author as="a">{comment.user.username}</Comment.Author>
            <Comment.Metadata>
              <div>{`${createdTime} ago`}</div>
            </Comment.Metadata>
            <Comment.Text>
              <p>{comment.text}</p>
            </Comment.Text>
          </Comment.Content>
          <Comment.Group />
        </Comment>
      </div>
    </div>
  );
}

ReplyComponent.propTypes = {
  comment: PropTypes.array.isRequired
};

export default ReplyComponent;
