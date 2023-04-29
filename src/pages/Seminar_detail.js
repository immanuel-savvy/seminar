import React from "react";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Seminar_header from "../components/seminar_header";
import Seminar_overview from "../components/seminar_overview";
import Seminar_sidebar from "../components/seminar_sidebar";
import Footer, { get_session } from "../sections/footer";
import Custom_nav from "../sections/nav";

class Seminar_detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let seminar = get_session("seminar");
    this.setState({ seminar });
  };

  render() {
    let { seminar } = this.state;
    if (!seminar) return <Loadindicator />;

    return (
      <div>
        <Custom_nav page="seminar" />
        <Padder />

        <Seminar_header seminar={seminar} />

        <section class="gray pt-5">
          <div class="container">
            <div class="row">
              <Seminar_overview seminar={seminar} />

              <Seminar_sidebar seminar={seminar} />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

export default Seminar_detail;
