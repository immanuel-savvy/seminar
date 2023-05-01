import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import {
  date_string,
  time_string,
  to_title,
} from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import Countdown from "./countdown";

class Seminar_sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { loggeduser, seminar } = this.props;
    if (loggeduser) {
      let in_attendance = await post_request("in_attendance", {
        user: loggeduser._id,
        seminar: seminar._id,
      });

      this.setState({ in_attendance, in_meeting: in_attendance?.attended });
    }
  };

  parse_datetime = (datetime) => {
    let date = new Date(datetime).getTime();

    return `${date_string(date)}, ${time_string(date)}`;
  };

  register_attendance = async (loggeduser) => {
    let { seminar } = this.props;

    if (!loggeduser) return this.toggle_login();

    let result = await post_request("register_attendance", {
      seminar: seminar._id,
      user: loggeduser._id,
    });

    result && this.setState({ in_attendance: true });
  };

  join_meeting = async (loggeduser) => {
    let { seminar } = this.props;
    let { _id, meet_link } = seminar;

    await post_request("attended", { user: loggeduser._id, seminar: _id });
    this.setState({ in_meeting: true });
    window.open(meet_link);
  };

  get_certificate = (loggeduser) => {
    let { seminar } = this.props;

    if (loggeduser)
      window.location.href = `${client_domain}/certificate/${seminar._id}/${loggeduser._id}`;
  };

  render() {
    let { in_attendance } = this.state;
    let { seminar, in_meeting } = this.props;

    let { date, attendees, duration, short_description } = seminar;

    return (
      <div className="col-lg-4 col-md-12 order-lg-last">
        <div className="ed_view_box style_2 border min pt-3">
          <span className="ml-3">{"Attendants"}</span>
          <div className="ed_author">
            {in_attendance === "fetching" ? null : in_attendance ? (
              date < Date.now() ? (
                date + duration * 60 * 1000 > Date.now() ? (
                  in_meeting ? (
                    <div className="btn theme-light enroll-btn">
                      <h2
                        style={{ cursor: "pointer" }}
                        onClick={this.in_meeting}
                        className="theme-cl m-0"
                      >
                        In Meeting
                      </h2>
                    </div>
                  ) : (
                    <div className="btn theme-light enroll-btn">
                      <h2
                        style={{ cursor: "pointer" }}
                        onClick={this.join_meeting}
                        className="theme-cl m-0"
                      >
                        Join Meeting
                      </h2>
                    </div>
                  )
                ) : (
                  <div className="btn theme-light enroll-btn">
                    <h2
                      style={{ cursor: "pointer" }}
                      onClick={this.get_certificate}
                      className="theme-cl m-0"
                    >
                      {in_attendance?.attended ? "Get Certificate" : ""}
                    </h2>
                  </div>
                )
              ) : (
                <h2 style={{ cursor: "pointer" }} className="theme-cl m-0">
                  <Countdown date={date} />
                </h2>
              )
            ) : (
              <>
                <div className="btn theme-light enroll-btn">
                  <h2
                    style={{ cursor: "pointer" }}
                    onClick={this.register_attendance}
                    className="theme-cl m-0"
                  >
                    Register
                  </h2>
                </div>
              </>
            )}
          </div>

          <div className="ed_view_features">
            <div className="eld mb-3">
              <h5 className="font-medium">{"What this seminar is about:"}</h5>
              <p>{short_description}</p>
            </div>
            <div className="eld mb-3">
              <ul className="edu_list right">
                <li>
                  <i className="ti-time"></i>
                  {"Attendants"}:<strong>{attendees}</strong>
                </li>

                <li>
                  <i className="ti-calendar"></i>
                  Date and Time
                  <strong>{this.parse_datetime(date)}</strong>
                </li>

                <li>
                  <i className="ti-map"></i>Location:
                  <strong>{to_title("Google Meet")}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Seminar_sidebar;
