import React from "react";
import { organisation_name } from "../assets/js/utils/constants";
import Contact_us from "../components/contact_us_today";
import Padder from "../components/padder";
import Section_header from "../components/section_headers";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer from "../sections/footer";
import Custom_nav from "../sections/nav";
import { default as Sponsors_section } from "../sections/sponsors";
import ReactMarkdown from "react-markdown";
import Text_btn from "../components/text_btn";

const Ptag = ({ children }) => {
  return <p>{children}</p>;
};

class Sponsors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    document.title = `Sponsors | ${organisation_name}`;
  };

  render() {
    let text = ``;

    return (
      <div>
        <Custom_nav page="speakers" />
        <Padder />

        <Breadcrumb_banner title="Sponsors" page="Sponsors" />

        <section>
          <div className="container">
            <Section_header
              title="Welcome to our"
              color_title="Sponsors Page"
            />

            <div className="row">
              <div className="container">
                <p>
                  We are incredibly grateful for the support and contribution of
                  our valued sponsors. Their generous partnership enables us to
                  continue our mission of providing exceptional seminars and
                  empowering individuals to reach their fullest potential.
                  Together, we strive to create a community of learning,
                  inspiration, and growth.
                </p>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div className="container">
            <Section_header
              title="Why Sponsor us"
              // color_title="Sponsors Page"
              description=""
            />

            <div className="row">
              <p>
                Broad Reach By sponsoring our seminars, you gain access to a
                diverse audience comprising students, professionals,
                entrepreneurs, and industry leaders. Your brand will receive
                significant exposure and recognition among our attendees, who
                are actively seeking knowledge and innovation.
              </p>
              <p>
                <b>Thought Leadership:</b> Aligning your brand with our seminars
                positions you as a thought leader in your industry. It showcases
                your commitment to advancing knowledge, embracing innovation,
                and driving positive change. Sponsorship provides a platform to
                share your expertise, showcase your products or services, and
                engage with a highly engaged audience.
              </p>
              <p>
                <b>Networking Opportunities:</b> Our seminars attract a vibrant
                community of individuals from various backgrounds and
                industries. As a sponsor, you'll have exclusive opportunities to
                connect with industry professionals, potential clients, and
                like-minded individuals. Forge valuable partnerships, explore
                new collaborations, and expand your network.
              </p>
              <p>
                <b>Brand Exposure:</b> As a sponsor, your brand will receive
                prominent visibility throughout our seminars. This includes logo
                placement in promotional materials, acknowledgment during event
                introductions, and dedicated space on our website. Maximize your
                brand exposure and create lasting impressions among our
                attendees.
              </p>
            </div>
          </div>

          <br />
          <br />
          <div className="container">
            <Section_header title="Become a" color_title="Sponsor" />

            <div className="row">
              <p>
                Join us on our journey to inspire, educate, and transform lives
                through seminars. We invite you to become a sponsor and be part
                of our vibrant community. Together, we can make a meaningful
                difference and shape a brighter future.
              </p>
              <p>
                For sponsorship inquiries, partnership opportunities, or further
                information, please contact our dedicated sponsorship team
                at&nbsp;
                <a
                  className="theme-cl"
                  target="_blank"
                  href="mailto://sponsors@giitfoundation.org"
                >
                  sponsors@giitfoundation.org
                </a>
                .
              </p>
              <p>
                Thank you for considering sponsorship and for your support in
                advancing our mission. We look forward to welcoming you as a
                valued sponsor of our seminars!
              </p>
            </div>
          </div>
        </section>

        <Sponsors_section />

        <Contact_us />
        <Footer />
      </div>
    );
  }
}

export default Sponsors;
