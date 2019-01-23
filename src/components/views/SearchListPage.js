import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TagSearchView from "./tagSearchView";

const SearchListPage = (props) => {
  const { articles } = props;
  return (
    <div>
      { articles.map(article => (
        <TagSearchView
          key={article.id}
          article={article}
          tags={article.tag_list}
        />
      ))}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    articles: state.tagReducer.tagsearched_articles.articles.data
  };
}

SearchListPage.propTypes = {
  articles: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(SearchListPage);
