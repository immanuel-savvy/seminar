import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import {
  date_string,
  time_string,
  to_title,
} from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import Countdown from "./countdown";
import Login from "./login";
import Modal from "./modal";

class Seminar_sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { loggeduser, seminar, conference } = this.props;
    if (!seminar) seminar = conference;

    let is_seminar = seminar?._id.startsWith("seminar");

    if (loggeduser) {
      let in_attendance = await post_request(
        is_seminar ? "in_attendance" : "in_conference_attendance",
        {
          user: loggeduser._id,
          [is_seminar ? "seminar" : "conference"]: seminar._id,
        }
      );

      this.setState({ in_attendance, in_meeting: in_attendance?.attended });
    }
  };

  parse_datetime = (datetime) => {
    let date = new Date(datetime).getTime();

    return `${date_string(date)}, ${time_string(date)}`;
  };

  register_attendance = async (loggeduser) => {
    let { seminar, conference } = this.props;
    if (!seminar) seminar = conference;

    let is_seminar = seminar?._id.startsWith("seminar");

    if (!loggeduser) return this.login?.toggle();

    let result = await post_request(
      is_seminar ? "register_attendance" : "register_conference_attendance",
      {
        [is_seminar ? "seminar" : "conference"]: seminar._id,
        user: loggeduser._id,
      }
    );

    result && this.setState({ in_attendance: true });
  };

  join_meeting = async (loggeduser) => {
    let { seminar, conference } = this.props;
    if (!seminar) seminar = conference;

    let is_seminar = seminar?._id.startsWith("seminar");

    let { _id, meet_link } = seminar;

    await post_request("attended", {
      user: loggeduser._id,
      [is_seminar ? "seminar" : "conference"]: _id,
    });
    this.setState({ in_meeting: true });
    window.open(meet_link);
  };

  get_certificate = (loggeduser) => {
    let { seminar, conference } = this.props;
    if (!seminar) seminar = conference;

    if (loggeduser)
      window.location.href = `${client_domain}/certificate/${seminar._id}/${loggeduser._id}`;
  };

  render() {
    let { in_attendance } = this.state;
    let { seminar, conference, in_meeting, loggeduser } = this.props;
    if (!seminar) seminar = conference;

    let { date, attendees, duration, short_description, _id, meet_link } =
      seminar;

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
            ) : date < Date.now() ? null : (
              <>
                <div className="btn theme-light enroll-btn">
                  <h2
                    style={{ cursor: "pointer" }}
                    onClick={() => this.register_attendance(loggeduser)}
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
              <h5 className="font-medium">{`What this ${
                _id?.startsWith("seminar") ? "seminar" : "conference"
              } is about:`}</h5>
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
                  <strong>
                    {meet_link?.includes("youtube")
                      ? to_title("Youtube Live")
                      : to_title("Google Meet")}
                  </strong>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Modal ref={(login) => (this.login = login)}>
          <Login
            no_redirect
            action={this.register_attendance}
            toggle={() => this.login?.toggle()}
          />
        </Modal>
      </div>
    );
  }
}

export default Seminar_sidebar;
