import React from "react";
import ReactMarkdown from "react-markdown";
import { organisation_name } from "../assets/js/utils/constants";
import Contact_us from "../components/contact_us_today";
import Padder from "../components/padder";
import Preview_image from "../components/preview_image";
import Section_header from "../components/section_headers";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer, { scroll_to_top } from "../sections/footer";
import Custom_nav from "../sections/nav";
import { default as Sponsors_section } from "../sections/sponsors";

class Sponsors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    document.title = `Sponsors | ${organisation_name}`;

    scroll_to_top();
  };

  why_sponsor = new Array(
    "Recognition on our website and social media channels",
    "Opportunity to promote your brand at our events and initiatives",
    "Opportunity to engage with our audience and network with other sponsors",
    "Opportunity to demonstrate your commitment to social responsibility and community development",
    "Free SEO Packages for your business",
    "Free Website for your business",
    "An award from our foundation"
  );

  render() {
    let text = ``;

    return (
      <div>
        <Custom_nav page="speakers" />
        <Padder />

        <Breadcrumb_banner title="Sponsors" page="Sponsors" />

        <section>
          <div className="container">
            <Section_header title="Dear Prospective" color_title="Sponsor" />

            <div className="row">
              <div className="container">
                <div className="row align-items-center justify-content-between">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="lmp_caption">
                      <p>
                        We are pleased to invite you to become a sponsor of GIIT
                        ICT Foundation, a not-for-profit education society
                        dedicated to positively impacting the underprivileged
                        through educational initiatives and employability skill
                        development programs.
                      </p>
                      <p>
                        At GIIT, we believe that education is the key to
                        breaking the cycle of poverty and improving the quality
                        of life for individuals and communities. With your
                        support, we can continue to provide access to quality
                        education, training, and skill development programs for
                        underprivileged communities.
                      </p>
                      <p>
                        As a sponsor of GIIT, your support will help us to
                        achieve our mission and provide life-changing
                        opportunities to those who need it most. Your generous
                        contribution will be used to support our educational
                        initiatives, provide training and employability skills,
                        and expand access to education for underprivileged
                        communities.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                    <div className="lmp_thumb">
                      <Preview_image
                        class_name="rounded"
                        style={{ width: "100%" }}
                        image={require("../assets/img/sponsorship.jpeg")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <section className="gray">
            <div className="container">
              <Section_header
                title="Why Sponsor"
                color_title="Us"
                description=""
              />

              <div className="row">
                <p>
                  As a sponsor, you will have the opportunity to showcase your
                  brand to a diverse audience of industry professionals,
                  community leaders, and individuals interested in making a
                  positive impact in their communities.
                </p>

                <p>
                  Our sponsorship packages offer a range of benefits, including:
                </p>

                {this.why_sponsor.map((s, i) => {
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
                  We would be happy to work with you to customize a sponsorship
                  package that meets your unique needs and goals. Please feel
                  free to contact us to discuss your sponsorship options.{" "}
                  <a
                    href="mailto://sponsor@giitfoundation.org"
                    className="theme-cl"
                    target="_blank"
                  >
                    sponsor@giitfoundation.org
                  </a>
                </p>
                <p>
                  Thank you for your consideration and support. Together, we can
                  make a positive impact on the lives of individuals and
                  communities.
                </p>
              </div>
            </div>
          </section>
        </section>

        <Sponsors_section />

        <Contact_us />
        <Footer />
      </div>
    );
  }
}

export default Sponsors;
