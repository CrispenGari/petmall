import React from "react";
import "./UserPets.css";
interface PropsType {}
interface StateType {}
class UserPets extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }
  render() {
    const {} = this;
    return (
      <div className="user__pets">
        <div className="user__pets__header"></div>
        <div className="user__pets__pets"></div>
      </div>
    );
  }
}

export default UserPets;
