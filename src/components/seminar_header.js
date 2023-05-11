import React from "react";
import { date_string, time_string } from "../assets/js/utils/functions";
import Preview_image from "../components/preview_image";

class Seminar_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handle_speaker = () => {
    let { speaker_linkedin } = this.props.seminar;

    window.open(speaker_linkedin);
  };

  parse_duration = (duration) => {
    let hours = Math.floor(duration / 60);
    let minutes = duration - hours * 60;

    let str = "";
    if (hours) str += `${hours} Hours `;
    str += `${minutes} Mins`;

    return str;
  };

  render() {
    let { seminar, conference } = this.props;
    if (!seminar) seminar = conference;

    let {
      title,
      attendees,
      category,
      speaker,
      speaker_image,
      speaker_image_hash,
      _id,
      date,
      duration,
    } = seminar;

    return (
      <div className="ed_detail_head">
        <div className="container">
          <div className="row align-items-center justify-content-between mb-2">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12">
              <div className="dlkio_452">
                <div className="ed_detail_wrap">
                  <div className="crs_cates cl_1">
                    <span>{category}</span>
                  </div>

                  <div className="ed_header_caption">
                    <h2 className="ed_title">{title}</h2>
                  </div>
                  <div className="d-flex align-items-center mt-4">
                    <div className="rounded-circle d-flex align-items-center justify-content-center cursor-pointer">
                      <Preview_image
                        image={
                          speaker_image ||
                          require(`../assets/img/user_image_placeholder.png`)
                        }
                        action={this.handle_speaker}
                        image_hash={speaker_image_hash}
                        class_name="img img-fluid circle"
                        height={70}
                        width={70}
                      />
                    </div>
                    <div className="ml-2 ml-md-3">
                      <span>Speaker</span>
                      <h6
                        onClick={this.handle_speaker}
                        style={{ cursor: "pointer" }}
                        className="m-0"
                      >
                        {speaker}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-5 col-md-5 col-sm-12">
              <ul className="row p-0">
                <li className="col-lg-6 col-md-6 col-sm-6 pt-2 pb-2">
                  <i className="fas fa-star mr-1 text-warning"></i>
                  <span>4.9 Star (5,254)</span>
                </li>
                <li className="col-lg-6 col-md-6 col-sm-6 pt-2 pb-2">
                  <i className="fas fa-clock mr-1 text-success"></i>
                  <span>
                    {this.parse_duration(duration)}, <br />
                  </span>
                </li>
                <li className="col-lg-6 col-md-6 col-sm-6 pt-2 pb-2">
                  <i className="fas fa-user mr-1 text-info"></i>
                  <span>{attendees || 0} Attendants</span>
                </li>
                <li className="col-lg-6 col-md-6 col-sm-6 pt-2 pb-2">
                  <i className="fas fa-calendar mr-1 text-success"></i>
                  <span>
                    {date_string(date)} {time_string(date)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Seminar_header;
