import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  commalise_figures,
  date_string,
  time_string,
  to_title,
} from "../assets/js/utils/functions";
import Text_btn from "./text_btn";

class Seminar_sidebar extends React.Component {
  constructor(props) {
    super(props);

    let { in_attendance, ticket_code } = this.props;

    this.state = { in_attendance: in_attendance || ticket_code };
  }

  redeem_voucher = () => this.redeem_voucher_?.toggle();

  transfer_voucher = () => this.transfer_voucher_?.toggle();

  componentDidMount = async () => {};

  purchase_voucher = () => this.purchase_voucher_?.toggle();

  toggle_ticket_codes = () => this.codes?.toggle();

  parse_datetime = (datetime) => {
    let date = new Date(datetime).getTime();

    return `${date_string(date)}, ${time_string(date)}`;
  };

  render() {
    let { in_attendance } = this.state;
    let { seminar, event } = this.props;
    if (!seminar) seminar = event;

    let {
      value,
      actual_price,
      _id,
      state,
      date,
      attendees,
      short_description,
    } = seminar;

    return (
      <div className="col-lg-4 col-md-12 order-lg-last">
        <div className="ed_view_box style_2 border min pt-3">
          <span className="ml-3">{"Attendants"}</span>
          <div className="ed_author">
            {in_attendance ? (
              Array.isArray(in_attendance) && in_attendance.length > 1 ? (
                <>
                  <span style={{ fontSize: 18 }}>
                    <span>Quantity:</span>{" "}
                    <span>
                      <b>{in_attendance.length}</b>
                    </span>
                  </span>
                  &nbsp; &nbsp;
                  <div>
                    <Text_btn
                      text="View ticket codes"
                      style={{ fontWeight: "bold" }}
                      action={this.toggle_ticket_codes}
                    />
                  </div>
                  <br />
                </>
              ) : (
                <>
                  <CopyToClipboard
                    text={
                      state !== "unused"
                        ? null
                        : Array.isArray(in_attendance)
                        ? in_attendance[0]
                        : in_attendance
                    }
                  >
                    <h2 style={{ cursor: "pointer" }} className="theme-cl m-0">
                      {in_attendance}&nbsp;&nbsp;
                      {state !== "unused" ? (
                        <div className="crs_cates cl_1">
                          <span>{state}</span>
                        </div>
                      ) : (
                        <span>
                          <i
                            style={{
                              color: "rgb(30, 144, 255, 0.8)",
                              fontSize: 22,
                            }}
                            className="fas fa-copy"
                          ></i>
                        </span>
                      )}
                    </h2>
                  </CopyToClipboard>
                </>
              )
            ) : (
              <h2 className="theme-cl m-0">
                &#8358;{commalise_figures(value)}
                {actual_price ? (
                  <span className="old_prc">
                    &#8358;{commalise_figures(actual_price)}
                  </span>
                ) : null}
              </h2>
            )}
          </div>
          {in_attendance ? (
            state !== "unused" ? null : (
              <div className="ed_view_link">
                <a
                  href="#"
                  onClick={this.redeem_voucher}
                  class="btn theme-light enroll-btn"
                >
                  Redeem Voucher<i class="ti-angle-right"></i>
                </a>
                <a
                  href="#"
                  onClick={this.transfer_voucher}
                  class="btn theme-light enroll-btn"
                >
                  Transfer Ownership<i class="ti-angle-right"></i>
                </a>
              </div>
            )
          ) : (
            <div className="ed_view_link">
              <a
                href="#"
                onClick={this.purchase_voucher}
                className="btn theme-bg enroll-btn"
              >
                {/* {is_event ? "Buy Ticket" : "Get Voucher"} */}
                <i className="ti-angle-right"></i>
              </a>
            </div>
          )}
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
