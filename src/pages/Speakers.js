import React from "react";
import ReactMarkdown from "react-markdown";
import { organisation_name } from "../assets/js/utils/constants";
import { get_request } from "../assets/js/utils/services";
import Alert_box from "../components/alert_box";
import Contact_us from "../components/contact_us_today";
import Loadindicator from "../components/loadindicator";
import Modal from "../components/modal";
import Padder from "../components/padder";
import Preview_image from "../components/preview_image";
import Section_header from "../components/section_headers";
import Small_btn from "../components/small_btn";
import Speaker from "../components/speaker";
import Submit_a_talk from "../components/submit_a_talk";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer, { scroll_to_top } from "../sections/footer";
import Custom_nav from "../sections/nav";

class Speakers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    document.title = `Speakers | ${organisation_name}`;

    scroll_to_top();

    let speakers = await get_request("speakers");
    this.setState({ speakers });
  };

  submit_a_talk = () => this.talk?.toggle();

  fields = new Array(
    "Your name, title, and organization",
    "A brief bio and summary of your experience and expertise",
    "A title and brief description of your proposed talk",
    "A brief outline of your talk and key takeaways for the audience",
    "Any additional information or resources that you would like to provide"
  );

  render() {
    let { speakers, talking } = this.state;

    return (
      <div>
        <Custom_nav page="speakers" />
        <Padder />

        <Breadcrumb_banner title="Dear Speaker" page="Speakers" />

        <section>
          <div className="container">
            {/* <Section_header title="Dear" color_title="Speaker" /> */}

            <div className="row">
              <div className="container">
                <div className="row align-items-center justify-content-between">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="lmp_caption">
                      <p>
                        Thank you for your interest in submitting a talk for
                        GIIT ICT Foundation. We are always looking for industry
                        professionals, educators, and community leaders to share
                        their knowledge, expertise, and insights with our
                        audience.
                      </p>
                      <p>
                        At GIIT Foundation, we are dedicated to positively
                        impacting the underprivileged through educational
                        initiatives and employability skill development
                        programs. We believe that education is the key to
                        breaking the cycle of poverty and improving the quality
                        of life for individuals and communities.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                    <div className="lmp_thumb">
                      <Preview_image
                        class_name="rounded"
                        style={{ width: "100%" }}
                        image={require("../assets/img/submit_a_talk.png")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <section className="">
            <div className="container">
              <Section_header
                title="Become a"
                color_title="Speaker"
                description=""
              />

              <div className="row">
                <p>
                  Our seminars, conferences, and training programs cover a range
                  of topics, including cyber security, AI, machine learning,
                  cloud computing, data science, software, UI/UX design, and
                  more. We are always interested in hearing from experts who are
                  passionate about sharing their knowledge and experiences with
                  our audience.
                </p>

                <p>
                  To submit a talk, please provide us with the following
                  information:
                </p>

                {this.fields.map((s, i) => {
                  return (
                    <div className="mb-3 mr-4 ml-lg-0 mr-lg-4" key={i}>
                      <div className="d-flex align-items-center">
                        <div className="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                          <i className="fas fa-check"></i>
                        </div>
                        <span className="mb-0 ml-3">
                          <ReactMarkdown children={s} />
                        </span>
                      </div>
                    </div>
                  );
                })}

                <p>
                  Once we have received your submission, we will review it and
                  get back to you as soon as possible. We appreciate your
                  interest in speaking at GIIT ICT Foundation and look forward
                  to hearing from you.{" "}
                  <a
                    href="mailto://speaker@giitfoundation.org"
                    className="theme-cl"
                    target="_blank"
                  >
                    speaker@giitfoundation.org
                  </a>
                </p>
                <p>
                  Thank you for your support and commitment to education and
                  community development.
                </p>
              </div>
            </div>
          </section>
        </section>

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

        {speakers ? (
          speakers.length ? (
            <section>
              <div className="container">
                <Section_header
                  title="our"
                  color_title="Speakers"
                  description="Discover our Speakers featuring renowned industry experts, thought leaders, and innovators. "
                />

                <div className="row align-items-center justify-content-center">
                  {speakers.map((speaker) => (
                    <Speaker speaker={speaker} key={speaker._id} />
                  ))}
                </div>
              </div>
            </section>
          ) : null
        ) : (
          <Loadindicator contained />
        )}

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
