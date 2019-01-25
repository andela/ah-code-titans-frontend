import React, { Component } from "react";
import { connect } from "react-redux";
import { Item, Container } from "semantic-ui-react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Article from "../views/article2";
import * as tagSearching from "../../actions/tagSearchActions";
import TagSection from "../views/TagSection";

class DiscoverPage extends Component {
  onNavTagClick = (event) => {
    event.preventDefault();
    const navText = event.target.innerHTML;
    const { actions } = this.props;
    actions.tagSearch.getAllSpecificTagRelatedArticles(navText.toLowerCase());
  }

  render() {
    const { articles } = this.props;
    return (
      <div>
        <Container textAlign="center" fluid>
          <TagSection onNavTagClick={this.onNavTagClick} />
        </Container>
        <Container text>
          <Item.Group>
            { articles.map(article => (
              <Article
                key={article.id}
                article={article}
              />
            ))}
          </Item.Group>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    articles: state.tagReducer.tagSearchedArticles.articles.data
  };
}
const mapDispatchToProps = dispatch => ({
  actions: {
    tagSearch: bindActionCreators(tagSearching, dispatch)
  }
});

DiscoverPage.propTypes = {
  actions: PropTypes.object.isRequired,
  articles: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverPage);
