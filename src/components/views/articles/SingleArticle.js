/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as actionGenerators from "../../../actions/articlesActions";

class SingleArticle extends Component {
  componentDidMount = () => {
    const slug = window.location.pathname.slice(9);
    const { actions } = this.props;
    actions.article.getSingleArticle(slug);
  }

  render() {
    const { article } = this.props;
    const base = article.singleArticle.single_article;

    return (
      <div className="container">
        <h1 className="ui header centered">{base.title}</h1>
        <hr />
        <div className="ui container spread__content">
          <p>{article.singleArticle.single_article.description}</p>
          <p className="ui text right aligned">By: <i>{base.author.username }</i></p>
          <div className="ui time_to_read">
            <i className="clock icon" /> {base.time_to_read} {parseInt(base.time_to_read, 10) > 1 ? "minutes read" : "minute read"}
          </div>
          <br />
        </div>
        <br />
        <div className="main__first">
          <div className="ui container article__body" dangerouslySetInnerHTML={{ __html: base.body }} />
          <br />
          <div className="article__tags">
            {base.tag_list.map(tag => <a className="ui tag label">{tag}</a>)}
          </div>
          <hr />
          <br />
          <div className="spread__content">
            <button type="button" className="ui positive button">Edit This Article</button>
            <button type="submit" className="ui negative button">Delete Article</button>
          </div>
        </div>

      </div>
    );
  }
}
SingleArticle.propTypes = {
  article: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  article: state.articleReducer
});

const mapDispatchToProps = dispatch => ({
  actions: {
    article: bindActionCreators(actionGenerators, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle);
