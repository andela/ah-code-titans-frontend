import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import * as ArticleActions from "../../actions/articleActions";
import CreateArticleForm from "../views/articles/CreateArticleForm";
import HeaderComponent from "./headers/index";

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

  resetForm = () => {
    confirmAlert({
      title: "Confirm discard",
      message: "Are you sure you want to clear all fields?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.setState({
              title: "",
              description: "",
              body: "",
              tag_list: ""
            });
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };

  handleCancelCreation = () => {
    const { history } = this.props;
    history.push("/");
  }

  render() {
    const { location, auth, articles } = this.props;
    return (
      <div>
        { auth.user.username !== undefined ? (
          <div>
            <HeaderComponent location={location} />
            <CreateArticleForm
              state={this.state}
              onHandleChange={this.onHandleChange}
              onHandleEditorChange={this.onHandleEditorChange}
              handleKeyCommand={this.handleKeyCommand}
              onSubmit={this.onSubmit}
              resetForm={this.resetForm}
              handleCancelCreation={this.handleCancelCreation}
              isFetching={articles.article.isFetching}
            />

          </div>
        )
          : (
            <div>
              <HeaderComponent location={location} />
              <div clasName="container">
                <h1>Please login first</h1>
              </div>

            </div>
          )
    }
      </div>

    );
  }
}

const mapStateToProps = state => ({
  articles: state,
  auth: state.loginReducer.auth
});

const mapDispatchToProps = dispatch => ({
  actions: {
    article: bindActionCreators(ArticleActions, dispatch)
  }
});

ArticlesContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  articles: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesContainer);
