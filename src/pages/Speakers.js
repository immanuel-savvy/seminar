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
import { A_tag, Img_tag } from "../sections/who_we_are";
import { H1_tag } from "./Mentorship";
import { Li_tag } from "./Sponsors";

class Speakers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    document.title = `Speakers | ${organisation_name}`;

    scroll_to_top();

    let speakers_page = await get_request("speakers_page");
    this.setState({ speakers_page });

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
    let { speakers, talking, speakers_page } = this.state;
    let { sections, image, title, image_file_hash } =
      speakers_page || new Object();

    if (!sections) sections = new Array();

    return (
      <div>
        <Custom_nav page="speakers" />
        <Padder />

        <Breadcrumb_banner title={title || "Dear Speaker"} page="Speakers" />

        {speakers_page ? (
          <section>
            <div className="container">
              <div className="row">
                <div className="container">
                  <div className="row align-items-center justify-content-between">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                      <div className="lmp_caption">
                        {sections[0]?.text?.split("\n").map((s, i) => (
                          <ReactMarkdown
                            key={i}
                            children={s}
                            components={{ a: A_tag, h1: H1_tag, img: Img_tag }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                      <div className="lmp_thumb">
                        <Preview_image
                          class_name="rounded"
                          style={{ width: "100%" }}
                          image_hash={image_file_hash}
                          image={image}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {sections.slice(1).map((section, i) => {
              return (
                <section>
                  <div className="container">
                    {section.text.split("\n").map((s, i) => (
                      <ReactMarkdown
                        key={i}
                        children={s}
                        components={{
                          a: A_tag,
                          h1: H1_tag,
                          img: Img_tag,
                          li: Li_tag,
                        }}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </section>
        ) : (
          <Loadindicator />
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
