import React from "react";
import { client_domain } from "../assets/js/utils/constants";
import Preview_image from "../components/preview_image";
import Section_header from "../components/section_headers";
import Small_btn from "../components/small_btn";

class Who_we_are extends React.Component {
  constructor(props) {
    super(props);

    let { about } = this.props;
    this.state = { about };
  }

  componentDidMount = async () => {};

  render() {
    let { home } = this.props;
    let { about } = this.state;

    let { about_statement, datails_text, image, image_file_hash, bullets } =
      about || new Object();

    if (!home)
      datails_text =
        datails_text ||
        `With a focus on cutting-edge topics and emerging trends, our seminars provide attendees with valuable insights, practical skills, and transformative experiences. Whether you are a student, professional, entrepreneur, or lifelong learner, our foundation welcomes you to join our community of like-minded individuals driven by a thirst for knowledge and a desire to make a positive impact.

    Through our commitment to excellence, we strive to deliver seminars that empower individuals to reach their full potential, challenge conventional thinking, and drive positive change in their lives and communities. We believe that education is the key to personal and societal growth, and our foundation is dedicated to providing a platform where learning becomes a transformative journey.
    
    Join us on this exciting quest for knowledge, as we embark together on a mission to build a brighter future through education and inspiration. Together, let's unlock the power of seminars and pave the way for meaningful change.`;

    return (
      <>
        <section>
          <div className="container">
            {home ? (
              <Section_header
                title="Who we are"
                description="Discover who we are, our values, and how we can partner with you to navigate the ever-evolving landscape of business and technology."
              />
            ) : null}

            <div className="row align-items-center justify-content-between">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="lmp_caption">
                  {home ? null : (
                    <>
                      <span className="theme-cl">About Us</span>
                      <h2 className="mb-3">What We Do & Our Aim</h2>
                    </>
                  )}
                  <p>{about_statement}</p>

                  {bullets
                    ? bullets.map((bull, i) => (
                        <div key={i} className="mb-3 mr-4 ml-lg-0 mr-lg-4">
                          <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                              <i className="fas fa-check"></i>
                            </div>
                            <h6 className="mb-0 ml-3">{bull}</h6>
                          </div>
                        </div>
                      ))
                    : null}

                  {home ? (
                    <Small_btn
                      title="Learn More"
                      action={() =>
                        window.location.assign(`${client_domain}/about`)
                      }
                    />
                  ) : null}
                </div>
              </div>

              <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                <div className="lmp_thumb">
                  <Preview_image image={image} image_hash={image_file_hash} />
                </div>
              </div>
            </div>
          </div>
          {home ? null : (
            <div className="container mt-5">
              {datails_text.split("\n").map((t, index) => (
                <p key={index}>{t}</p>
              ))}
            </div>
          )}
        </section>
      </>
    );
  }
}

export default Who_we_are;
