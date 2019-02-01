import React from "react";
import PropTypes from "prop-types";

const ShareArticle = (props) => {
  const { handleSocialShare } = props;
  return (
    <div>
      <div>
        <p id="share-text"><b>Share this article.</b></p>
      </div>
      <div className="ui icon">
        <button onClick={() => handleSocialShare("facebook")} type="button" value="facebook" className="ui circular facebook icon button">
          <i className="facebook icon" value="facebook" />
        </button>
        <button onClick={() => handleSocialShare("twitter")} type="button" value="twitter" className="ui circular twitter icon button">
          <i className="twitter icon" />
        </button>
        <button onClick={() => handleSocialShare("linkedin")} type="button" value="linkedin" className="ui circular linkedin icon button">
          <i className="linkedin icon" />
        </button>
        <button onClick={() => handleSocialShare("email")} type="button" value="mail" className="ui circular mail icon button">
          <i className="mail icon" />
        </button>
      </div>
    </div>
  );
};

ShareArticle.propTypes = {
  handleSocialShare: PropTypes.func.isRequired
};

export default ShareArticle;
