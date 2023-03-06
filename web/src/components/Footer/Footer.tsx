import React from "react";

import "./Footer.css";
interface PropsType {}
interface StateType {}
class Footer extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="footer">
        <p>
          {" "}
          Copyright © {new Date().getFullYear()} PetMall Inc. All rights
          reserved.
        </p>
      </div>
    );
  }
}

export default Footer;
