import React from "react";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Seminar_header from "../components/seminar_header";
import Seminar_overview from "../components/seminar_overview";
import Seminar_sidebar from "../components/seminar_sidebar";
import { Loggeduser } from "../Contexts";
import Footer, { get_session } from "../sections/footer";
import Custom_nav from "../sections/nav";
import { get_request } from "../assets/js/utils/services";

class Seminar_detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let seminar = get_session("seminar");

    if (!seminar) {
      let seminar_id = window.location.search.slice(1);
      if (!seminar_id) return window.history.go(-1);

      seminar = await get_request(`seminar/${seminar_id}`);
      if (!seminar) return window.history.go(-1);
    }

    this.setState({ seminar });
  };

  render() {
    let { seminar } = this.state;
    if (!seminar) return <Loadindicator />;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          return (
            <div>
              <Custom_nav page="seminar" />
              <Padder />

              <Seminar_header seminar={seminar} />

              <section class="gray pt-5">
                <div class="container">
                  <div class="row">
                    <Seminar_overview seminar={seminar} />

                    <Seminar_sidebar
                      seminar={seminar}
                      loggeduser={loggeduser}
                    />
                  </div>
                </div>
              </section>

              <Footer />
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Seminar_detail;
