import React from "react";
import { to_title } from "../assets/js/utils/functions";
import { post_request } from "../assets/js/utils/services";
import { Loggeduser } from "../Contexts";
import { categories } from "../pages/New_seminar";
import Login from "./login";
import Stretch_button from "./stretch_button";

class Submit_a_talk extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  submit = async () => {
    let { on_submit, toggle } = this.props;
    let { title, loading, description, category } = this.state;
    if (loading) return;

    this.setState({ loading: true });

    await post_request("submit_a_talk", {
      title,
      description,
      category,
      user: this.loggeduser._id,
    });

    on_submit && on_submit();
    toggle();
  };

  render() {
    let { toggle } = this.props;
    let { title, description, loading, message, category } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          if (!loggeduser) return <Login no_redirect />;

          this.loggeduser = loggeduser;

          return (
            <div>
              <div class="modal-content overli" id="loginmodal">
                <div class="modal-header">
                  <h5 class="modal-title">Submit a Talk</h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => toggle && toggle()}
                  >
                    <span aria-hidden="true">
                      <i class="fas fa-times-circle"></i>
                    </span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="login-form">
                    <p className="lead text-center">
                      You can write to use via email at{" "}
                      <a
                        className="lead theme-cl"
                        target="_blank"
                        href={`mailto://${"speaker@giitfoundation.org"}`}
                      >
                        speaker@giitfoundation.org
                      </a>
                    </p>
                    <p className="text-center">
                      Or send us a brief, and we will be in touch with you
                      shortly.
                    </p>
                  </div>

                  <div class="login-form">
                    <form>
                      <div class="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          class="form-control"
                          value={title}
                          onChange={({ target }) =>
                            this.setState({
                              title: target.value,
                              message: "",
                            })
                          }
                          placeholder="Title"
                        />
                      </div>

                      <div class="form-group">
                        <label>Description</label>
                        <textarea
                          class="form-control"
                          placeholder="Tell us a brief about the talk"
                          value={description}
                          onChange={({ target }) =>
                            this.setState({
                              description: target.value,
                              message: "",
                            })
                          }
                        ></textarea>
                      </div>

                      <div className="form-group smalls">
                        <label>Category</label>

                        <div className="simple-input">
                          <select
                            id="Category"
                            defaultValue={category}
                            onChange={({ target }) =>
                              this.setState({ category: target.value })
                            }
                            className="form-control"
                          >
                            <option value="" disabled selected={!!!category}>
                              -- Select Category --
                            </option>
                            {categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {to_title(category.title.replace(/_/g, " "))}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {message ? (
                        <p className="text-danger">{message}</p>
                      ) : null}

                      <div class="form-group">
                        <Stretch_button
                          disabled={!title || !description || !category}
                          action={this.submit}
                          title="Submit"
                          loading={loading}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Submit_a_talk;
