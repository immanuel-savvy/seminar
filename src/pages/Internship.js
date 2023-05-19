import React from "react";
import ReactMarkdown from "react-markdown";
import { organisation_name } from "../assets/js/utils/constants";
import { get_request } from "../assets/js/utils/services";
import Contact_us from "../components/contact_us_today";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Preview_image from "../components/preview_image";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer, { scroll_to_top } from "../sections/footer";
import Custom_nav from "../sections/nav";
import { A_tag, Img_tag } from "../sections/who_we_are";
import { H1_tag } from "./Mentorship";

class Internship extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    document.title = `Internship | ${organisation_name}`;
    scroll_to_top();

    let internship = await get_request("internship");

    console.log(internship, "HELLO");

    this.setState({ internship });
  };

  render() {
    let { internship } = this.state;
    let { sections, image, title, image_file_hash } =
      internship || new Object();

    if (!sections) sections = new Array();

    return (
      <div>
        <Custom_nav page="Internship" />
        <Padder />

        <Breadcrumb_banner
          title={title || "Welcome to our Internship Program"}
          page="Internship"
        />

        {internship ? (
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
                          image={image}
                          image_hash={image_file_hash}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {sections.slice(1).map((section, i) => {
              return (
                <section className={i % 2 ? "" : "gray"}>
                  <div className="container">
                    {section.text.split("\n").map((s, i) => (
                      <ReactMarkdown
                        key={i}
                        children={s}
                        components={{ a: A_tag, h1: H1_tag, img: Img_tag }}
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

        <Contact_us />

        <Footer />
      </div>
    );
  }
}

export default Internship;
