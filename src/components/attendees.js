import React from "react";
import { to_title } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import Listempty from "./listempty";
import Loadindicator from "./loadindicator";
import Modal_form_title from "./modal_form_title";
import Small_btn from "./small_btn";
import User from "./user";

class Attendees extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active_tab: this.tabs[0],
    };
  }

  fetch_attendees = async (active_tab) => {
    let { seminar } = this.props;
    let attendees = await post_request("attendees", {
      seminar: seminar._id,
      query: { attended: active_tab === this.tabs[1] },
    });

    this.setState({ attendees, active_tab });
  };

  componentDidMount = async () => {
    await this.fetch_attendees(this.state.active_tab);
  };

  tabs = new Array("registered", "attended");

  render() {
    let { toggle } = this.props;
    let { attendees, active_tab } = this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <Modal_form_title title="Attendees" toggle={toggle} />

          <div class="modal-body">
            {this.tabs.map((tab) => (
              <Small_btn
                key={tab}
                disabled={tab === active_tab}
                title={to_title(tab)}
                action={() => this.fetch_attendees(tab)}
              />
            ))}

            {attendees ? (
              attendees.length ? (
                <div class="login-form">
                  {attendees.map((attendee) => (
                    <User user={attendee.user} key={attendee._id} />
                  ))}
                </div>
              ) : (
                <Listempty />
              )
            ) : (
              <Loadindicator />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Attendees;
