import React from "react";
import styles from "./Header.module.css";
import { FiUserPlus } from "react-icons/fi";
import { BiLogInCircle } from "react-icons/bi";
import { useRouter } from "next/router";

import HeaderIconButton from "../HeaderIconButton/HeaderIconButton";
import { Image } from "semantic-ui-react";

interface Props {}
const Header: React.FC<Props> = ({}) => {
  const router = useRouter();

  return (
    <div className={styles.header} style={{}}>
      <div className={styles.header__left} onClick={() => router.push("/")}>
        <Image src="/icon.png" alt="logo" width={100} />
      </div>

      <div className={styles.header__right}>
        <HeaderIconButton
          title="Login"
          Icon={BiLogInCircle}
          onClick={() => {
            router.push(`/auth/login`);
          }}
          active={router.pathname.includes("/auth/login")}
        />
        <HeaderIconButton
          title="Register"
          Icon={FiUserPlus}
          onClick={() => {
            router.push(`/auth/register`);
          }}
          active={router.pathname.includes("/auth/register")}
        />
        {/* <div
          className={styles.header__right__profile}
          onClick={() => {
            router.push(`/profile/${1}`);
          }}
        >
          Me
        </div> */}
      </div>
    </div>
  );
};

export default Header;
