import React from "react";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Seminar_header from "../components/seminar_header";
import Seminar_overview from "../components/seminar_overview";
import Seminar_sidebar from "../components/seminar_sidebar";
import { Loggeduser } from "../Contexts";
import Footer, { get_session } from "../sections/footer";
import Custom_nav from "../sections/nav";

class Conference extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let conference = get_session("conference");
    this.setState({ conference });
  };

  render() {
    let { conference } = this.state;
    if (!conference) return <Loadindicator />;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          return (
            <div>
              <Custom_nav page="conference" />
              <Padder />

              <Seminar_header conference={conference} />

              <section class="gray pt-5">
                <div class="container">
                  <div class="row">
                    <Seminar_overview conference={conference} />

                    <Seminar_sidebar
                      conference={conference}
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

export default Conference;
