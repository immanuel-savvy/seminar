import React from "react";
import Alert_box from "../components/alert_box";
import Make_a_donation from "../components/make_a_donation";
import Modal from "../components/modal";
import Preview_image from "../components/preview_image";
import Section_header from "../components/section_headers";
import Small_btn from "../components/small_btn";

class Donations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  toggle = () => this.donation?.toggle();

  render() {
    let { donated } = this.state;

    return (
      <section className="">
        <Section_header
          title="Make a Difference,"
          color_title="Support Our Cause"
        />

        <div className="container">
          <div className="row justify-content-between align-items-center ">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
              <div className="lmp_caption">
                <p className="lead text-justify">
                  At GIIT, we believe that education is the key to breaking the
                  cycle of poverty and improving the quality of life for
                  individuals and communities. With your support, we can
                  continue to provide access to quality education, training, and
                  skill development programs for underprivileged communities.
                </p>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
              <div className="lmp_thumb">
                <Preview_image
                  class_name="rounded"
                  style={{ width: "100%" }}
                  image={require("../assets/img/donations.webp")}
                />
              </div>
            </div>
          </div>
          <div className="row ">
            <p className="lead text-justify">
              Your donation will go a long way in helping us to achieve our
              mission and provide life-changing opportunities to those who need
              it most. Every dollar counts and will be used to support our
              educational initiatives, provide training and employability
              skills, and expand access to education for underprivileged
              communities.
            </p>

            <p className="lead text-justify">
              We offer several ways to donate, including online through our
              secure donation page on our website. We also accept donations by{" "}
              <a
                className="theme-cl"
                href="mailto://donations@giitfoundation.org"
                target="_blank"
              >
                mail
              </a>{" "}
              or phone, and we are happy to answer any questions you may have
              about our programs or how to donate.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 40,
              }}
            >
              {donated ? (
                <Alert_box
                  message={
                    "We have recieve your proposal, and will get in touch with you soon"
                  }
                  type="info"
                />
              ) : (
                <Small_btn title="Make a Donation" action={this.toggle} />
              )}
            </div>
          </div>
        </div>

        <Modal ref={(donation) => (this.donation = donation)}>
          <Make_a_donation toggle={this.toggle} />
        </Modal>
      </section>
    );
  }
}

export default Donations;
