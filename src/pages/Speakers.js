import React from "react";
import { organisation_name } from "../assets/js/utils/constants";
import { get_request } from "../assets/js/utils/services";
import Alert_box from "../components/alert_box";
import Contact_us from "../components/contact_us_today";
import Listempty from "../components/listempty";
import Loadindicator from "../components/loadindicator";
import Modal from "../components/modal";
import Padder from "../components/padder";
import Section_header from "../components/section_headers";
import Small_btn from "../components/small_btn";
import Speaker from "../components/speaker";
import Submit_a_talk from "../components/submit_a_talk";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Custom_nav from "../sections/nav";

class Speakers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    document.title = `Speakers | ${organisation_name}`;

    let speakers = await get_request("speakers");
    this.setState({ speakers });
  };

  submit_a_talk = () => this.talk?.toggle();

  render() {
    let { speakers, talking } = this.state;

    return (
      <div>
        <Custom_nav page="speakers" />
        <Padder />

        <Breadcrumb_banner title="Our Hosts" page="Speakers" />

        {speakers ? (
          <section>
            <div className="container">
              <Section_header
                title="our"
                color_title="Speakers"
                description="Discover our Speakers featuring renowned industry experts, thought leaders, and innovators. "
              />

              <div className="row align-items-center justify-content-center">
                {speakers.length ? (
                  speakers.map((speaker) => (
                    <Speaker speaker={speaker} key={speaker._id} />
                  ))
                ) : (
                  <Listempty />
                )}
              </div>
            </div>
          </section>
        ) : (
          <Loadindicator contained />
        )}

        <section className="gray">
          <Section_header
            title="Share your expertise:"
            color_title="Submit a Talk"
          />

          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-8 col-sm-12  justify-content-center">
                <p className="lead text-center">
                  We invite you to contribute to our seminar by sharing your
                  knowledge and expertise. This is your chance to be a part of
                  our dynamic speaker lineup and deliver a captivating talk that
                  will inspire and educate our audience. Whether you have a
                  groundbreaking idea, an innovative solution, or a unique
                  perspective to share, we welcome your submission. Join us in
                  shaping the conversation and making a lasting impact in your
                  industry. Submit your talk now and be a standout presenter at
                  our seminar.
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 40,
                  }}
                >
                  {talking ? (
                    <Alert_box
                      message={
                        "We have recieve your proposal, and will get in touch with you soon"
                      }
                      type="info"
                    />
                  ) : (
                    <Small_btn
                      title="Submit a Talk"
                      action={this.submit_a_talk}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Contact_us />

        <Footer />

        <Modal ref={(talk) => (this.talk = talk)}>
          <Submit_a_talk
            toggle={this.submit_a_talk}
            on_submit={() => this.setState({ talking: true })}
          />
        </Modal>
      </div>
    );
  }
}

export default Speakers;
