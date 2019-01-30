/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import {
  Header, Button, Form, Grid
} from "semantic-ui-react";

import * as profileActions from "../../../actions/profileActions";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        bio: props.profile.bio,
        company: props.profile.company,
        image: props.profile.image,
        location: props.profile.location,
        phone: props.profile.phone,
        username: props.profile.username,
        website: props.profile.website
      }
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      ...this.state,
      form: { ...this.state.form, [e.target.name]: e.target.value }
    });
  }

  onSubmit = () => {
    const { actions, username, parent } = this.props;
    const { form } = this.state;

    actions.updateProfile(username, form);
    parent.toggleEditProfile(false);
  };

  render() {
    const { form } = this.state;
    return (
      <Grid.Row className="ui container">
        <Header className="profile__info">Edit Your Profile Details</Header>
        <Form onSubmit={this.onSubmit} className="test-form">
          <Form.Field>
            <label>Bio</label>
            <input
              name="bio"
              placeholder="Enter bio ..."
              value={form.bio}
              onChange={this.onChange}
              required
            />
          </Form.Field>

          <Form.Field>
            <label>Company Name</label>
            <input
              name="company"
              placeholder="Enter your company name ..."
              value={form.company}
              onChange={this.onChange}
              required
            />
          </Form.Field>

          <Form.Field>
            <label>Location</label>
            <input
              name="location"
              placeholder="Enter your location ..."
              value={form.location}
              onChange={this.onChange}
              required
            />
          </Form.Field>

          <Form.Field>
            <label>Phone Number</label>
            <input
              name="phone"
              placeholder="Enter your phone number ..."
              value={form.phone}
              onChange={this.onChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Website</label>
            <input
              name="website"
              placeholder="Enter your website name ..."
              value={form.website}
              onChange={this.onChange}
              required
            />
          </Form.Field>

          <Button type="submit" className="btn-forms-primary" color="green" inverted>
          Update
          </Button>
        </Form>
      </Grid.Row>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  profile: state.profileReducer.profile,
  username: state.loginReducer.auth.user.username
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(profileActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
