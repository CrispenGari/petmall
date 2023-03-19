import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HeaderButton } from "..";
import { withGlobalProps } from "../../hoc";
import { GlobalPropsType, StateType } from "../../types";
import { encodeId } from "../../utils";
import "./Header.css";
interface Props {
  globalProps: GlobalPropsType;
}
const Header: React.FC<Props> = ({ globalProps: { navigate, user } }) => {
  const { notifications } = useSelector((state: StateType) => state);
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
            iconName="bell"
            notification={!!notifications.unread}
            title="notifications"
            onClick={() => navigate(`/app/notifications/${encodeId(user.id)}`)}
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
};

export default withGlobalProps(Header);
