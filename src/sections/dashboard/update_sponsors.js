import React from "react";
import { get_request, post_request } from "../../assets/js/utils/services";
import Checkbox from "../../components/checkbox";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Modal from "../../components/modal";
import Modal_form_title from "../../components/modal_form_title";
import Small_btn from "../../components/small_btn";
import Stretch_button from "../../components/stretch_button";
import Add_sponsor from "./add_sponsor";

class Update_sponsors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event_sponsors: new Array(),
    };
  }

  componentDidMount = async () => {
    let { event } = this.props;
    let sponsors = await get_request("sponsors");
    let event_sponsors = await get_request(`event_sponsors/${event._id}`);

    event_sponsors = Array.isArray(event_sponsors)
      ? event_sponsors.map((s) => s._id)
      : new Array();

    this.setState({ sponsors, event_sponsors });
  };

  update = async () => {
    let { event, toggle } = this.props;
    let { event_sponsors, loading } = this.state;
    if (loading) return;

    this.setState({ loading: true });

    await post_request("update_event_sponsors", {
      event: event._id,
      sponsors: event_sponsors,
    });

    toggle();
  };

  add_sponsor = () => this.sponsor_?.toggle();

  handle_sponsors = (sponsor) => {
    let { event_sponsors } = this.state;

    if (event_sponsors.includes(sponsor))
      event_sponsors.splice(event_sponsors.indexOf(sponsor), 1);
    else event_sponsors.push(sponsor);

    this.setState({ event_sponsors });
  };

  on_add = (sponsor) => {
    let { sponsors, event_sponsors } = this.state;
    sponsors = new Array(...sponsors, sponsor);
    event_sponsors = new Array(...event_sponsors, sponsor._id);

    this.setState({ sponsors, event_sponsors });
  };

  render() {
    let { toggle } = this.props;
    let { sponsors, event_sponsors, loading } = this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <Modal_form_title title="Update Event Sponsors" toggle={toggle} />

          <div class="modal-body">
            <div class="login-form">
              {sponsors ? (
                sponsors.length ? (
                  <form>
                    {sponsors.map((sponsor) => (
                      <Checkbox
                        title={sponsor.name}
                        _id={sponsor._id}
                        action={() => this.handle_sponsors(sponsor._id)}
                        checked={event_sponsors.includes(sponsor._id)}
                      />
                    ))}

                    <Stretch_button
                      loading={loading}
                      title="Update"
                      action={this.update}
                    />
                  </form>
                ) : (
                  <Small_btn title="Add Sponsor" action={this.add_sponsor} />
                )
              ) : (
                <Loadindicator />
              )}
            </div>
          </div>
        </div>

        <Modal ref={(sponsor_) => (this.sponsor_ = sponsor_)}>
          <Add_sponsor toggle={this.add_sponsor} on_add={this.on_add} />
        </Modal>
      </div>
    );
  }
}

export default Update_sponsors;
