/* eslint-disable react/no-array-index-key */
/* eslint-disable implicit-arrow-linebreak */
import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Comment,
  Form,
  Header,
  Container,
  Loader,
  Transition,
  List
} from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import "../../../assets/style/main.scss";
import NewComment from "../../containers/comment";

const CommentsView = (props) => {
  const { parent, comments } = props;
  return (
    <div>
      <Comment.Group id="comment-section" threaded size="large">
        <Header as="h2" dividing>
          Comments
        </Header>
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
          <Transition.Group duration={1800} as={List}>
            {comments.comments.map((comment, i) =>
              (comment.parent === 0 ? (
                <List.Item>
                  <NewComment articleSlug={parent.props.articleSlug} comment={comment} key={i} />
                </List.Item>
              ) : null))}
          </Transition.Group>
        </InfiniteScroll>

        <Form reply onSubmit={parent.onSubmit} size="large">
          <Form.TextArea
            autoHeight
            id="comment-textarea"
            value={parent.state.comment}
            onChange={parent.onHandleChange}
          />
          <Button
            className="comment__actions__reply--button"
            size="large"
            content="Add Comment"
            labelPosition="left"
            icon="edit"
            primary
            disabled={parent.state.enableCommentButton}
          />
        </Form>
      </Comment.Group>
    </div>
  );
};

CommentsView.propTypes = {
  parent: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired
};

export default CommentsView;
