import React from "react";
import { client_domain } from "../../assets/js/utils/constants";
import { post_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Conference from "../../components/conference";
import Small_btn from "../../components/small_btn";
import { emitter } from "../../Seminar";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_conferences extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let conferences = await post_request("conferences");

    this.setState({ conferences });
  };

  edit = (conference) => {
    emitter.emit("edit_conference", conference);
  };

  remove = async (conference_id) => {
    if (!window.confirm("Are you sure to remove conference?")) return;

    let { conferences } = this.state;

    conferences = conferences.filter((s) => s._id !== conference_id);

    this.setState({ conferences });

    await post_request(`remove_conference/${conference_id}`);
  };

  render() {
    let { conferences } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="conferences"
          right_btn={
            <Small_btn
              title="New Conference"
              action={() =>
                window.location.assign(`${client_domain}/new_conference`)
              }
            />
          }
        />

        <div className="row">
          {conferences ? (
            conferences.length ? (
              conferences.map((conference) => (
                <Conference
                  conference={conference}
                  in_conferences
                  remove={() => this.remove(conference._id)}
                  edit={() => this.edit(conference)}
                  key={conference._id}
                />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>
      </div>
    );
  }
}

export default Manage_conferences;
