import React from "react";
import { Header, ProfileCard } from "../../../components";
import { withGlobalProps } from "../../../hoc";
import { GlobalPropsType } from "../../../types";
import "./Profile.css";
interface PropsType {
  globalProps: GlobalPropsType;
}
interface StateType {}

class Profile extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      globalProps: { params },
    } = this.props;
    return (
      <div className="profile">
        <Header />
        <ProfileCard userId={params.userId || ""} />
      </div>
    );
  }
}

export default withGlobalProps(Profile);
