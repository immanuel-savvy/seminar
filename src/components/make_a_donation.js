import React from "react";
import { Link } from "react-router-dom";

class Make_a_donation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { toggle } = this.props;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <div class="modal-header">
            <h5 class="modal-title">Make a Donation</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => toggle && toggle()}
            >
              <span aria-hidden="true">
                <i class="fas fa-times-circle"></i>
              </span>
            </button>
          </div>
          <div class="modal-body">
            <div class="login-form">
              <p className="lead text-center mx-5">
                Send us your donation to the below account details{" "}
              </p>

              <hr />

              <div class="">
                <div class="ml-3">
                  <h3>Account Details</h3>
                </div>

                <div class="col-12">
                  <div class="pro_product_wrap">
                    <ul>
                      <li>
                        <strong>Account Number</strong>0123456789
                      </li>
                      <li>
                        <strong>Account Name</strong>GIIT Africa
                      </li>
                      <li>
                        <strong>Bank</strong>Zenith Bank
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <hr />

              <p className="lead text-center mx-5">
                Please do leave us a message so we can express our gratitude
                towards your gesture via Email:{" "}
                <a
                  className="lead"
                  target="_blank"
                  href={`mailto://${"donations@giitfoundation.org"}`}
                >
                  donations@giitfoundation.org
                </a>{" "}
                or <Link to="/contact">Click here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Make_a_donation;
