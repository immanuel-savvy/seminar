import React from "react";
import { organisation_name } from "../assets/js/utils/constants";
import Contact_us from "../components/contact_us_today";
import Padder from "../components/padder";
import Preview_image from "../components/preview_image";
import Section_header from "../components/section_headers";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer, { scroll_to_top } from "../sections/footer";
import Custom_nav from "../sections/nav";

class Mentorship extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    document.title = `Mentorship | ${organisation_name}`;

    scroll_to_top();
  };

  render() {
    return (
      <div>
        <Custom_nav page="Mentorship" />
        <Padder />

        <Breadcrumb_banner
          title="Welcome to our Mentorship Program"
          page="Mentorship"
        />

        <section>
          <div className="container">
            <div className="row">
              <div className="container">
                <div className="row align-items-center justify-content-between">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="lmp_caption">
                      <p>
                        <b>
                          Welcome to the Mentorship Program of GIIT ICT
                          Foundation
                        </b>
                      </p>
                      <p>
                        Our mentorship program is designed to provide
                        underprivileged individuals with the support and
                        guidance they need to achieve their goals and reach
                        their full potential. We believe that mentorship is a
                        powerful tool for personal and professional growth, and
                        we are committed to connecting individuals with
                        experienced mentors who can offer valuable insights and
                        advice.
                      </p>
                      <p>
                        Our program is open to individuals of all ages and
                        backgrounds, and we welcome anyone who is committed to
                        personal and professional growth. Whether you are a
                        student looking to explore new career paths, a young
                        professional seeking guidance and support, or an
                        individual looking to make a change in your life, our
                        mentorship program can help you achieve your goals.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                    <div className="lmp_thumb">
                      <Preview_image
                        class_name="rounded"
                        style={{ width: "100%" }}
                        image={require("../assets/img/mentorship.webp")}
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
                title="Our"
                color_title="Mentors"
                description=""
              />

              <div className="row">
                <p>
                  Our mentors are experienced professionals from a range of
                  industries, including technology, finance, healthcare, and
                  more. They are committed to providing personalized support and
                  guidance to their mentees, and they work closely with them to
                  develop customized plans and strategies for success.
                </p>
                <p>
                  We offer both one-on-one and group mentorship opportunities,
                  and we encourage our mentees to take an active role in their
                  own growth and development. We believe that mentorship is a
                  collaborative process, and we work closely with our mentees to
                  ensure that they are getting the support and guidance they
                  need to achieve their goals.
                </p>
              </div>
            </div>
          </section>

          <section className="">
            <div className="container">
              <Section_header
                title="It's"
                color_title="Free-of-Charge"
                description=""
              />

              <div className="row">
                <p>
                  Our mentorship program is free of charge, and we are committed
                  to making it accessible to everyone. We believe that everyone
                  deserves the opportunity to reach their full potential, and we
                  are proud to offer a program that can help individuals achieve
                  their goals and make positive changes in their lives.
                </p>
                <p>
                  Our mentorship program is free of charge, and we are committed
                  to making it accessible to everyone. We believe that everyone
                  deserves the opportunity to reach their full potential, and we
                  are proud to offer a program that can help individuals achieve
                  their goals and make positive changes in their lives.
                </p>
                <p>
                  Become a mentee, send mail to{" "}
                  <a
                    className="theme-cl"
                    target="_blank"
                    href="mailto://mentee@giitfoundation.org"
                  >
                    mentee@giitfoundation.org
                  </a>
                </p>
                <p>
                  To mentor our students, send mail to{" "}
                  <a
                    className="theme-cl"
                    href="mailto://mentor@giitfoundation.org"
                    target="_blank"
                  >
                    mentor@giitfoundation.org
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

export default Mentorship;
