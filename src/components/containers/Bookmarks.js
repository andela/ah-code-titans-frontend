import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Item, Header } from "semantic-ui-react";
import Article from "../views/articles/article2";
import * as bookmarksAction from "../../actions/bookmarkArticleActions";
import HeaderComponent from "./headers/index";
import "../../assets/style/pages/bookmarkpage.scss";

export class Bookmarks extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.getBookmarks();
  }

  render() {
    const { allBookmarks, location } = this.props;
    return (
      <div>
        <HeaderComponent location={location} />
        <br />
        <div className="ui text container">
          <Item.Group className="bookmarkname">
              Bookmarks
          </Item.Group>
          <Item.Group>
            {
                allBookmarks.length === 0 ? (
                  <Header as="h3" color="grey"> You have not bookmarked any article yet!!</Header>
                ) : (
                  allBookmarks.map(bookmark => <Article key={bookmark.id} article={bookmark} />)
                )
              }

          </Item.Group>
        </div>

      </div>
    );
  }
}

Bookmarks.propTypes = {
  actions: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  allBookmarks: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    allBookmarks: state.bookmarkArticle.bookmarks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bookmarksAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);
