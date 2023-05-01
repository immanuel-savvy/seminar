import React from "react";
import {
  date_string,
  time_string,
  to_title,
} from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";

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

      this.setState({ in_attendance });
    }
  };

  parse_datetime = (datetime) => {
    let date = new Date(datetime).getTime();

    return `${date_string(date)}, ${time_string(date)}`;
  };

  render() {
    let { in_attendance } = this.state;
    let { seminar, event } = this.props;
    if (!seminar) seminar = event;

    let { _id, state, date, attendees, duration, short_description } = seminar;

    return (
      <div className="col-lg-4 col-md-12 order-lg-last">
        <div className="ed_view_box style_2 border min pt-3">
          <span className="ml-3">{"Attendants"}</span>
          <div className="ed_author">
            {in_attendance ? (
              <>
                <div className="btn theme-light enroll-btn">
                  <h2
                    style={{ cursor: "pointer" }}
                    onClick={this.register_attendance}
                    className="theme-cl m-0"
                  >
                    {date + duration * 60 * 1000 < Date.now() &&
                    in_attendance.attended
                      ? "Download Certificate"
                      : date < Date.now() &&
                        date + +(duration * 60 * 1000) > Date.now()
                      ? "Join Seminar"
                      : "00:00:00"}
                  </h2>
                </div>
              </>
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
