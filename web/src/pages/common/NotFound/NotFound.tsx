import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { Footer } from "../../../components";
import { withGlobalProps } from "../../../hoc";
import { GlobalPropsType } from "../../../types";
import "./NotFound.css";
interface PropsType {
  globalProps: GlobalPropsType;
}
interface StateType {}
class NotFound extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      props: {
        globalProps: { location },
      },
    } = this;
    return (
      <div className="not__found">
        <div className="not__found__wrapper">
          <div className="not__found__card">
            <img alt="logo" src="/adaptive-icon.png" />
            <h1>
              <span>4</span>
              <span>0</span>
              <span>4</span>
            </h1>
            <p>
              Route <span>"{location.pathname}"</span> not found{" "}
            </p>
            <div className="not__found__search__path">
              <Icon name="blind" className="not__found__card__icon" />
            </div>

            <div className="not__found__navs">
              <Link to={"/"} replace={true}>
                HOME
              </Link>
              <Link to={"/auth/sign-up"} replace={true}>
                Sign Up
              </Link>
              <Link to={"/auth/sign-in"} replace={true}>
                Sign In
              </Link>
            </div>
          </div>{" "}
        </div>
        <Footer />
      </div>
    );
  }
}

export default withGlobalProps(NotFound);
