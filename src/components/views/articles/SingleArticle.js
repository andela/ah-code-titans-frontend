/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import * as actionGenerators from "../../../actions/articlesActions";
import CommentsContainer from "../../containers/commentsContainer";
import HeaderComponent from "../../containers/headers/index";
import * as tagSearching from "../../../actions/tagSearchingActions";
import "../../../assets/style/pages/createArticle.scss";
import LikeDislikeComponent from "../LikeDislikeButtons";
import { likeAsync, dislikeAsync } from "../../../actions/likeDislikeActions";

class SingleArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIsAuthor: false,
      currentArticle: {}
    };
    this.checkIfAuthenticated = this.checkIfAuthenticated.bind(this);
    this.checkIsLoggedIn = this.checkIsLoggedIn.bind(this);
  }

  componentDidMount = () => {
    const { actions, match } = this.props;
    actions.article.getSingleArticle(match.params.slug);
    this.checkIsLoggedIn();
    this.checkIfAuthenticated();
  };

  componentDidUpdate() {
    const { currentArticle } = this.state;
    const { article } = this.props;
    if (article !== currentArticle) {
      this.checkIfAuthenticated();
    }
  }

  onTagClick = (event) => {
    event.preventDefault();
    const tagText = event.target.innerHTML;
    const { actions } = this.props;
    actions.tagsSearch.getAllSpecificTagRelatedArticles(tagText.toLowerCase());
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

  checkIfAuthenticated() {
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
    const { userIsAuthor, isLoggedIn } = this.state;
    if (article.id === undefined) return <div />;

    return (
      <div className="createArticle">
        <HeaderComponent location={location} />
        <div className="container">
          <br />
          <h1 className="ui header centered">{article.title}</h1>
          <hr />
          <div className="ui container spread__content">
            <p>{article.description}</p>
            <p className="ui text right aligned">
              Authored by:{" "}
              <Link to="/profile">
                <i>{article.author.username} </i>
              </Link>
            </p>
            <div className="ui time_to_read">
              <i className="clock icon" /> {article.time_to_read}{" "}
              {parseInt(article.time_to_read, 10) > 1 ? "minutes read" : "minute read"}
            </div>
            <br />
          </div>
          <br />
          <div className="main__first">
            <div
              className="ui container article__body"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
            <br />
            <div className="article__tags">
              {article.tag_list.map((tag, i) => <a onClick={this.onTagClick} name={tag} className="ui tag label" key={i}>{tag}</a>)}
            </div>
            <hr />
            {isLoggedIn ? <LikeDislikeComponent {...this.props} /> : <div />}

            <br />
            {userIsAuthor ? (
              <div className="spread__content">
                <button type="button" className="ui positive button">
                  Edit This Article
                </button>
                <button type="submit" className="ui negative button">
                  Delete Article
                </button>
              </div>
            ) : (
              <div />
            )}
          </div>
          <CommentsContainer articleSlug={match.params.slug} />
        </div>
      </div>
    );
  }
}

SingleArticle.propTypes = {
  article: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
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
