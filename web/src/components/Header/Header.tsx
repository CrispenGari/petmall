import React from "react";
import { Link } from "react-router-dom";
import { HeaderButton } from "..";
import { setUser } from "../../actions";
import { TOKEN_KEY } from "../../constants";
import { LogoutDocument } from "../../graphql/generated/graphql";
import { withGlobalProps } from "../../hoc";
import { client } from "../../providers/UrqlProvider";
import { GlobalPropsType } from "../../types";
import { del, encodeId } from "../../utils";
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

  signOut = async () => {
    const { dispatch, location } = this.props.globalProps;
    const { data } = await client.mutation(LogoutDocument, {}).toPromise();
    if (data.logout) {
      await del(TOKEN_KEY);
      dispatch(setUser(null));
      location.reload();
    }
  };

  render() {
    const {
      props: {
        globalProps: { user, navigate },
      },
      signOut,
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
          {!!user ? (
            <div className="">
              <HeaderButton
                iconName="home"
                title="home"
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>
          ) : (
            <div>
              <Link to={"/"} title="home">
                Home
              </Link>
            </div>
          )}
        </div>
        {!!user ? (
          <div className="app__header__right">
            <HeaderButton
              iconName="wechat"
              title="messages"
              onClick={() => {
                navigate(`/app/chats/${encodeId(user.id)}`);
              }}
            />
            <HeaderButton
              iconName="log out"
              title="signout"
              onClick={signOut}
            />
            <HeaderButton
              iconName="add"
              title="add pet"
              onClick={() => {
                navigate("/app/pet/new");
              }}
            />
            <HeaderButton
              iconName="user"
              title="profile"
              onClick={() => {
                navigate(`/app/profile/${encodeId(user.id)}`);
              }}
            />
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
