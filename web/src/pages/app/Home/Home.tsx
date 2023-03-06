import React from "react";
import { Banner, Header } from "../../../components";
import "./Home.css";
interface PropsType {}
interface StateType {}
class Home extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="home">
        <Header />
        <Banner />
      </div>
    );
  }
}

export default Home;
