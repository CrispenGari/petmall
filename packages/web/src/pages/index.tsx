import { useHelloQuery } from "@petmall/shared";
import React from "react";

const Home = ({}) => {
  const [{ fetching, data, error }, _] = useHelloQuery({
    variables: {
      name: "Hello",
    },
  });
  return (
    <div className="index">
      <pre>
        <code>{JSON.stringify({ fetching, data, error }, null, 2)}</code>
      </pre>
    </div>
  );
};

export default Home;
