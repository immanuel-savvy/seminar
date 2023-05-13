import React from "react";
import Sponsors from "../sections/sponsors";
import Seminar_details from "./seminar_details";
import Seminar_media from "./seminar_media";
import Seminar_reviews from "./seminar_reviews";

class Seminar_overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { seminar, conference } = this.props;
    if (!seminar) seminar = conference;

    return (
      <div class="col-lg-8 col-md-12 order-lg-first">
        <Seminar_media seminar={seminar} />

        <Seminar_details seminar={seminar} />

        <Sponsors event={seminar} />

        <Seminar_reviews seminar={seminar} />
      </div>
    );
  }
}

export default Seminar_overview;
