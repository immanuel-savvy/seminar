import React from "react";
import { organisation_name } from "../assets/js/utils/constants";
import Contact_us from "../components/contact_us_today";
import Padder from "../components/padder";
import Preview_image from "../components/preview_image";
import Section_header from "../components/section_headers";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer, { scroll_to_top } from "../sections/footer";
import Custom_nav from "../sections/nav";

class Internship extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    document.title = `Internship | ${organisation_name}`;

    scroll_to_top();
  };

  render() {
    return (
      <div>
        <Custom_nav page="Internship" />
        <Padder />

        <Breadcrumb_banner
          title="Welcome to our Internship Program"
          page="Internship"
        />

        <section>
          <div className="container">
            <div className="row">
              <div className="container">
                <div className="row align-items-center justify-content-between">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="lmp_caption">
                      <p>
                        <b>Welcome to GIIT ICT Foundation Internship Program</b>
                      </p>
                      <p>
                        Our internship program is designed to provide
                        underprivileged individuals with the opportunity to gain
                        valuable work experience and develop the skills they
                        need to succeed in their careers. We believe that
                        internships are an essential part of professional
                        development, and we are committed to providing our
                        interns with hands-on experience, mentorship, and
                        training.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                    <div className="lmp_thumb">
                      <Preview_image
                        class_name="rounded"
                        style={{ width: "100%" }}
                        image={require("../assets/img/internship.jpeg")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="gray">
            <div className="container">
              <Section_header
                title="Who is"
                color_title="Eligible"
                description=""
              />

              <div className="row">
                <p>
                  Our internship program is open to individuals of all ages and
                  backgrounds, and we welcome anyone who is committed to
                  personal and professional growth. Whether you are a student
                  looking to gain work experience, a recent graduate seeking
                  your first job, or an individual looking to make a career
                  change, our internship program can help you achieve your
                  goals.
                </p>
                <p>
                  Our internships are available in a range of industries,
                  including technology, finance, healthcare, and more. We work
                  closely with our interns to develop customized plans and
                  projects that align with their interests and career goals, and
                  we provide them with the support and resources they need to
                  succeed.
                </p>
              </div>
            </div>
          </section>

          <section className="">
            <div className="container">
              <Section_header
                title="Is it"
                color_title="Paid Internship?"
                description=""
              />

              <div className="row">
                <p>
                  Our internships program comprises of paid and unpaid, we
                  believe that the experience and training our interns receive
                  are invaluable. We also offer our interns the opportunity to
                  participate in networking events, workshops, and seminars,
                  where they can connect with industry professionals and gain
                  additional skills and knowledge.
                </p>
                <p>
                  At GIIT , we are committed to making our internship program
                  accessible to everyone. We believe that everyone deserves the
                  opportunity to gain work experience and develop their skills,
                  regardless of their background or financial situation.
                </p>
                <p>
                  Thank you for your interest in the internship program at GIIT.
                  We invite you to explore our website to learn more about our
                  program and how you can get involved. Together, we can make a
                  positive impact on the lives of individuals and communities.
                </p>
                <p>
                  <a
                    className="theme-cl"
                    target="_blank"
                    href="mailto://intern@giitfoundation.org"
                  >
                    intern@giitfoundation.org
                  </a>
                </p>
              </div>
            </div>
          </section>
        </section>

        <Contact_us />

        <Footer />
      </div>
    );
  }
}

export default Internship;
