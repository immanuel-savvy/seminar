import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../assets/js/utils/functions";
import { domain, post_request } from "../assets/js/utils/services";
import Alert_box from "../components/alert_box";
import Handle_file_upload from "../components/handle_file_upload";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Section_header from "../components/section_headers";
import { Loggeduser } from "../Contexts";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer, { get_session } from "../sections/footer";
import Custom_Nav from "../sections/nav";
import { emitter } from "../Seminar";

const categories = new Array({
  title: "Artificial Intelligence",
  _id: "artificial_intelligence",
});

class New_seminar extends Handle_file_upload {
  constructor(props) {
    super(props);

    let { seminar } = this.props;

    if (window.location.pathname === "/edit_seminar")
      seminar = seminar || get_session("seminar_in_edit");

    this.state = {
      current_pill: "basic",
      what_to_expect: new Array(),
      things_to_know: new Array(),
      images: new Array(),
      ...seminar,
      learn_index: null,
      requirement_index: null,
      vendor: null,
      date: seminar && new Date(seminar.date),
      price: (seminar && seminar.value) || "",
    };
  }

  tab_pills = new Array("basic", "media", "meta_info", "finish");

  componentDidMount = async () => {
    this.loggeduser = this.loggeduser || get_session("loggeduser");

    // if (!this.loggeduser || (this.loggeduser && !this.loggeduser.vendor))
    //   return window.history.go(-1);
  };

  important_fields = new Array(
    "title",
    "category",
    "short_description",
    "images",
    "date",
    "description",
    "duration",
    "meet_link",
    "speaker",
    "speaker_linkedin"
  );

  is_set = () => {
    for (let i = 0; i < this.important_fields.length; i++) {
      let field = this.state[this.important_fields[i]];
      if (!field) return;
      if (Array.isArray(field) && !field.length) return;
    }

    return true;
  };

  render_tab_pills = () => {
    let { current_pill, _id } = this.state;

    return this.tab_pills.map((pill) => (
      <button
        key={pill}
        className={pill === current_pill ? "nav-link active" : "nav-link"}
        id={`v-pills-${pill}-tab`}
        data-toggle="pill"
        data-target={`#v-pills-${pill}`}
        type="button"
        role="tab"
        aria-controls={`v-pills-${pill}`}
        aria-selected={pill === current_pill ? "true" : "false"}
        onClick={() =>
          this.setState(
            { current_pill: pill },
            pill === "finish" ? this.on_finish : null
          )
        }
      >
        {_id && pill === "finish"
          ? "Finish Edit"
          : to_title(pill.replace(/_/g, " "))}
      </button>
    ));
  };

  handle_seminar = () => {
    let { new_seminar: seminar } = this.state;
    window.sessionStorage.setItem("seminar", JSON.stringify(seminar));
  };

  finish_tab_panel = () => {
    let { uploading_seminar, new_seminar, _id } = this.state;

    return (
      <div
        className={
          this.state.current_pill === "finish"
            ? "tab-pane fade show active"
            : "tab-pane fade"
        }
        id="v-pills-finish"
        role="tabpanel"
        aria-labelledby="v-pills-finish-tab"
      >
        {!this.is_set() && !new_seminar ? (
          <>
            {this.important_fields.map((field_prop) => {
              let field = this.state[field_prop];
              if (Array.isArray(field)) {
                if (!field.length)
                  return (
                    <Alert_box
                      message={`${to_title(
                        field_prop.replace(/_/g, " ")
                      )} is Important`}
                    />
                  );
              } else if (!field)
                return (
                  <Alert_box
                    message={`${to_title(
                      field_prop.replace(/_/g, " ")
                    )} is Important`}
                  />
                );
            })}
          </>
        ) : !uploading_seminar ? (
          <div className="succ_wrap">
            <div className="succ_121">
              <i className="fas fa-thumbs-up"></i>
            </div>
            <div className="succ_122">
              <h4>Seminar Successfully {_id ? "Updated" : `Added`}</h4>
              <p>{new_seminar?.short_description}</p>
            </div>
            <div className="succ_123">
              <Link to={`/seminar?${new_seminar?._id}`}>
                <span
                  onClick={this.handle_seminar}
                  className="btn theme-bg text-white"
                >
                  View Seminar
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center my-5">
            <Loadindicator />
          </div>
        )}
        {this.pill_nav("finish")}
      </div>
    );
  };

  pill_nav = (pill) => {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <ul className="alios_slide_nav">
          <li>
            <a
              href="#"
              onClick={pill === "basic" ? null : () => this.prev_pill(pill)}
              className={
                pill === "basic" ? "btn btn_slide disabled" : "btn btn_slide"
              }
            >
              <i className="fas fa-arrow-left"></i>
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={
                pill === "finish" || (pill === "media" && !this.is_set())
                  ? null
                  : () => this.next_pill(pill)
              }
              className={
                pill === "finish" || (pill === "media" && !this.is_set())
                  ? "btn btn_slide disabled"
                  : "btn btn_slide"
              }
            >
              <i className="fas fa-arrow-right"></i>
            </a>
          </li>
        </ul>
      </div>
    );
  };

  next_pill = (pill) => {
    let current_pill_index = this.tab_pills.findIndex((p) => p === pill);

    current_pill_index < this.tab_pills.length - 1 &&
      this.setState(
        { current_pill: this.tab_pills[current_pill_index + 1] },
        pill === "media" ? this.on_finish : null
      );
  };

  prev_pill = (pill) => {
    let current_pill_index = this.tab_pills.findIndex((p) => p === pill);
    current_pill_index &&
      this.setState({ current_pill: this.tab_pills[current_pill_index - 1] });
  };

  add_to_learn = (e) => {
    e.preventDefault();
    let { what_you_will_learn_in_edit, learn_index, things_to_know } =
      this.state;

    if (learn_index !== null) {
      things_to_know[learn_index] = what_you_will_learn_in_edit;
      learn_index = null;
    } else
      things_to_know = new Array(
        ...things_to_know,
        what_you_will_learn_in_edit
      );

    this.setState({
      things_to_know,
      learn_index,
      what_you_will_learn_in_edit: "",
    });
  };

  add_requirement = (e) => {
    e.preventDefault();
    let { requirement_in_edit, requirement_index, what_to_expect } = this.state;

    if (requirement_index !== null) {
      what_to_expect[requirement_index] = requirement_in_edit;
      requirement_index = null;
    } else what_to_expect = new Array(...what_to_expect, requirement_in_edit);

    this.setState({
      what_to_expect,
      requirement_index,
      requirement_in_edit: "",
    });
  };

  edit_learn = (index) => {
    let what_you_will_learn_in_edit = this.state.things_to_know[index];
    this.setState({ what_you_will_learn_in_edit, learn_index: index });
  };

  edit_requirement = (index) => {
    let requirement_in_edit = this.state.what_to_expect[index];
    this.setState({ requirement_in_edit, requirement_index: index });
  };

  filter_learn_index = (index) => {
    let { things_to_know } = this.state;
    things_to_know.splice(index, 1);
    this.setState({ things_to_know });
  };

  filter_requirement_index = (index) => {
    let { what_to_expect } = this.state;
    what_to_expect.splice(index, 1);
    this.setState({ what_to_expect });
  };

  meta_info_tab_panel = () => {
    let {
      speaker,
      speaker_linkedin,
      what_to_expect,
      date,
      requirement_in_edit,
      requirement_index,
      duration,
      meet_link,
    } = this.state;

    return (
      <div
        className={
          this.state.current_pill === "meta_info"
            ? "tab-pane fade show active"
            : "tab-pane fade"
        }
        id="v-pills-meta_info"
        role="tabpanel"
        aria-labelledby="v-pills-meta_info-tab"
      >
        <div className="form-group smalls">
          <label>Meet Link</label>
          <input
            type="url"
            className="form-control"
            placeholder="Select"
            value={meet_link}
            onChange={({ target }) =>
              this.setState({ meet_link: target.value })
            }
          />
        </div>

        <div className="form-group smalls">
          <label>Date</label>
          <input
            type="datetime-local"
            className="form-control"
            placeholder="Select"
            value={date}
            onChange={({ target }) => this.setState({ date: target.value })}
          />
        </div>

        <div className="form-group smalls">
          <label>Duration (minutes)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Duration"
            value={duration}
            onChange={({ target }) => this.setState({ duration: target.value })}
          />
        </div>

        <div className="form-group smalls">
          <label>Speaker</label>
          <input
            type="text"
            className="form-control"
            placeholder="Speaker"
            value={speaker}
            onChange={({ target }) => this.setState({ speaker: target.value })}
          />
        </div>

        <div className="form-group smalls">
          <label>Speaker LinkedIn</label>
          <input
            type="url"
            className="form-control"
            placeholder="Speaker LinkedIn"
            value={speaker_linkedin}
            onChange={({ target }) =>
              this.setState({ speaker_linkedin: target.value })
            }
          />
        </div>

        <div className="form-group smalls">
          <label>What to Expect</label>
          <input
            type="text"
            className="form-control"
            placeholder="Type..."
            value={requirement_in_edit}
            onChange={({ target }) =>
              this.setState({ requirement_in_edit: target.value })
            }
          />
          {requirement_in_edit ? (
            <a
              onClick={this.add_requirement}
              href="#"
              class="btn theme-bg text-light mt-2"
            >
              {requirement_index === null ? "Add" : "Update"}
            </a>
          ) : null}
        </div>
        {what_to_expect.length ? (
          <ul class="simple-list p-0">
            {what_to_expect.map((requirement, i) => (
              <li key={i}>
                {requirement}{" "}
                <span
                  className="px-2"
                  onClick={() => this.filter_requirement_index(i)}
                >
                  <i className={`fa fa-trash`}></i>
                </span>
                <span className="px-2" onClick={() => this.edit_requirement(i)}>
                  <i className={`fa fa-edit`}></i>
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  };

  basic_tab_panel = () => {
    let { category, title, short_description, description } = this.state;

    return (
      <div
        className={
          this.state.current_pill === "basic"
            ? "tab-pane fade show active"
            : "tab-pane fade"
        }
        id="v-pills-basic"
        role="tabpanel"
        aria-labelledby="v-pills-basic-tab"
      >
        <div className="form-group smalls">
          <label>Seminar Title*</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Seminar Title"
            onChange={({ target }) => this.setState({ title: target.value })}
            value={title}
          />
        </div>

        <div className="form-group smalls">
          <label>Short Description*</label>
          <input
            onChange={({ target }) =>
              this.setState({ short_description: target.value })
            }
            value={short_description}
            type="text"
            className="form-control"
          />
        </div>

        <div className="form-group smalls">
          <label>Description*</label>
          <textarea
            onChange={({ target }) =>
              this.setState({ description: target.value })
            }
            value={description}
            type="text"
            className="form-control"
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
              <option value="">-- Select Category --</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {to_title(category.title.replace(/_/g, " "))}
                </option>
              ))}
            </select>
          </div>
        </div>

        {this.pill_nav("basic")}
      </div>
    );
  };

  handle_images = async (e) => {
    this.handle_file(e, null, null, () => {
      let { file, images, filename, file_hash } = this.state;

      images = new Array({ url: file, file_hash, filename }, ...images);

      this.setState({ images });
    });
  };

  remove_image = (img) => {
    let { images } = this.state;

    images = images.filter((image) => {
      return image.url !== img.url && image.filename !== img.filename;
    });
    this.setState({ images });
  };

  media_tab_panel = () => {
    let { images } = this.state;

    return (
      <div
        className={
          this.state.current_pill === "media"
            ? "tab-pane fade show active"
            : "tab-pane fade"
        }
        id="v-pills-media"
        role="tabpanel"
        aria-labelledby="v-pills-media-tab"
      >
        <div className="form-group smalls">
          <label>Video URL</label>
          <input
            type="text"
            className="form-control"
            placeholder="https://www.youtube.com/watch?v=ExXhmuH-cw8"
            value={this.state.video}
            onChange={({ target }) => this.setState({ video: target.value })}
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
                  style={{ maxHeight: 200, maxWidth: 200, marginRight: 10 }}
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

        {this.pill_nav("media")}
      </div>
    );
  };

  on_finish = async () => {
    this.setState({ uploading_seminar: true });
    let {
      short_description,
      title,
      video,
      what_to_expect,
      things_to_know,
      _id,
      date,
      duration,
      speaker,
      speaker_linkedin,
      images,
      category,
      description,
      meet_link,
    } = this.state;

    if (!this.is_set()) return;

    this.setState({ loading: true });

    let seminar = {
      short_description,
      description,
      title,
      meet_link,
      video,
      images,
      category,
      speaker,
      speaker_linkedin,
      duration: Number(duration),
      date: new Date(date).getTime(),
    };
    if (things_to_know.length) seminar.things_to_know = things_to_know;
    if (what_to_expect.length) seminar.what_to_expect = what_to_expect;

    let response;
    if (_id) {
      seminar._id = _id;
      response = await post_request("update_seminar", seminar);
      seminar.images = response.images;
    } else {
      response = await post_request("new_seminar", seminar);
      seminar.images = response.images;
      seminar._id = response._id;
      seminar.created = response.created;
    }

    if (response?._id) {
      this.setState({ new_seminar: seminar });

      emitter.emit(_id ? "seminar_updated" : "new_seminar", {
        ...seminar,
      });
      this.reset_state();
    }
  };

  reset_state = () =>
    this.setState({
      short_description: "",
      image: "",
      video: "",
      price: "",
      title: "",
      uploading_seminar: false,
      quantities: "",
      sections: new Array(),
      what_to_expect: new Array(),
      things_to_know: new Array(),
    });

  render() {
    let { admin } = this.state;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          this.loggeduser = loggeduser;

          return (
            <div id="main-wrapper">
              <Custom_Nav />
              <Padder />
              <Breadcrumb_banner page="new seminar" />

              <div className="container pt-5">
                <Section_header title="New Seminar" description="" />

                <div className="row">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="dashboard_wrap">
                          <div className="form_blocs_wrap">
                            <form>
                              <div className="row justify-content-between">
                                <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12">
                                  <div
                                    className="nav flex-column nav-pills me-3"
                                    id="v-pills-tab"
                                    role="tablist"
                                    aria-orientation="vertical"
                                  >
                                    {this.render_tab_pills()}
                                  </div>
                                </div>
                                <div className="col-xl-9 col-lg-8 col-md-7 col-sm-12">
                                  <div
                                    className="tab-content"
                                    id="v-pills-tabContent"
                                  >
                                    {this.basic_tab_panel()}
                                    {this.media_tab_panel()}
                                    {this.meta_info_tab_panel()}
                                    {this.finish_tab_panel()}
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Footer />
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default New_seminar;
