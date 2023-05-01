import React from "react";
import { countdown } from "../assets/js/utils/functions";

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let { date, callback } = this.props;

    countdown(
      date,
      (val) => {
        this.setState(val);
      },
      callback,
      this
    );
  };

  componentWillUnmount = () => {
    clearInterval(this.countdown);
  };

  format_count = () => {
    let { days, hours, mins, seconds } = this.state;

    if (!days && !hours && !mins && !seconds) return "00:00:00";

    let str = String(seconds).padStart(2, "0") + "s";
    str = `${String(mins).padStart(2, "0")}m :${str}`;

    if (hours) str = `${String(hours).padStart(2, "0")}h :${str}`;
    if (days) str = `${String(days)}d :${str}`;

    return str;
  };

  render() {
    return <span className="theme-cl">{this.format_count()}</span>;
  }
}

export default Countdown;
