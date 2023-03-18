import React from "react";
import "./Divider.css";
interface PropsType {
  title: string;
}
interface StateType {}
class Divider extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      props: { title },
    } = this;
    return (
      <div className="divider">
        <p>{title}</p>
        <span></span>
      </div>
    );
  }
}

export default Divider;
