import React from "react";
import { organisation_name } from "../assets/js/utils/constants";
import Contact_us from "../components/contact_us_today";
import Padder from "../components/padder";
import Section_header from "../components/section_headers";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Custom_nav from "../sections/nav";

class Sponsors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    document.title = `Sponsors | ${organisation_name}`;
  };

  render() {
    return (
      <div>
        <Custom_nav page="speakers" />
        <Padder />

        <Breadcrumb_banner title="Upcoming Sponsors" page="Sponsors" />

        <section>
          <div className="container">
            <Section_header
              title="Unleash Your "
              color_title="Potential"
              description="Immerse yourself in engaging keynote speeches, thought-provoking panel discussions, interactive workshops, and networking opportunities that foster connections and collaborations."
            />

            <div className="row align-items-center justify-content-center"></div>
          </div>
        </section>

        <Contact_us />
        <Footer />
      </div>
    );
  }
}

export default Sponsors;
