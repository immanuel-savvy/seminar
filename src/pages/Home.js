import React from "react";
import { Carousel } from "react-bootstrap";
import Contact_us from "../components/contact_us_today";
import Loadindicator from "../components/loadindicator";
import Upcoming_seminars from "../components/upcoming_seminars";
import { Loggeduser } from "../Contexts";
import Articles from "../sections/articles";
import Donations from "../sections/donations";
import Footer from "../sections/footer";
import Hero_banner from "../sections/hero_banner";
import Management_team from "../sections/management_team";
import Nav from "../sections/nav";
import Vision_mission_stuff from "../sections/vision_mission_stuff";
import Who_we_are from "../sections/who_we_are";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { index: 0 };
  }

  componentDidMount = () => {
    let heros = new Array({
      main_text: "GIIT Seminar 2023: The Future of Technology",
      sub_text:
        "Explore the cutting-edge of tech innovation at GIIT Seminar 2023 – Where the Future is Now!",
      bg: require("../assets/img/hero1.jpg"),
    });

    this.setState({ heros });
  };

  render() {
    let { heros } = this.state;
    let { entry } = this.props;

    return (
      <Loggeduser.Consumer>
        {({ loggeduser }) => {
          return (
            <div>
              <Nav page="" />
              <div className="body">
                {heros ? (
                  <div
                    style={{
                      backgroundImage: `url(${require("../assets/img/hero1.png")})`,
                    }}
                  >
                    <Carousel fade nextLabel="" prevLabel="" indicators={false}>
                      {heros.map((hero, index) => (
                        <Carousel.Item>
                          <Hero_banner hero={hero} key={index} />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                ) : (
                  <Loadindicator />
                )}

                <Upcoming_seminars loggeduser={loggeduser} />

                {entry ? (
                  <>
                    <Who_we_are home about={entry.about} />

                    <Vision_mission_stuff gray details={entry.vision} />

                    <Vision_mission_stuff reverted details={entry.mission} />
                  </>
                ) : (
                  <Loadindicator />
                )}
                <Management_team />

                <Donations />

                <Articles />

                <Contact_us />
              </div>
              <Footer />
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Home;
