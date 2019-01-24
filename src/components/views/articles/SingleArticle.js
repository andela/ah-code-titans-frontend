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
import UserHeader from "../headers/UserHeader";

const slug = window.location.pathname.slice(9);
class SingleArticle extends Component {
  componentDidMount = () => {
    const { actions } = this.props;
    actions.article.getSingleArticle(slug);
  }

  render() {
    const { article, auth } = this.props;
    if (article.id === undefined) return <div />;

    return (
      <div>
        <UserHeader
          auth={auth}
        />
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
            <div className="spread__content">
              <button type="button" className="ui positive button">Edit This Article</button>
              <button type="submit" className="ui negative button">Delete Article</button>
            </div>
          </div>

        </div>

      </div>

    );
  }
}

SingleArticle.propTypes = {
  article: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
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
