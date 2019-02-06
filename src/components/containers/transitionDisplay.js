/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Transition, List } from "semantic-ui-react";

export default class TransitionDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentView: 1
    };

    this.renderViews = this.renderViews.bind(this);
  }

  setView(currentView) {
    // Change the display to show specified view passed as child component
    this.setState({ currentView });
  }

  renderViews() {
    const { currentView } = this.state;
    const { children } = this.props;
    // Render child components passed as props, with the addition of a link to
    // this component

    const views = React.Children.map(children, (child, index) => {
      if (currentView === (index + 1)) {
        return (
          <List.Item>
            {
              React.cloneElement(child, {
                parent: this
              })
            }
          </List.Item>
        );
      }
    });

    return views;
  }

  render() {
    return (
      <div>
        <Transition.Group
          as={List}
          animation="horizontal flip"
          duration={1000}
        >
          {this.renderViews()}
        </Transition.Group>
      </div>
    );
  }
}

TransitionDisplay.propTypes = {
  children: PropTypes.array.isRequired
};
