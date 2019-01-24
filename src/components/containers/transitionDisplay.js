import React, { Component } from "react";
import PropTypes from "prop-types";
import { Transition } from "semantic-ui-react";

export default class TransitionDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentView: 1
    };

    this.renderViews = this.renderViews.bind(this);
  }

  setView(currentView) {
    this.setState({ currentView });
  }

  renderViews() {
    const { currentView } = this.state;
    const { children } = this.props;

    const views = React.Children.map(children, (child, index) => (
      <Transition
        unmountOnHide
        transitionOnMount
        visible={currentView === (index + 1)}
        animation="fade"
        duration={0}
      >
        {
            React.cloneElement(child, {
              parent: this
            })
        }
      </Transition>
    ));

    return views;
  }

  render() {
    return (
      <div>
        {this.renderViews()}
      </div>
    );
  }
}

TransitionDisplay.propTypes = {
  children: PropTypes.array.isRequired
};
