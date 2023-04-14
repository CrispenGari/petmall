import React from "react";
import "./NoPets.css";
interface PropsType {
  category: string;
}
interface StateType {}
class NoPets extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }
  render() {
    const { category } = this.props;
    return (
      <div className="no__pets">
        <h1>no {category.replace(/_/g, " ").toLowerCase()} in the market.</h1>
      </div>
    );
  }
}

export default NoPets;
