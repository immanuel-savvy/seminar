import React from "react";
import { date_string, to_title } from "../assets/js/utils/functions";
import Alert_box from "./alert_box";
import Small_btn from "./small_btn";

class Talk extends React.Component {
  constructor(props) {
    super(props);

    let { talk } = this.props;
    let { approved, declined } = talk;

    this.state = {
      approved,
      declined,
    };
  }

  on_approve = () => {
    let { talk, approve } = this.props;

    approve(talk, () => this.setState({ approved: true }));
  };

  on_decline = () => {
    let { talk, decline } = this.props;

    decline(talk, () => this.setState({ declined: true }));
  };

  render() {
    let { approved, declined } = this.state;
    let { talk } = this.props;
    let { category, description, title, user, proposed_time } = talk;
    let { email, firstname, lastname } = user;

    return (
      <div class="col-md-6 col-xl-4 col-sm-12 single_items lios_item">
        <div class="_testimonial_wrios shadow_none">
          <h2>{title}</h2>
          <p>
            Proposed Time:{" "}
            <b>{proposed_time ? date_string(proposed_time) : "Anytime"}</b>
          </p>

          <div class="facts-detail">
            <p>{description}</p>
          </div>

          <hr />
          <div class="_testimonial_flex">
            <div class="_testimonial_flex_first">
              <div class="_tsl_flex_thumb">
                <img
                  src="https://via.placeholder.com/500x500"
                  class="img-fluid"
                  alt=""
                />
              </div>
              <div class="_tsl_flex_capst">
                <h5>{`${firstname} ${lastname}`}</h5>
                <div class="_ovr_posts">
                  <span>{email}</span>
                </div>
                <div class="_ovr_rates">{to_title(category)}</div>
              </div>
            </div>
          </div>

          <hr />
          <small>Admin Action</small>
          <br />

          {approved ? (
            <Alert_box message="Approved!" type="info" />
          ) : declined ? (
            <Alert_box message="Declined!" type="warning" />
          ) : (
            <>
              <Small_btn title="Approve" action={this.on_approve} />
              <Small_btn
                title="Decline"
                variant="danger"
                action={this.on_decline}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Talk;
