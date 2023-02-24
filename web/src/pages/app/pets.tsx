import React from "react";
import styles from "@/styles/Pets.module.css";
import Header from "@/components/Header/Header";
import { GetServerSidePropsContext, NextPage } from "next";
import { client } from "@/providers/UrqlProvider";
import { MeDocument } from "@/graphql/generated/graphql";
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const result = await client.query(MeDocument, {}).toPromise();
  return {
    props: {
      me: JSON.stringify({ me: result.data.me }),
    },
  };
}

const Pets: NextPage<{
  me: string;
}> = ({ me }) => {
  return (
    <div className={styles.pets}>
      <div className={styles.pets__feed}>
        <Header />
        <div className={styles.pets__feed__main}></div>
      </div>
    </div>
  );
};

export default Pets;
