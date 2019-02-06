import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

import DiscoverPageView from "../views/DiscoverPage";
import * as ArticleActions from "../../actions/articleActions";
import HeaderComponent from "./headers/index";

import "../../assets/style/pages/discoverPage.scss";

class DiscoverPage extends Component {
  constructor(props) {
    super(props);

    const { location } = props;
    const params = new URLSearchParams(location.search);

    this.state = {
      storedArticles: [],
      filterOptions: {
        tags: [],
        authors: []
      },
      params: {
        tags: [],
        title: params.get("title"),
        author: params.get("author"),
        tag: params.get("tag")
      }
    };

    this.loadMore = this.loadMore.bind(this);
    this.fetchArticles = this.fetchArticles.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.queryArticles = this.queryArticles.bind(this);
    this.onNavTagClick = this.onNavTagClick.bind(this);
    this.updateFilterOptions = this.updateFilterOptions.bind(this);
    this.resetQuery = this.resetQuery.bind(this);
  }

  componentDidMount() {
    const { params } = this.state;
    this.fetchArticles(params, true);
  }

  componentDidUpdate() {
    const { articles } = this.props;
    const { storedArticles } = this.state;
    if (articles.results !== storedArticles) {
      this.updateFilterOptions();
    }
  }

  onNavTagClick = (event) => {
    event.preventDefault();
    const navText = event.target.innerHTML;
    const params = {
      tag: "",
      title: "",
      author: "",
      tags: [navText.toLowerCase()]
    };

    this.setState({ params });
    this.fetchArticles(params, true);
  }

  onSearchSubmit(e, searchInput) {
    if (e.key === "Enter") {
      const { type, value } = searchInput.state;
      const { params } = this.state;

      switch (type.toLowerCase()) {
        case "article": params.title = value; break;
        case "author": params.author = value; break;
        case "tag": params.tag = value; break;
        default: break;
      }
      this.setState({ params });
      this.fetchArticles(params, true);
    }
  }

  updateFilterOptions() {
    const { articles } = this.props;
    let { filterOptions } = this.state;
    const tags = [];
    const authors = [];

    // eslint-disable-next-line array-callback-return
    articles.results.map((article) => {
      article.tag_list.forEach((item) => {
        const tagFound = tags.find(tag => tag.value === item);
        if (tagFound === undefined) {
          tags.push({ value: item, selected: false });
        }
      });

      if (authors.length === 0) {
        authors.push({
          value: article.author,
          selected: false
        });
      } else {
        const authorFound = authors
          .find(author => author.value.username === article.author.username);

        if (authorFound === undefined) {
          authors.push({
            value: article.author,
            selected: false
          });
        }
      }
    });

    filterOptions = { tags, authors };
    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({
      storedArticles: articles.results,
      filterOptions
    });
  }

  queryArticles(type, selected) {
    const { params } = this.state;
    switch (type) {
      case 1: {
        const tagIndex = params.tags.findIndex(tag => tag === selected.value);

        if (tagIndex < 0) {
          params.tags.push(selected.value);
        } else { params.tags.splice(tagIndex, 1); }
        break;
      }
      case 2: {
        const selectedValue = selected.value.username;
        params.author = params.author === selectedValue ? "" : selectedValue;
        break;
      }
      default:
    }
    this.setState({ params });
    this.fetchArticles(params, true);
  }

  loadMore() {
    const { params } = this.state;
    this.fetchArticles(params);
  }

  fetchArticles(params, reset = false) {
    const { actions } = this.props;

    if (params.tags.length !== 0
      || (params.tag !== null && params.tag !== "")
      || (params.title !== null && params.title !== "")
      || (params.author !== null && params.author !== "")) {
      actions.article.searchForArticles(
        "mainDiscoverSection",
        params,
        reset
      );
    } else {
      actions.article.getArticles("mainDiscoverSection", reset);
    }
  }

  resetQuery() {
    const params = {
      tags: [],
      title: "",
      author: "",
      tag: ""
    };
    this.setState({ params });
    this.fetchArticles(params, true);
  }

  render() {
    const { location, articles } = this.props;
    return (
      <div>
        <HeaderComponent location={location} />
        <br />
        <DiscoverPageView
          articles={articles.results}
          hasMore={articles.more}
          onNavTagClick={this.onNavTagClick}
          parent={this}
          searchIsLoading={articles.isLoading}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    articles: state.article.articles.mainDiscoverSection
  };
}

const mapDispatchToProps = dispatch => ({
  actions: {
    article: bindActionCreators(ArticleActions, dispatch)
  }
});

DiscoverPage.propTypes = {
  actions: PropTypes.object.isRequired,
  articles: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverPage);
