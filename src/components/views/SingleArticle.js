import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Label } from "semantic-ui-react";
import * as tagSearching from "../../actions/tagSearchActions";

class SingleArticle extends Component {
  onTagClick = (event) => {
    event.preventDefault();
    const tagText = event.target.innerHTML;
    const { actions } = this.props;
    actions.tagsSearch.getAllSpecificTagRelatedArticles(tagText.toLowerCase());
  }

  render() {
    return (
      <div>
        <div className="article__tags">
          <Label onClick={this.onTagClick} as="a" tag>
            Culture
          </Label>
        </div>
      </div>
    );
  }
}

SingleArticle.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  actions: {
    tagsSearch: bindActionCreators(tagSearching, dispatch)
  }
});

export default connect(null, mapDispatchToProps)(SingleArticle);
