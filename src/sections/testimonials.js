import React from "react";
import { Col } from "react-bootstrap";
import Explore_more from "../components/explore_more";
import Add_student_review from "../components/add_review_form";
import { domain } from "../assets/js/utils/constants";
import { get_request, post_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";
import Review from "../components/review";
import Video from "../components/video";
import Testimonials_header from "../components/testimonials_header";
Explore_more;

class Testimonials extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let reviews = await post_request("reviews", { verified: true, limit: 12 });
    this.setState({ reviews });
  };

  toggle_add_review = () =>
    this.setState({ add_review: !this.state.add_review });

  render() {
    let { no_gray } = this.props;
    let { reviews, add_review, testimonials } = this.state;

    if (!testimonials && reviews && !reviews.length) return;

    return (
      <section className={no_gray ? "" : `gray`}>
        <div className="container">
          <Testimonials_header />

          {add_review ? (
            <Add_student_review toggle={this.toggle_add_review} />
          ) : null}
          <div className="row justify-content-center">
            {reviews ? (
              reviews && !reviews.length ? null : (
                reviews.map((review, index) => (
                  <Review testimonials review={review} key={index} />
                ))
              )
            ) : (
              <Loadindicator contained />
            )}
          </div>

          {reviews && reviews.length ? (
            <Explore_more title="Testimonies" to={"testimonials"} />
          ) : null}
        </div>
      </section>
    );
  }
}

export default Testimonials;
