import React from "react";
import { to_title } from "../assets/js/utils/functions";

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { user } = this.props;

    if (!user) return;

    let { firstname, lastname, email } = user;

    return (
      <div className="col-12 my-2">
        <div className="edu_cat_2 cat-1">
          <span style={{ width: "100%", textAlign: "center" }}>
            <div className="edu_cat_data pt-2 text-center">
              <b>User</b>
              <h4 className="title">
                <a href="#">{to_title(`${firstname} ${lastname}`)}</a>
              </h4>
              <ul className="meta">
                <li className="video">{email}</li>
              </ul>
            </div>
          </span>
        </div>
      </div>
    );
  }
}

export default User;
