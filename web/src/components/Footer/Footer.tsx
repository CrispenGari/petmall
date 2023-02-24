import React from "react";
import styles from "./Footer.module.css";
interface Props {}
const Footer: React.FC<Props> = ({}) => {
  return (
    <div className={styles.footer}>
      <p>
        Copyright © {new Date().getFullYear()} PetMall Inc. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
