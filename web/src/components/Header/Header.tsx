import React from "react";
import { HeaderButton } from "..";
import { withGlobalProps } from "../../hoc";
import { GlobalPropsType } from "../../types";
import "./Header.css";
interface PropsType {
  globalProps: GlobalPropsType;
}
interface StateType {}
class Header extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      props: {
        globalProps: { user, navigate },
      },
    } = this;

    return (
      <div className="app__header">
        <div className="app__header__left">
          <img
            src="/adaptive-icon.png"
            alt="logo"
            onClick={() => {
              navigate("/app/pets");
            }}
          />
          <div className="">
            <HeaderButton iconName="home" title="home" onClick={() => {}} />
          </div>
        </div>
        <div className="app__header__right">
          <HeaderButton
            iconName="log out"
            title="signout"
            onClick={async () => {}}
          />
          <HeaderButton
            iconName="settings"
            title="settings"
            onClick={() => {}}
          />
          <HeaderButton iconName="user" title="profile" onClick={() => {}} />
        </div>
      </div>
    );
  }
}

export default withGlobalProps(Header);
