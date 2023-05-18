import React from "react";
import Preview_image from "./preview_image";

class Seminar_media extends React.Component {
  constructor(props) {
    super(props);

    let { seminar } = this.props;
    this.state = { active_image: seminar.images[0] };
  }

  set_image = (image) => this.setState({ active_image: image });

  render() {
    let { active_image } = this.state;
    let { seminar } = this.props;
    let { images, video, highlights, date } = seminar;

    if (date < Date.now() && highlights) {
      if (highlights.images?.length) images = highlights.images;
      if (highlights.video) video = highlights.video;
    }

    return (
      <>
        <div class="property_video radius lg mb-4">
          <div class="thumb">
            <Preview_image
              image={active_image.url}
              class_name="pro_img img-fluid w100"
            />
          </div>
        </div>

        <div class="edu_wraper">
          {date < Date.now() && highlights ? (
            <h4 class="edu_title">Event Highlights</h4>
          ) : null}

          {video ? (
            <span class="bb-video-box">
              <span
                class="bb-video-box-inner"
                style={{
                  display: "inline",
                  backgroundColor: "#eee",
                  padding: 15,
                  marginRight: 15,
                  cursor: "pointer",
                }}
              >
                <span class="bb-video-box-innerup">
                  <a
                    href={video}
                    target="_blank"
                    data-toggle="modal"
                    data-target="#popup-video"
                    class="theme-cl"
                  >
                    <i style={{ fontSize: 20 }} class="ti-control-play"></i>
                  </a>
                </span>
              </span>
            </span>
          ) : null}
          {images.map((image, index) => {
            return (
              <span key={index} class="thumb mr-3">
                <Preview_image
                  image={image.url}
                  height={70}
                  style={{ borderRadius: 10, cursor: "pointer" }}
                  action={() => this.set_image(image)}
                  class_name="pro_img img-fluid img-rounded w100"
                />
              </span>
            );
          })}
        </div>
      </>
    );
  }
}

export default Seminar_media;
