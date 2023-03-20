import React from "react";
import { Header, Banner, FlatList } from "../../../components";
import { PETS_CATEGORIES } from "../../../constants";

import "./Home.css";
interface Props {}
const Home: React.FC<Props> = () => {
  return (
    <div className="home">
      <Header />
      <Banner />
      {PETS_CATEGORIES.map((category) => (
        <FlatList
          title={category}
          key={category}
          subtitle={`All ${category.toLowerCase()} in the market.`}
        />
      ))}
    </div>
  );
};

export default Home;
