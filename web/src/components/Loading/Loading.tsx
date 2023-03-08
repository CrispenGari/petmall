import React from "react";
import { BoxIndicator } from "@crispengari/react-activity-indicators";
import "./Loading.css";
interface PropsType {}
interface StateType {}
class Loading extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="loading">
        <BoxIndicator size="medium" color="#082032" />
      </div>
    );
  }
}

export default Loading;
