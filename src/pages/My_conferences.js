import React from "react";
import { post_request } from "../assets/js/utils/services";
import Listempty from "../components/listempty";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Section_header from "../components/section_headers";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer, { get_session } from "../sections/footer";
import Custom_nav from "../sections/nav";
import Conference from "../components/conference";
import { Loggeduser } from "../Contexts";

class My_conferences extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    if (!this.loggeduser) this.loggeduser = get_session("loggeduser");

    let user_conferences = await post_request("user_conferences", {
      user: this.loggeduser?._id,
    });

    this.setState({ user_conferences });
  };

  render() {
    let { user_conferences } = this.state;

    let upcoming, past;
    if (user_conferences && user_conferences.length) {
      upcoming = user_conferences.find((s) => s.conference.date >= Date.now());

      past = user_conferences.find((s) => s.conference.date < Date.now());
    }

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          return (
            <div id="main-wrapper">
              <Custom_nav page="my_conferences" />
              <Padder />

              <Breadcrumb_banner page="Conferences" title="Conferences" />

              {user_conferences ? (
                user_conferences.length ? (
                  <>
                    {upcoming ? (
                      <section>
                        <Section_header title="Upcoming Conferences" />

                        <div className="row justify-content-center">
                          {user_conferences
                            .filter((s) => s.conference.date >= Date.now())
                            .map((s) => (
                              <Conference
                                loggeduser={loggeduser}
                                key={s._id}
                                conference={s.conference}
                              />
                            ))}
                        </div>
                      </section>
                    ) : null}
                    {past ? (
                      <section>
                        <Section_header title="Past Conferences" />
                        <div className="row justify-content-center">
                          {user_conferences
                            .filter((s) => s.conference.date < Date.now())
                            .map((s) => (
                              <Conference
                                key={s._id}
                                loggeduser={loggeduser}
                                conference={s.conference}
                              />
                            ))}
                        </div>
                      </section>
                    ) : null}
                  </>
                ) : (
                  <Listempty />
                )
              ) : (
                <Loadindicator />
              )}

              <Footer />
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default My_conferences;
