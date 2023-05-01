import React from "react";
import { post_request } from "../assets/js/utils/services";
import Listempty from "../components/listempty";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Section_header from "../components/section_headers";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer, { get_session } from "../sections/footer";
import Custom_nav from "../sections/nav";
import Seminar from "../components/seminar";
import { Loggeduser } from "../Contexts";

class My_seminars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    if (!this.loggeduser) this.loggeduser = get_session("loggeduser");

    let user_seminars = await post_request("user_seminars", {
      user: this.loggeduser?._id,
    });

    this.setState({ user_seminars });
  };

  render() {
    let { user_seminars } = this.state;

    let upcoming, past;
    if (user_seminars && user_seminars.length) {
      upcoming = user_seminars.find((s) => s.seminar.date >= Date.now());

      past = user_seminars.find((s) => s.seminar.date < Date.now());
    }

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          return (
            <div id="main-wrapper">
              <Custom_nav page="my_seminars" />
              <Padder />

              <Breadcrumb_banner page="Seminars" title="Seminars" />

              {user_seminars ? (
                user_seminars.length ? (
                  <>
                    {upcoming ? (
                      <section>
                        <Section_header title="Upcoming Seminars" />

                        <div className="row justify-content-center">
                          {user_seminars
                            .filter((s) => s.seminar.date >= Date.now())
                            .map((s) => (
                              <Seminar
                                loggeduser={loggeduser}
                                key={s._id}
                                seminar={s.seminar}
                              />
                            ))}
                        </div>
                      </section>
                    ) : null}
                    {past ? (
                      <section>
                        <Section_header title="Past Seminars" />
                        <div className="row justify-content-center">
                          {user_seminars
                            .filter((s) => s.seminar.date < Date.now())
                            .map((s) => (
                              <Seminar
                                key={s._id}
                                loggeduser={loggeduser}
                                seminar={s.seminar}
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

export default My_seminars;
