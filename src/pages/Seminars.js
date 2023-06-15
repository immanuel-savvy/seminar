import React from "react";
import { post_request } from "../assets/js/utils/services";
import Conferences_header from "../components/conferences_header";
import Conferences_sidebar from "../components/conferences_sidebar";
import Listempty from "../components/listempty";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Seminar from "../components/seminar";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Nav from "../sections/nav";

class Seminars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 15,
      page: 1,
    };
  }

  componentDidMount = async () => {
    let { limit, page } = this.state;
    let href = window.location.href;
    href = href.split("?").slice(-1)[0];

    let { seminars, total } = await post_request(`seminars`, {
      query: {
        date: { [href && href === "past" ? "$lte" : "$gt"]: Date.now() },
      },
      show_total: true,
      limit,
      skip: (page - 1) * limit,
    });

    this.setState({ seminars, total });
  };

  render() {
    let { seminars, total, page, limit } = this.state;

    return (
      <div>
        <Nav page="seminars" />

        <Padder />
        <Breadcrumb_banner page="seminars" />

        <section className="gray">
          <div className="container">
            <div className="row">
              <Conferences_sidebar />

              <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                <Conferences_header
                  length={seminars && seminars.length}
                  total={total}
                  page={page}
                  limit={limit}
                />

                <div class="row justify-content-center">
                  {seminars ? (
                    seminars.length ? (
                      seminars.map((seminar, index) => (
                        <Seminar seminar={seminar} in_seminars key={index} />
                      ))
                    ) : (
                      <Listempty />
                    )
                  ) : (
                    <Loadindicator />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Seminars;
