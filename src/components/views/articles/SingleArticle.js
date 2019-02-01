/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import {
  Button, Popup, Divider
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import RateArticle from "../../containers/rating/RateArticle";
import GetRates from "../../containers/rating/GetRates";
import CommentsContainer from "../../containers/commentsContainer";
import * as bookmarkActions from "../../../actions/bookmarkArticleActions";

import * as articleActions from "../../../actions/articleActions";
import HeaderComponent from "../../containers/headers/index";
import { humanizeTimeToRead } from "../../../helpers/time";

import LikeDislikeComponent from "../LikeDislikeButtons";
import { likeAsync, dislikeAsync } from "../../../actions/likeDislikeActions";
import CreateArticleForm from "./CreateArticleForm";
import ShareArticle from "./ShareArticle";
import SocialShareAPI from "../../../api/socialShareAPI";

import "../../../assets/style/articles/style.scss";
import "../../../assets/style/articles/bookmark.scss";

class SingleArticle extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userIsAuthor: false,
      currentArticle: {},
      editing: false,
      title: "",
      description: "",
      body: "",
      tag_list: "",
      bookmarked: props.bookmarked
    };
    this.checkIsLoggedIn = this.checkIsLoggedIn.bind(this);
    this.checkIfIsAuthor = this.checkIfIsAuthor.bind(this);
    this.bookmarkArticle = this.bookmarkArticle.bind(this);
    this.unBookmarkArticle = this.unBookmarkArticle.bind(this);
  }

  componentDidMount() {
    const { actions, match } = this.props;
    actions.article.getSingleArticle(match.params.slug);
    this.checkIsLoggedIn();
    this.checkIfIsAuthor();
  }

  componentWillReceiveProps(nextProps) {
    const { bookmarked } = this.props;
    if (nextProps.bookmarked !== bookmarked) {
      this.setState({ bookmarked: nextProps.bookmarked });
    }
  }

  componentDidUpdate() {
    const { currentArticle } = this.state;
    const { article } = this.props;
    if (article !== currentArticle) {
      this.checkIfIsAuthor();
    }
  }

  onTagClick = (event) => {
    event.preventDefault();
    window.location.href = `/discover?tag=${event.target.innerHTML}`;
  };

  handleDeleteArticle = () => {
    confirmAlert({
      title: "Confirm deletion",
      message: "Are you sure you want to delete this article?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const { actions, history, match } = this.props;
            actions.article.deleteArticle(match.params.slug);
            history.push("/profile");
          }
        },
        {
          label: "No",
          onClick: () => { }
        }
      ]
    });
  };

  handleEditArticle = () => {
    const { article } = this.props;
    /* eslint-disable camelcase */
    const {
      title,
      body,
      description,
      tag_list

    } = article;

    this.setState({
      editing: true,
      title,
      body,
      description,
      tag_list: tag_list.join()
    });
  };

  onHandleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onHandleEditorChange = (event) => {
    const content = event.editor.getData();
    this.setState({
      body: content
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    /* eslint-disable camelcase */
    const {
      // eslint-disable-next-line camelcase
      title, description, body, tag_list
    } = this.state;

    const { actions, match } = this.props;
    actions.article.editArticle(match.params.slug, {
      title, description, body, tag_list: tag_list.split(",")
    });
  }

  resetForm = () => {
    confirmAlert({
      title: "Confirm discard.",
      message: "Are you sure you want to clear all fields?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.setState({
              title: "",
              description: "",
              body: "",
              tag_list: ""
            });
          }
        },
        {
          label: "No",
          onClick: () => { }
        }
      ]
    });
  };

  cancelEdit = () => {
    const { match } = this.props;
    window.location.assign(`/article/${match.params.slug}`);
  };

  handleSocialShare = (event) => {
    const { match } = this.props;
    SocialShareAPI.socialShare(match.params.slug, event);
  }

  handleLike(e) {
    const { likeArticle, article } = this.props;
    const { slug } = article;
    likeArticle(slug);
  }

  handleDislike(e) {
    const { dislikeArticle, article } = this.props;
    const { slug } = article;
    dislikeArticle(slug);
  }

  bookmarkArticle() {
    const { actions } = this.props;
    const slug = window.location.pathname.slice(9);

    actions.bookmark.bookmarkArticle(slug);
  }

  unBookmarkArticle() {
    const { actions } = this.props;
    const slug = window.location.pathname.slice(9);

    actions.bookmark.unBookmarkArticle(slug);
  }

  checkIfIsAuthor() {
    const { auth } = this.props;
    const { article } = this.props;

    if (auth.user.username !== undefined && article !== undefined) {
      if (article.id !== undefined && article.author.username === auth.user.username) {
        this.setState({ userIsAuthor: true });
        this.setState({ currentArticle: article });
        this.setState({ bookmarked: article.bookmarked });
      }
    }
  }

  checkIsLoggedIn() {
    const { auth } = this.props;
    const { article } = this.props;
    if (auth.user.username !== undefined && article !== undefined) {
      this.setState({ isLoggedIn: true });
    }
  }

  render() {
    const { article, location, match } = this.props;
    const {
      userIsAuthor, editing, isLoggedIn, bookmarked
    } = this.state;

    if (article.id === undefined) return <div />;

    return (
      <div>
        <HeaderComponent location={location} />
        {
          (editing) ? (
            <div>
              <CreateArticleForm
                state={this.state}
                onHandleChange={this.onHandleChange}
                onHandleEditorChange={this.onHandleEditorChange}
                handleKeyCommand={this.handleKeyCommand}
                onSubmit={this.onSubmit}
                resetForm={this.resetForm}
                cancelEdit={this.cancelEdit}
              />
            </div>

          ) : (
            <div>
              <div className="article__container">
                <br />
                <h1 className="ui header centered">{article.title}</h1>
                <p className="ui header centered article__desc"> {article.description}</p>
                <Divider />
                <div className="ui container spread__content">
                  <p className="ui text right aligned">Authored by: <Link to={`/profiles/${article.author.username}`}><i>{article.author.username} </i></Link></p>

                  <div className="spread__content">
                    <div>
                      <GetRates />
                    </div>

                    <div>

                      <div className="ui time_to_read">
                        <i className="clock icon" />
                        {humanizeTimeToRead(article.time_to_read)}
                      </div>
                      {
                          bookmarked ? (
                            <div onClick={this.unBookmarkArticle} className="bookmark__position">
                              <i className="bookmark icon" />
                              Unbookmark
                            </div>

                          ) : (
                            <div onClick={this.bookmarkArticle} className="bookmark__position">
                              <i className="bookmark outline icon" />
                                Bookmark
                            </div>
                          )
                        }

                    </div>
                  </div>
                  <br />

                </div>
                <br />
                <div className="main__first">
                  <div className="ui container article__body" dangerouslySetInnerHTML={{ __html: article.body }} />
                  <br />
                  <div className="article__tags">
                    {article.tag_list.map((tag, i) => <a onClick={this.onTagClick} name={tag} className="ui tag label" key={i}>{tag}</a>)}
                  </div>
                  <Divider />
                  {isLoggedIn ? <LikeDislikeComponent {...this.props} /> : <div />}
                  {isLoggedIn && !userIsAuthor ? (
                    <div>
                      <p textAlign="left"><b>Rate this article.</b></p>
                      <RateArticle />
                    </div>
                  ) : (
                    <div />
                  )
                    }

                  {userIsAuthor ? (
                    <div className="button__group">
                      <Popup trigger={<Button>Update Article</Button>} flowing hoverable>
                        <Button icon="edit" positive onClick={this.handleEditArticle} />
                        <Button icon="trash" negative onClick={this.handleDeleteArticle} />
                      </Popup>
                    </div>
                  )
                    : <div />}
                  <br />
                  <div className="spread__content">
                    <div>
                      <ShareArticle
                        handleSocialShare={this.handleSocialShare}
                      />
                    </div>
                    <div className="bookmark__article">
                      {
                          bookmarked ? (
                            <span className="bookmark__float">
                              <p id="share-text"><b>Unbookmark this article.</b></p>
                              <Button circular color="yellow" icon="bookmark" onClick={this.unBookmarkArticle} />
                            </span>
                          ) : (
                            <span className="bookmark__float">
                              <p id="share-text"><b>Bookmark this article.</b></p>
                              <Button circular color="grey" icon="bookmark" onClick={this.bookmarkArticle} />
                            </span>
                          )
                        }
                    </div>
                  </div>

                  <br />
                  <Divider hidden />
                  <CommentsContainer articleSlug={match.params.slug} />

                </div>

              </div>

            </div>

          )
        }

      </div>
    );
  }
}

SingleArticle.propTypes = {
  article: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dislikeArticle: PropTypes.func.isRequired,
  likeArticle: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  bookmarked: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  article: state.article.singleArticle,
  auth: state.loginReducer.auth,
  bookmarked: state.article.singleArticle.bookmarked
});

const mapDispatchToProps = dispatch => ({
  actions: {
    article: bindActionCreators(articleActions, dispatch),
    likeArticle: bindActionCreators(likeAsync, dispatch),
    dislikeArticle: bindActionCreators(dislikeAsync, dispatch),
    bookmark: bindActionCreators(bookmarkActions, dispatch)
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleArticle);
