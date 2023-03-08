import React from "react";
import "./Pet.css";
interface PropsType {}
interface StateType {}
class Pet extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this;
    return (
      <div className="pet">
        <h1>Hello from Pet.tsx</h1>
      </div>
    );
  }
}

export default Pet;
