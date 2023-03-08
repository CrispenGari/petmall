import React from "react";
import { withGlobalProps } from "../../../hoc";
import { GlobalPropsType } from "../../../types";
import "./Pet.css";
interface PropsType {
  globalProps: GlobalPropsType;
}
interface StateType {}
class Pet extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      props: {
        globalProps: { params },
      },
    } = this;
    return (
      <div className="pet__page">
        <h1>{params.petId}</h1>
      </div>
    );
  }
}

export default withGlobalProps(Pet);
