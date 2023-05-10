import React from "react";
import { post_request } from "../assets/js/utils/services";
import Contact_us from "../components/contact_us_today";
import Listempty from "../components/listempty";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Section_header from "../components/section_headers";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Custom_nav from "../sections/nav";

class Conferences extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page_size: 12,
      page: 0,
    };
  }

  fetch_conferences = async (page = this.state.page) => {
    let { page_size } = this.state;

    let { conferences, total_conferences } = await post_request("conferences", {
      skip: page_size * page,
      limit: page_size,
      total_conferences: true,
    });

    let i = 0;
    for (let p = 0; p < total_conferences; p += page_size) i++;

    this.setState({ conferences, page, total_conferences, total_pages: i });
  };

  componentDidMount = async () => {
    await this.fetch_conferences();
  };

  page = async (page) => {
    await this.fetch_conferences(page);

    scroll_to_top();
  };

  next_page = async () => {
    let { page, total_pages } = this.state;
    page < total_pages - 1 && (await this.fetch_conferences(page + 1));
  };

  prev_page = async () => {
    let { page } = this.state;
    page > 0 && (await this.fetch_conferences(page - 1));
  };

  render_pagers = () => {
    let { page_size, page, total_conferences } = this.state,
      mapper = new Array(),
      i = 0;
    for (let p = 0; p < total_conferences; p += page_size) mapper.push(i++);

    return mapper.map((pager, index) => (
      <li
        className={`page-item ${index === page ? "active" : ""}`}
        onClick={() => this.page(index)}
      >
        <a className="page-link" href="#">
          {pager + 1}
        </a>
      </li>
    ));
  };

  render_pagination = () => {
    let { page, page_size, total_pages, conferences, total_conferences } =
      this.state;

    return (
      <div className="row align-items-center justify-content-between">
        <div className="col-xl-6 col-lg-6 col-md-12">
          <p className="p-0">{`Showing ${page * page_size + 1} to ${
            page * page_size + conferences.length
          } of ${total_conferences} entire`}</p>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12">
          <nav className="float-right">
            <ul className="pagination smalls m-0">
              <li
                onClick={this.prev_page}
                className={`page-item ${page === 0 ? "disabled" : ""}`}
              >
                <a className="page-link" href="#" tabindex="-1">
                  <i className="fas fa-arrow-circle-left"></i>
                </a>
              </li>

              {this.render_pagers()}

              <li
                className={`page-item ${
                  total_pages - 1 === page ? "disabled" : ""
                }`}
                onClick={this.next_page}
              >
                <a className="page-link" href="#">
                  <i className="fas fa-arrow-circle-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  };

  render() {
    let { conferences } = this.state;

    return (
      <div>
        <Custom_nav page="speakers" />
        <Padder />

        <Breadcrumb_banner title="Upcoming Conferences" page="Conferences" />

        <section>
          <div className="container">
            <Section_header
              title="Unleash Your "
              color_title="Potential"
              description="Immerse yourself in engaging keynote speeches, thought-provoking panel discussions, interactive workshops, and networking opportunities that foster connections and collaborations."
            />

            <div className="row align-items-center justify-content-center">
              {conferences ? (
                conferences.length ? (
                  conferences.map()
                ) : (
                  <Listempty />
                )
              ) : (
                <Loadindicator />
              )}
            </div>

            {conferences ? this.render_pagination() : null}
          </div>
        </section>

        <Contact_us />
        <Footer />
      </div>
    );
  }
}

export default Conferences;
