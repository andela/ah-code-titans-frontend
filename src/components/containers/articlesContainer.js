import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as ArticleActions from "../../actions/articlesActions";
import CreateArticleForm from "../views/articles/CreateArticleForm";

class ArticlesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tag_list: ""
    };
  }

  onHandleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onHandleEditorChange = (event) => {
    const content = event.editor.getData();
    this.setState({
      body: content
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const {
      // eslint-disable-next-line camelcase
      title, description, body, tag_list
    } = this.state;
    const { actions } = this.props;
    actions.article.createArticle({
      title, description, body, tag_list
    });
  }

  render() {
    return (
      <CreateArticleForm
        state={this.state}
        onHandleChange={this.onHandleChange}
        onHandleEditorChange={this.onHandleEditorChange}
        handleKeyCommand={this.handleKeyCommand}
        onSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  articles: state
});

const mapDispatchToProps = dispatch => ({
  actions: {
    article: bindActionCreators(ArticleActions, dispatch)
  }
});

ArticlesContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesContainer);
