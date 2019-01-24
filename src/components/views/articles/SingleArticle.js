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
import HeaderComponent from "../../containers/headers/index";

class SingleArticle extends Component {
  componentDidMount = () => {
    const { actions, match } = this.props;
    actions.article.getSingleArticle(match.params.slug);
  }

  render() {
    const { article, auth, location } = this.props;
    // const checkCurrentUser = true;
    let checkCurrentUser;
    if (auth.user.username !== undefined) {
      if (article.author.username === auth.user.username) {
        checkCurrentUser = true;
      } else {
        checkCurrentUser = false;
      }
    } else {
      checkCurrentUser = false;
    }

    if (article.id === undefined) return <div />;

    return (
      <div>
        <HeaderComponent location={location} />
        <div className="container">

          <br />
          <h1 className="ui header centered">{article.title}</h1>
          <hr />
          <div className="ui container spread__content">
            <p>{article.description}</p>
            <p className="ui text right aligned">Authored by: <Link to="/profile"><i>{ article.author.username } </i></Link></p>
            <div className="ui time_to_read">
              <i className="clock icon" /> {article.time_to_read} {parseInt(article.time_to_read, 10) > 1 ? "minutes read" : "minute read"}
            </div>
            <br />
          </div>
          <br />
          <div className="main__first">
            <div className="ui container article__body" dangerouslySetInnerHTML={{ __html: article.body }} />
            <br />
            <div className="article__tags">
              {article.tag_list.map((tag, i) => <a className="ui tag label" key={i}>{tag}</a>)}
            </div>
            <hr />
            <br />
            { checkCurrentUser ? (
              <div className="spread__content">
                <button type="button" className="ui positive button">Edit This Article</button>
                <button type="submit" className="ui negative button">Delete Article</button>
              </div>
            )
              : <div />}

          </div>

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
    article: bindActionCreators(actionGenerators, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle);
