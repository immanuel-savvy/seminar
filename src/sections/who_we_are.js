import React from "react";
import Preview_image from "../components/preview_image";
import Section_header from "../components/section_headers";

class Who_we_are extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { home, about } = this.props;
    console.log(about);

    let { about_statement, image, image_file_hash, bullets } =
      about || new Object();

    return (
      <>
        <section>
          <div className="container">
            {home ? (
              <Section_header
                title="Who we are"
                description="Commodo commodo sint incididunt esse aliqua est eu laboris ea Lorem pariatur."
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
                </div>
              </div>

              <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                <div className="lmp_thumb">
                  <Preview_image image={image} image_hash={image_file_hash} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Who_we_are;
