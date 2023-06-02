import React from "react";
import { domain, post_request } from "../../assets/js/utils/services";
import Alert_box from "../../components/alert_box";
import Handle_file_upload from "../../components/handle_file_upload";
import Modal_form_title from "../../components/modal_form_title";
import Stretch_button from "../../components/stretch_button";

class Event_highlights extends Handle_file_upload {
  constructor(props) {
    super(props);

    let { event } = this.props;

    this.state = {
      images: event?.highlights?.images || new Array(),
      video: event?.highlights?.video,
    };
  }

  handle_images = async (e) => {
    this.handle_file(
      e,
      null,
      null,
      () => {
        let { file, images, filename, file_hash } = this.state;

        images = new Array({ url: file, file_hash, filename }, ...images);

        this.setState({ images });
      },
      true
    );
  };

  remove_image = (img) => {
    let { images } = this.state;

    images = images.filter((image) => {
      return image.url !== img.url && image.filename !== img.filename;
    });
    this.setState({ images });
  };

  submit = async () => {
    let { video, images, loading } = this.state;
    let { event, toggle } = this.props;

    if (loading) return;

    this.setState({ loading: true });
    let res = await post_request("update_event_highlight", {
      video,
      images,
      event: event._id,
    });

    if (res?._id) toggle();
    else
      this.setState({
        loading: false,
        message: "Cannot update event hightlight at the moment",
      });
  };

  render() {
    let { toggle } = this.props;
    let { video, images, message, loading } = this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <Modal_form_title title="Event Highlight" toggle={toggle} />
          <div class="modal-body">
            <div class="login-form">
              <form>
                <div className="row justify-content-between">
                  <div className="form-group smalls">
                    <label>Video Highlight</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="https://www.youtube.com/watch?v=ExXhmuH-cw8"
                      value={video}
                      onChange={({ target }) =>
                        this.setState({ video: target.value })
                      }
                    />
                  </div>

                  <div className="form-group smalls">
                    <label>Image (1200 x 800)*</label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        accept="image/*"
                        onChange={this.handle_images}
                      />
                      <label className="custom-file-label" for="customFile">
                        Choose file
                      </label>
                    </div>
                    <div style={{ overflow: "scroll" }}>
                      {images.map(({ url, filename }) => (
                        <span>
                          <img
                            className="py-3 rounded"
                            style={{
                              maxHeight: 200,
                              maxWidth: 200,
                              marginRight: 10,
                            }}
                            src={
                              url && url.startsWith("data")
                                ? url
                                : `${domain}/images/${url}`
                            }
                          />
                          <a
                            onClick={() => this.remove_image({ url, filename })}
                            className="btn btn-action"
                          >
                            <i className={`fas fa-window-close`}></i>
                          </a>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {message ? <Alert_box message={message} /> : null}
                <Stretch_button
                  title="Update"
                  loading={loading}
                  disabled={!video && !images.length}
                  action={this.submit}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Event_highlights;
