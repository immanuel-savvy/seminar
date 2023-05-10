import React from "react";
import Alert_box from "../components/alert_box";
import Make_a_donation from "../components/make_a_donation";
import Modal from "../components/modal";
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
          <div className="row justify-content-center">
            <div className="justify-content-center">
              <p className="lead text-center">
                Your generous contributions enable us to continue our mission
                and bring about meaningful change in our community and beyond.
                By donating to our cause, you join a community of like-minded
                individuals who are passionate about making a difference.
              </p>

              <p className="lead text-center">
                Every donation, big or small, plays a vital role in supporting
                our initiatives, programs, and projects. Together, we can create
                a better future and empower those in need. Whether it's
                providing educational opportunities, supporting vital research,
                or offering assistance to those facing challenges, your
                contribution directly contributes to positive change.{" "}
              </p>

              <p className="lead text-center">
                Join us in our mission to make a lasting impact. Your support
                matters, and together, we can create a brighter tomorrow. Thank
                you for considering a donation and for being part of our journey
                towards a better world.
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
        </div>

        <Modal ref={(donation) => (this.donation = donation)}>
          <Make_a_donation toggle={this.toggle} />
        </Modal>
      </section>
    );
  }
}

export default Donations;
