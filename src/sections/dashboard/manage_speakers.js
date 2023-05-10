import React from "react";
import { get_request, post_request } from "../../assets/js/utils/services";
import Listempty from "../../components/listempty";
import Loadindicator from "../../components/loadindicator";
import Modal from "../../components/modal";
import Small_btn from "../../components/small_btn";
import Speaker from "../../components/speaker";
import Add_speaker from "./add_speaker";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_speakers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let speakers = await get_request("speakers");

    if (!Array.isArray(speakers)) speakers = new Array();

    this.setState({ speakers });
  };

  toggle_add_speaker = () => this.speaker?.toggle();

  on_add = (speaker) => {
    let { speakers, speaker_in_edit } = this.state;

    if (speaker_in_edit)
      speakers = speakers.map((speaker_) =>
        speaker_._id === speaker_in_edit._id ? speaker : speaker_
      );
    else speakers = new Array(speaker, ...speakers);

    this.setState({
      speakers,
      speaker_in_edit: null,
    });
  };

  edit = (speaker) => {
    this.setState({ speaker_in_edit: speaker }, this.toggle_add_speaker);
  };

  remove = async (speaker) => {
    let { speakers } = this.state;

    if (!window.confirm("Are you sure to remove speaker?")) return;

    speakers = speakers.filter((speaker_) => speaker_._id !== speaker._id);
    this.setState({ speakers });

    await post_request(`remove_speaker/${speaker._id}`);
  };

  render() {
    let { speakers, speaker_in_edit } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="manage speakers"
          right_btn={
            <Small_btn title="Add Speaker" action={this.toggle_add_speaker} />
          }
        />
        <div className="row justify-content-center">
          {speakers ? (
            speakers.length ? (
              speakers.map((speaker) => (
                <Speaker
                  speaker={speaker}
                  edit={this.edit}
                  remove={this.remove}
                  key={speaker._id}
                />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>

        <Modal ref={(speaker) => (this.speaker = speaker)}>
          <Add_speaker
            speaker={speaker_in_edit}
            on_add={this.on_add}
            toggle={this.toggle_add_speaker}
          />
        </Modal>
      </div>
    );
  }
}

export default Manage_speakers;
