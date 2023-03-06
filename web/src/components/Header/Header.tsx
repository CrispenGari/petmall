import React from "react";
import { Link } from "react-router-dom";
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
        {!!user ? (
          <div className="app__header__right">
            <HeaderButton
              iconName="log out"
              title="signout"
              onClick={async () => {}}
            />
            <HeaderButton iconName="add" title="add pet" onClick={() => {}} />
            <HeaderButton iconName="user" title="profile" onClick={() => {}} />
          </div>
        ) : (
          <div className="app__header__right">
            <Link to={"/auth/login"} title="login">
              Login
            </Link>
            <Link to={"/auth/register"} title="register">
              Register
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default withGlobalProps(Header);
