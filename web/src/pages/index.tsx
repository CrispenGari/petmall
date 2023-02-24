import { GetServerSidePropsContext, NextPage } from "next";
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {},
    redirect: {
      permanent: true,
      destination: "/app/pets",
    },
  };
}
const Home: NextPage = () => null;
export default Home;
