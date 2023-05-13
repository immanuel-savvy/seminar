import React from "react";
import { get_request, post_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Modal from "../../components/modal";
import Small_btn from "../../components/small_btn";
import Sponsor from "../../components/sponsor";
import Add_sponsor from "./add_sponsor";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_sponsors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let sponsors = await get_request("sponsors");

    this.setState({ sponsors });
  };

  toggle_add_sponsor = () => this.sponsor?.toggle();

  on_add = (sponsor) => {
    let { sponsor_in_edit, sponsors } = this.state;

    if (sponsor_in_edit)
      sponsors = sponsors.map((s) => (s._id === sponsor._id ? sponsor : s));
    else sponsors = new Array(sponsor, ...sponsors);

    this.setState({ sponsors });
  };

  edit = (sponsor) => {
    this.setState({ sponsor_in_edit: sponsor }, this.toggle_add_sponsor);
  };

  remove = async (sponsor) => {
    if (!window.confirm("Are you sure to remove sponsor?")) return;
    let { sponsors } = this.state;

    sponsors = sponsors.filter((s) => s._id !== sponsor._id);
    this.setState({ sponsors });

    await post_request(`remove_sponsor/${sponsor._id}`);
  };

  render() {
    let { sponsors, sponsor_in_edit } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="manage sponsors"
          right_btn={
            <Small_btn title="Add Sponsor" action={this.toggle_add_sponsor} />
          }
        />
        <div className="row justify-content-center">
          {sponsors ? (
            sponsors.length ? (
              sponsors.map((sponsor) => (
                <Sponsor
                  remove={() => this.remove(sponsor)}
                  edit={() => this.edit(sponsor)}
                  sponsor={sponsor}
                  key={sponsor._id}
                />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>

        <Modal ref={(sponsor) => (this.sponsor = sponsor)}>
          <Add_sponsor
            sponsor={sponsor_in_edit}
            on_add={this.on_add}
            toggle={this.toggle_add_sponsor}
          />
        </Modal>
      </div>
    );
  }
}

export default Manage_sponsors;
