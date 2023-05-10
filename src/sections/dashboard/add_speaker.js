import React from "react";
import { domain, post_request } from "../../assets/js/utils/services";
import Handle_file_upload from "../../components/handle_file_upload";
import Loadindicator from "../../components/loadindicator";
import Modal_form_title from "../../components/modal_form_title";
import Stretch_button from "../../components/stretch_button";

class Add_speaker extends Handle_file_upload {
  constructor(props) {
    super(props);

    let { speaker } = this.props;
    this.state = { fullname: "", organisation: "", position: "", ...speaker };
  }

  add = async () => {
    let { toggle, on_add } = this.props;
    let {
      fullname,
      linkedin,
      image,
      image_file_hash,
      position,
      organisation,
      _id,
    } = this.state;
    this.setState({ loading: true });

    let cat = {
      fullname: fullname.trim(),
      _id,
      image,
      image_file_hash,
      linkedin,
      position,
      organisation,
    };

    let result = await post_request(
      _id ? "update_speaker" : "add_speaker",
      cat
    );

    if (result && result._id) {
      cat._id = result._id;
      cat.image = result.image;
      cat.created = result.created;

      on_add(cat);
      toggle();
    } else {
      this.setState({
        message:
          (result && result.message) || "Cannot create speaker at the moment.",
        loading: false,
      });
    }
  };

  render() {
    let { toggle } = this.props;
    let {
      fullname,
      linkedin,
      loading,
      organisation,
      position,
      _id,
      image,
      image_file_loading,
    } = this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <Modal_form_title title="Add Team Member" toggle={toggle} />

          <div class="modal-body">
            <div class="login-form">
              <form>
                <div className="form-group smalls">
                  <label>Picture*</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      accept="image/*"
                      onChange={(e) =>
                        this.handle_file(e, "image", null, null, true)
                      }
                    />
                    <label className="custom-file-label" for="customFile">
                      Choose Image
                    </label>
                  </div>
                  {image_file_loading ? (
                    <Loadindicator />
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <span>
                        <img
                          className="py-3 rounded"
                          style={{
                            maxHeight: 200,
                            maxWidth: 200,
                            marginRight: 10,
                          }}
                          src={
                            image && image.startsWith("data")
                              ? image
                              : `${domain}/images/${image}`
                          }
                        />
                      </span>
                    </div>
                  )}
                </div>

                <div class="form-group">
                  <label>Full Name</label>
                  <div class="input-with-icon">
                    <input
                      type="text"
                      class="form-control"
                      value={fullname}
                      onChange={({ target }) =>
                        this.setState({
                          fullname: target.value,
                          message: "",
                        })
                      }
                      placeholder="Full Name"
                    />
                    <i class="ti-text"></i>
                  </div>
                </div>

                <div class="form-group">
                  <label>Linked In</label>
                  <div class="input-with-icon">
                    <input
                      type={"text"}
                      class="form-control"
                      placeholder="https://linkedin.com/lola-gray"
                      value={linkedin}
                      onChange={({ target }) =>
                        this.setState({
                          linkedin: target.value,
                          message: "",
                        })
                      }
                    />
                    <i class="ti-link"></i>
                  </div>
                </div>

                <div class="form-group">
                  <label>Organisation</label>
                  <div class="">
                    <input
                      type={"text"}
                      class="form-control"
                      placeholder="Organisation"
                      value={organisation}
                      onChange={({ target }) =>
                        this.setState({
                          organisation: target.value,
                          message: "",
                        })
                      }
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label>Position</label>
                  <div class="">
                    <input
                      type={"text"}
                      class="form-control"
                      placeholder="Position"
                      value={position}
                      onChange={({ target }) =>
                        this.setState({
                          position: target.value,
                          message: "",
                        })
                      }
                    />
                  </div>
                </div>

                <div class="form-group">
                  <Stretch_button
                    disabled={
                      !fullname.trim() ||
                      !position.trim() ||
                      !organisation.trim() ||
                      !linkedin.trim()
                    }
                    loading={loading}
                    title={_id ? "Update" : "Add"}
                    action={this.add}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add_speaker;
