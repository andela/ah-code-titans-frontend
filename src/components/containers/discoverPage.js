import React, { Component } from "react";
import { connect } from "react-redux";
import { Item, Container } from "semantic-ui-react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Article from "../views/article2";
import * as tagSearching from "../../actions/tagSearchingActions";
import TagSection from "../views/TagSection";
import HeaderComponent from "./headers/index";

class DiscoverPage extends Component {
  onNavTagClick = (event) => {
    event.preventDefault();
    const navText = event.target.innerHTML;
    const { actions } = this.props;
    actions.tagSearch.getAllSpecificTagRelatedArticles(navText.toLowerCase());
  }

  render() {
    const { articles, location } = this.props;
    return (
      <div>
        <HeaderComponent location={location} />
        <br />
        <Container textAlign="center" id="tagBar" className="SB">
          <TagSection onNavTagClick={this.onNavTagClick} />
        </Container>
        <br />
        <br />
        <Container text>
          <Item.Group>
            { articles.length > 0
              ? articles.map(article => (
                <Article
                  key={article.id}
                  article={article}
                />
              ))
              : "Articles not found matching the tag"}
          </Item.Group>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    articles: state.tag.tagSearchedArticles.articles.data
  };
}
const mapDispatchToProps = dispatch => ({
  actions: {
    tagSearch: bindActionCreators(tagSearching, dispatch)
  }
});

DiscoverPage.propTypes = {
  actions: PropTypes.object.isRequired,
  articles: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverPage);
