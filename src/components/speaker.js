import React from "react";
import { to_title } from "../assets/js/utils/functions";
import Preview_image from "./preview_image";
import Text_btn from "./text_btn";

class Speaker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { speaker, edit, remove } = this.props;
    if (!speaker) return;

    let { fullname, position, organisation, linkedin, image, image_file_hash } =
      speaker;

    return (
      <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
        <div class="crs_trt_grid">
          <div class="crs_trt_thumb circle">
            <a href={linkedin} target="_blank" class="crs_trt_thum_link">
              <Preview_image
                image_hash={image_file_hash}
                style={{ height: 100, width: 100 }}
                image={
                  image || require("../assets/img/user_image_placeholder.png")
                }
                class_name="img-fluid circle"
              />
            </a>
          </div>
          <div class="crs_trt_caption">
            <div class="instructor_tag dark">
              <span>{to_title(organisation)}</span>
            </div>
            <br />
            <div class="trt_rate_inf">
              <span class="alt_rates">({to_title(position)})</span>
            </div>
            <br />
            <div class="instructor_title">
              <h4>
                <a href={linkedin} target="_blank">
                  {to_title(fullname)}
                </a>
              </h4>
            </div>
            {/* <div class="trt_rate_inf">
          <span class="alt_rates">(244 Reviews)</span>
        </div> */}
          </div>

          {edit || remove ? (
            <div class="crs_trt_footer">
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {edit && <Text_btn text="Edit" action={() => edit(speaker)} />}
                {remove && (
                  <Text_btn text="Remove" action={() => remove(speaker)} />
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Speaker;
