import React from "react";
import { post_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Talk from "../../components/talk";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Pending_talks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let talks = await post_request("pending_talks");

    if (!Array.isArray(talks)) talks = new Array();

    this.setState({ talks });
  };

  on_add = (talk) => {
    let { talks, talk_in_edit } = this.state;

    if (talk_in_edit)
      talks = talks.map((talk) =>
        talk._id === talk_in_edit._id ? talk : talk
      );
    else talks = new Array(talk, ...talks);

    this.setState({
      talks,
      talk_in_edit: null,
    });
  };

  decline = async (talk, cb) => {
    if (!window.confirm("Are you sure to decline talk?")) return;

    await post_request(`decline_talk/${talk._id}`);

    cb && cb();
  };

  approve = async (talk, cb) => {
    await post_request(`approve_talk/${talk._id}`);

    cb && cb();
  };

  render() {
    let { talks } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="pending talks" />
        <div className="row justify-content-center">
          {talks ? (
            talks.length ? (
              talks.map((talk) => (
                <Talk
                  approve={this.approve}
                  decline={this.decline}
                  talk={talk}
                  key={talk._id}
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

export default Pending_talks;
