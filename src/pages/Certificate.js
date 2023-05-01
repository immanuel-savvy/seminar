import React from "react";
import "../assets/css/cert.css";
import { to_title } from "../assets/js/utils/functions";
import { get_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";

class Certificate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let path = window.location.pathname;

    path = path.split("/");
    let user = path.slice(-1)[0];
    let seminar = path[2];

    user = await get_request(`user/${user}`);
    seminar = await get_request(`seminar/${seminar}`);

    this.setState({ user, seminar });
  };

  render() {
    let { user, seminar } = this.state;

    if (!user || !seminar) return <Loadindicator />;

    let { firstname, lastname } = user;

    return (
      <div className="cert_body">
        <div className="certificate">
          <div className="certificate-content">
            <h1 className="certificate-title">Certificate of Achievement</h1>
            <p>This is to certify that</p>
            <h2 className="recipient-name">
              {to_title(`${firstname} ${lastname}`)}
            </h2>
            <p>has successfully completed the course on</p>
            <h3 className="course-name">Web Development</h3>
            <p>conducted by</p>
            <h4 className="organization-name">ABC Company</h4>
            <p>on</p>
            <h5 className="completion-date">June 1, 2023</h5>
          </div>
          <div className="certificate-footer">
            <p className="signature">Signature</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Certificate;
