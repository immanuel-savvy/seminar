import React from "react";
import { post_request } from "../assets/js/utils/services";
import Conference from "../components/conference";
import Conferences_header from "../components/conferences_header";
import Conferences_sidebar from "../components/conferences_sidebar";
import Listempty from "../components/listempty";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Nav from "../sections/nav";

class Conferences extends React.Component {
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

    let { conferences, total } = await post_request(`conferences`, {
      query: {
        date: { [href && href === "past" ? "$lte" : "$gt"]: Date.now() },
      },
      show_total: true,
      limit,
      skip: (page - 1) * limit,
    });

    this.setState({ conferences, total });
  };

  render() {
    let { conferences, total, page, limit } = this.state;

    return (
      <div>
        <Nav page="conferences" />

        <Padder />
        <Breadcrumb_banner page="conferences" />

        <section className="gray">
          <div className="container">
            <div className="row">
              <Conferences_sidebar />

              <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                <Conferences_header
                  length={conferences && conferences.length}
                  total={total}
                  page={page}
                  limit={limit}
                />

                <div class="row justify-content-center">
                  {conferences ? (
                    conferences.length ? (
                      conferences.map((conference, index) => (
                        <Conference
                          conference={conference}
                          in_conferences
                          key={index}
                        />
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

        {/* <Modal ref={(create_voucher) => (this.create_voucher = create_voucher)}>
          <Create_open_voucher toggle={this.toggle_create_voucher} />
        </Modal> */}
      </div>
    );
  }
}

export default Conferences;
