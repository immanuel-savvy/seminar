import React from "react";
import { domain } from "../../assets/js/utils/constants";
import { get_request, post_request } from "../../assets/js/utils/services";
import Alert_box from "../../components/alert_box";
import Handle_file_upload from "../../components/handle_file_upload";
import Loadindicator from "../../components/loadindicator";
import Stretch_button from "../../components/stretch_button";
import Text_btn from "../../components/text_btn";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_sponsors_page extends Handle_file_upload {
  constructor(props) {
    super(props);

    this.state = {
      sections: new Array(),
      title: "Sponsors",
    };
  }

  componentDidMount = async () => {
    let sponsors = await get_request("sponsors_page");

    this.setState({ ...sponsors, sponsors });
  };

  set_section = (text, index) => {
    let { sections } = this.state;
    sections[index].text = text;

    this.setState({ sections });
  };

  add_section = (type) => {
    let { sections } = this.state;
    sections.push({ type, text: "" });
    this.setState({ sections });
  };

  remove_section = (index) => {
    let { sections } = this.state;
    sections.splice(index, 1);

    this.setState({ sections });
  };

  submit = async () => {
    let { sections, image, image_file_hash, title, sponsors } = this.state;
    if (!sponsors) return;

    this.setState({ updating: true, message: null });

    sponsors = { sections, image, image_file_hash, title };

    let res = await post_request("update_sponsors", sponsors);

    this.setState({
      updating: false,
      image: res?.image,
      message: res?.message,
    });
  };

  render() {
    let { updating, image, title, image_file_loading, message, sections } =
      this.state;

    return (
      <div className="col-12">
        <Dashboard_breadcrumb crumb="Sponsors" />
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-8 col-xl-6 col-sm-12">
            <div className="crs_grid">
              <div className="modal-header">
                <h5 className="modal-title text-dark">Sponsors</h5>
              </div>

              <div className="modal-body">
                <div className="login-form">
                  <form>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label>Page Title</label>
                          <input
                            className="form-control"
                            placeholder="Page Title"
                            value={title}
                            onChange={({ target }) =>
                              this.setState({ title: target.value })
                            }
                          />
                        </div>
                      </div>

                      {sections.map((section, index) => (
                        <div key={index} className="form-group">
                          <span>
                            <label>{`Paragraph - (${index + 1})`}</label>
                            <a
                              onClick={() => this.remove_section(index)}
                              className="btn btn-action"
                            >
                              <i className={`fas fa-window-close`}></i>
                            </a>
                          </span>
                          <textarea
                            onChange={({ target }) =>
                              this.set_section(target.value, index)
                            }
                            value={section.text}
                            className="form-control"
                          ></textarea>
                        </div>
                      ))}

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Text_btn
                          text="Add Section"
                          icon="fa-plus"
                          action={(e) => {
                            e.preventDefault();
                            this.add_section("text");
                          }}
                        />
                      </div>

                      <div className="form-group smalls">
                        <label>Page Image*</label>
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
                          <div style={{ overflow: "scroll" }}>
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
                    </div>

                    {message ? <Alert_box message={message} /> : null}

                    <Stretch_button
                      loading={updating}
                      title="Update"
                      action={this.submit}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Manage_sponsors_page;
