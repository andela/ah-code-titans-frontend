/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from "react";
import PropTypes from "prop-types";
import CKEditor from "react-ckeditor-component";

const CreateArticleForm = (props) => {
  const {
    state,
    onHandleChange,
    onHandleEditorChange,
    resetForm,
    onSubmit
  } = props;

  return (
    <div className="container">
      <div className="ui form">
        <form onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="title">Title
              <input
                type="text"
                name="title"
                value={state.title}
                onChange={onHandleChange}
                required
                placeholder="Enter a title"
              />
            </label>
          </div>
          <br />
          <div className="field">
            <label htmlFor="description">Description
              <input
                type="text"
                name="description"
                value={state.description}
                onChange={onHandleChange}
                required
                placeholder="What's this article about?"
              />
            </label>
          </div>
          <br />
          <div className="field">
            <label htmlFor="body">Write your story
              <CKEditor
                content={state.body}
                events={{
                  change: onHandleEditorChange
                }}
              />
            </label>
          </div>
          <br />
          <div className="field">
            <label htmlFor="tags">
              <div className="ui right labeled left icon input">
                <i className="tags icon" />
                <input
                  type="text"
                  name="tag_list"
                  placeholder="Enter tags separated by commas"
                  required
                  value={state.tag_list}
                  onChange={onHandleChange}
                />
                <a className="ui tag label">
               Add Tag
                </a>
              </div>
            </label>
          </div>
          <br />
          <div className="center_content">
            <div className="ui buttons ">
              <button type="button" className="ui button" onClick={resetForm}>Discard</button>
              <div className="or" />
              <button type="submit" className="ui positive button">Publish Article</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

CreateArticleForm.propTypes = {
  state: PropTypes.object.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  onHandleEditorChange: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default CreateArticleForm;
