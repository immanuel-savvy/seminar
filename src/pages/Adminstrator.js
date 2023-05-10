import React from "react";
import { organisation_name } from "../assets/js/utils/constants";
import Padder from "../components/padder";
import { Logged_admin } from "../Contexts";
import Admin_login from "../sections/dashboard/admin_login";
import Dashboard_navbar from "../sections/dashboard/dashboard_navbar";
import Manage_about_statement from "../sections/dashboard/manage_about_statement";
import Manage_articles from "../sections/dashboard/manage_articles";
import Manage_seminars from "../sections/dashboard/manage_seminars";
import Manage_speakers from "../sections/dashboard/manage_speakers";
import Manage_team from "../sections/dashboard/manage_team";
import Manage_testimonials from "../sections/dashboard/manage_testimonials";
import Manage_testimonial_overview from "../sections/dashboard/manage_testimonial_overview";
import Manage_vision_mission_statement from "../sections/dashboard/manage_vision_mission_statement";
import New_article from "../sections/dashboard/new_article";
import Pending_reviews from "../sections/dashboard/pending_reviews";
import Pending_talks from "../sections/dashboard/pending_talks";
import Footer, { scroll_to_top } from "../sections/footer";
import Nav from "../sections/nav";
import { emitter } from "../Seminar";

class Adminstrator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_nav: "manage_seminars",
    };
  }

  componentDidMount = () => {
    document.title = `Dashboard | ${organisation_name}`;

    this.dash_nav_click = (nav_title) =>
      this.setState({ current_nav: nav_title }, scroll_to_top);

    emitter.listen("dash_nav_click", this.dash_nav_click);

    let logged_admin = window.sessionStorage.getItem("logged_admin");
    if (logged_admin) {
      logged_admin = JSON.parse(logged_admin);
      this.log_admin(logged_admin);
    }
  };

  componentWillUnmount = () => {
    emitter.remove_listener("dash_nav_click", this.dash_nav_click);
  };

  nav_et_component = () =>
    new Object({
      manage_seminars: <Manage_seminars />,
      manage_speakers: <Manage_speakers />,
      manage_team: <Manage_team />,
      pending_talks: <Pending_talks />,
      about_statement: <Manage_about_statement />,
      manage_articles: <Manage_articles />,
      new_article: <New_article />,
      manage_testimonials: <Manage_testimonials />,
      pending_testimonies: <Pending_reviews />,
      testimonial_overview: <Manage_testimonial_overview />,
      vision_mission_statement: <Manage_vision_mission_statement />,
    });

  render() {
    let { current_nav } = this.state;

    return (
      <Logged_admin.Consumer>
        {({ admin_logged, log_admin }) => {
          this.log_admin = log_admin;

          return admin_logged ? (
            <div id="main-wrapper">
              <Nav page="dashboard" />
              <Padder />
              <div className="clearfix"></div>
              <section className="gray pt-4">
                <div className="container-fluid">
                  <div className="row">
                    <Dashboard_navbar admin={admin_logged} />
                    {this.nav_et_component()[current_nav] || null}
                  </div>
                </div>
              </section>

              <Footer />
            </div>
          ) : (
            <Admin_login log_admin={log_admin} />
          );
        }}
      </Logged_admin.Consumer>
    );
  }
}

export default Adminstrator;
