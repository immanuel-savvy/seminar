import React from "react";
import { Carousel } from "react-bootstrap";
import Loadindicator from "../components/loadindicator";
import Upcoming_seminars from "../components/upcoming_seminars";
import { Loggeduser } from "../Contexts";
import Footer from "../sections/footer";
import Hero_banner from "../sections/hero_banner";
import Nav from "../sections/nav";

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
