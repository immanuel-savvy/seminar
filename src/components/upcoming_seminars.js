import React from "react";
import Loadindicator from "./loadindicator";
import Seminar from "./seminar";
import { post_request } from "../assets/js/utils/services";
import Explore_more from "./explore_more";

class Upcoming_seminars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let upcoming_seminars = await post_request("seminars", {
      query: { date: { $gt: Date.now() } },
      limit: 10,
    });
    this.setState({ upcoming_seminars });
  };

  render() {
    let { loggeduser } = this.props;
    let { upcoming_seminars } = this.state;
    if (upcoming_seminars && !upcoming_seminars.length) return;

    return (
      <>
        <section>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-8">
                <div className="sec-heading center">
                  <h2>
                    upcoming <span className="theme-cl">Seminars</span>
                  </h2>
                  <p>The best lectures' happening now</p>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <>
                {upcoming_seminars ? (
                  upcoming_seminars.map((seminar) => (
                    <Seminar
                      loggeduser={loggeduser}
                      seminar={seminar}
                      key={seminar._id}
                    />
                  ))
                ) : (
                  <div
                    style={{ width: "100%" }}
                    className="justify-content-center"
                  >
                    <Loadindicator />
                  </div>
                )}
              </>
            </div>
            {upcoming_seminars && upcoming_seminars.length ? (
              <Explore_more to="seminars?upcoming" />
            ) : null}
          </div>
        </section>
      </>
    );
  }
}

export default Upcoming_seminars;
