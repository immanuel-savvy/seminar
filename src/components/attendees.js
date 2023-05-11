import React from "react";
import { search_object, to_title } from "../assets/js/utils/functions";
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
    let { seminar, conference } = this.props;
    if (!seminar) seminar = conference;

    let attendees = await post_request("attendees", {
      [seminar._id.startsWith("seminar") ? "seminar" : "conference"]:
        seminar._id,
      query: { attended: active_tab === this.tabs[1] },
    });
    this.og = attendees;

    this.setState({ attendees, active_tab });
  };

  componentDidMount = async () => {
    await this.fetch_attendees(this.state.active_tab);
  };

  tabs = new Array("registered", "attended");

  search = () => {
    let { search_param, attendees } = this.state;

    attendees = this.og.filter((a) => search_object(a, search_param || ""));

    this.setState({ attendees });
  };

  render() {
    let { toggle } = this.props;
    let { attendees, active_tab, search_param } = this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <Modal_form_title title="Attendees" toggle={toggle} />

          <div className="row align-items-center m-4">
            <div className="form-group mr-0 pr-0 col-8">
              <div className="input-with-icon">
                <input
                  type="text"
                  className="form-control"
                  autoFocus
                  placeholder={`Search`}
                  value={search_param}
                  onChange={({ target }) =>
                    this.setState(
                      {
                        search_param: target.value,
                      },
                      this.search
                    )
                  }
                />
                <i className="ti-search"></i>
              </div>
            </div>
            {/* <div className="form-group col-4">
              <Small_btn title="Search" action={this.search} />
            </div> */}
          </div>

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
