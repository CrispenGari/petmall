import { useHelloQuery } from "@/graphql/generated/graphql";
import styles from "@/styles/Home.module.css";

const Home = () => {
  const [{ fetching, data, error }, reexecuteQuery] = useHelloQuery({
    variables: {
      name: "Me",
    },
  });
  return <div>{JSON.stringify({ fetching, data, error }, null, 2)} </div>;
};

export default Home;
