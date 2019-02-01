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
  Container, Button, Popup, Divider
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import RateArticle from "../../containers/rating/RateArticle";
import GetRates from "../../containers/rating/GetRates";
import * as actionGenerators from "../../../actions/articlesActions";
import CommentsContainer from "../../containers/commentsContainer";
import HeaderComponent from "../../containers/headers/index";
import * as tagSearching from "../../../actions/tagSearchingActions";
import "../../../assets/style/pages/createArticle.scss";
import LikeDislikeComponent from "../LikeDislikeButtons";
import { likeAsync, dislikeAsync } from "../../../actions/likeDislikeActions";
import CreateArticleForm from "./CreateArticleForm";
import "../../../assets/style/articles/style.scss";

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
      tag_list: ""
    };
    this.checkIsLoggedIn = this.checkIsLoggedIn.bind(this);
    this.checkIfIsAuthor = this.checkIfIsAuthor.bind(this);
  }

  componentDidMount = () => {
    const { actions, match } = this.props;
    actions.article.getSingleArticle(match.params.slug);
    this.checkIsLoggedIn();
    this.checkIfIsAuthor();
  };

  componentDidUpdate() {
    const { currentArticle } = this.state;
    const { article } = this.props;
    if (article !== currentArticle) {
      this.checkIfIsAuthor();
    }
  }

  onTagClick = (event) => {
    event.preventDefault();
    const tagText = event.target.innerHTML;
    const { actions } = this.props;
    actions.tagsSearch.getAllSpecificTagRelatedArticles(tagText.toLowerCase());
  };

  handleDeleteArticle = () => {
    confirmAlert({
      title: "Confirm deletion",
      message: "Are you sure you want to delete this article?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const { actions, match } = this.props;
            actions.article.deleteArticle(match.params.slug);
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  }

  handleEditArticle = () => {
    const { article } = this.props;
    const {
      // eslint-disable-next-line camelcase
      title, body, description, tag_list
    } = article;

    this.setState({
      editing: true,
      title,
      body,
      description,
      tag_list: tag_list.join()
    });
  }

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
  }

  onSubmit = (event) => {
    event.preventDefault();
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
          onClick: () => {}
        }
      ]
    });
  };

  cancelEdit = () => {
    const { match } = this.props;
    window.location.assign(`/article/${match.params.slug}`);
  };

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

  checkIfIsAuthor() {
    const { auth } = this.props;
    const { article } = this.props;

    if (auth.user.username !== undefined && article !== undefined) {
      if (article.id !== undefined && article.author.username === auth.user.username) {
        this.setState({ userIsAuthor: true });
        this.setState({ currentArticle: article });
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
    const { userIsAuthor, editing, isLoggedIn } = this.state;

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
                <Divider />
                <div className="ui container spread__content">
                  <p>{article.description}</p>
                  <p className="ui text right aligned">Authored by: <Link to="/profile"><i>{ article.author.username } </i></Link></p>
                  <div className="ui time_to_read">
                    <i className="clock icon" />
                    {article.time_to_read < 1 ? "Less than a" : article.time_to_read} {parseInt(article.time_to_read, 10) > 1 ? "minutes read" : "minute read"}
                  </div>
                  <br />
                  <Container textAlign="right"><GetRates /></Container>
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
                  { isLoggedIn && !userIsAuthor ? (
                    <div>
                      <p textAlign="left"><b>Rate this article:</b></p>
                      <RateArticle />
                    </div>
                  ) : (
                    <div />
                  )
                }

                  <br />
                  { userIsAuthor ? (
                    <div className="button__group">
                      <Popup trigger={<Button size="tiny">Update Article</Button>} flowing hoverable>
                        <Button icon="edit" positive onClick={this.handleEditArticle} />
                        <Button icon="trash" negative onClick={this.handleDeleteArticle} />
                      </Popup>
                    </div>
                  )
                    : <div />}
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
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  article: state.article.singleArticle,
  auth: state.loginReducer.auth
});

const mapDispatchToProps = dispatch => ({
  actions: {
    article: bindActionCreators(actionGenerators, dispatch),
    tagsSearch: bindActionCreators(tagSearching, dispatch)
  },
  likeArticle: bindActionCreators(likeAsync, dispatch),
  dislikeArticle: bindActionCreators(dislikeAsync, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleArticle);
