import React from "react";

import { Header, Banner, FlatList } from "../../../components";
import { RELOADED_KEY, PETS_CATEGORIES } from "../../../constants";

import { retrieve, store } from "../../../utils";

import "./Home.css";
interface Props {}
const Home: React.FC<Props> = () => {
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      (async () => {
        const reloaded = await retrieve(RELOADED_KEY);
        if (!!!reloaded) {
          await store(RELOADED_KEY, "reloaded");
          window.location.reload();
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, []);
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
