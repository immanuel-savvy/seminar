import React from "react";
import Preview_image from "./preview_image";

class Sponsor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { sponsor } = this.props;

    let { logo, logo_hash, url } = sponsor;

    if (!logo) return;

    return (
      <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">
        <div class="crs_partn">
          <div class="p-3">
            <a href={url} target="_blank">
              <Preview_image
                image={logo}
                image_hash={logo_hash}
                class_name="img-fluid"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Sponsor;
