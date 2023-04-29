import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import {
  commalise_figures,
  date_string,
  time_string,
} from "../assets/js/utils/functions";
import { save_to_session, scroll_to_top } from "../sections/footer";
import Modal from "./modal";
import Preview_image from "./preview_image";
import Text_btn from "./text_btn";
import Attendees from "./attendees";
import { post_request } from "../assets/js/utils/services";
import Login from "./login";

class Seminar extends React.Component {
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

  toggle_Attendees = () => this.attendees?.toggle();

  toggle_login = () => this.login?.toggle();

  register_attendance = async (loggeduser) => {
    let { seminar } = this.props;

    if (!loggeduser) return this.toggle_login();

    let result = await post_request("register_attendance", {
      seminar: seminar._id,
      user: loggeduser._id,
    });

    result && this.setState({ in_attendance: true });
  };

  render() {
    let { full, in_attendance } = this.state;
    let {
      seminar,
      edit,
      ticket,
      class_name,
      in_seminars,
      loggeduser,
      ticket_code,
    } = this.props;
    if (!seminar) return;

    let {
      title,
      speaker,
      speaker_linkedin,
      images,
      short_description,
      date,
      category,
      speaker_image,
      speaker_image_hash,
      attendees,
    } = seminar;

    return (
      <div
        className={
          class_name ||
          (in_seminars
            ? "col-xl-6 col-lg-6 col-md-6 col-sm-12"
            : "col-xl-4 col-lg-4 col-md-6 col-sm-12")
        }
      >
        <div className="crs_grid">
          <div className="crs_grid_thumb">
            <Link
              to="/seminar"
              onClick={() => {
                save_to_session("seminar", {
                  ...seminar,
                  attendees,
                  ticket_code,
                  ticket,
                });
                scroll_to_top();
              }}
              className="crs_detail_link"
            >
              <Preview_image
                image={images[0].url || require("../assets/img/vouchers1.png")}
                image_hash={images[0].image_hash}
                class_name="img img-fluid rounded"
              />
            </Link>

            {edit ? (
              <div className="crs_video_ico cursor-pointer" onClick={edit}>
                <i className={`fa fa-edit`}></i>
              </div>
            ) : null}
          </div>
          <div className="crs_grid_caption">
            <div className="crs_flex">
              <div className="crs_fl_first">
                <div className="crs_cates cl_8">
                  <span>{category}</span>
                </div>
              </div>
              <div className="crs_fl_last">
                <div
                  onClick={edit ? this.toggle_Attendees : null}
                  style={edit ? { cursor: "pointer" } : null}
                  className="crs_inrolled"
                >
                  <strong>{commalise_figures(attendees || 0, true)}</strong>
                  Attendants
                </div>
              </div>
            </div>
            <div className="crs_title">
              <h4>
                <Link
                  to="/seminar"
                  onClick={() => {
                    save_to_session("seminar", {
                      ...seminar,
                      attendees,
                      ticket_code,
                      ticket,
                    });
                    scroll_to_top();
                  }}
                  className="crs_title_link"
                >
                  {title}
                </Link>
              </h4>
            </div>
            <p
              className="cursor-pointer"
              onClick={() => this.setState({ full: !this.state.full })}
            >
              {full ? short_description : short_description.slice(0, 70)}
            </p>
            <p>
              <i className="fas fa-map-marker"></i> <b>Google Meet</b>
            </p>

            <div class="crs_info_detail">
              <ul>
                <i class="fa fa-clock text-danger"></i>&nbsp;&nbsp;
                <span>{this.parse_datetime(date)}</span>
              </ul>
            </div>
          </div>

          <div className="crs_grid_foot">
            <div className="crs_flex">
              <div className="crs_fl_first">
                <div className="crs_tutor">
                  <div className="crs_tutor_thumb">
                    <a href={speaker_linkedin} target="_blank">
                      <Preview_image
                        class_name="img-fluid circle"
                        style={{ height: 30, width: 30 }}
                        image={
                          speaker_image ||
                          require("../assets/img/user_image_placeholder.png")
                        }
                        image_hash={speaker_image_hash}
                      />
                    </a>
                  </div>
                  <div className="crs_tutor_name">
                    <a href={speaker_linkedin} target="_blank">
                      {speaker}
                    </a>
                  </div>
                </div>
              </div>
              <div className="crs_fl_last">
                <div className="crs_price">
                  {in_attendance ? (
                    <h3 className="cursor-pointer">
                      <span className="theme-cl">00:00:00</span>
                    </h3>
                  ) : (
                    <h3
                      className="cursor-pointer"
                      onClick={() => this.register_attendance(loggeduser)}
                    >
                      <span className="theme-cl">Register</span>
                    </h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal ref={(login) => (this.login = login)}>
          <Login
            toggle={this.toggle_login}
            action={this.register_attendance}
            no_redirect
          />
        </Modal>

        <Modal ref={(attendees) => (this.attendees = attendees)}>
          <Attendees seminar={seminar} toggle={this.toggle_Attendees} />
        </Modal>
      </div>
    );
  }
}

export default Seminar;
