import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../actions";
import { Header, Banner, Loading, FlatList } from "../../../components";
import { PETS_CATEGORIES } from "../../../constants";
import { useMeQuery } from "../../../graphql/generated/graphql";

import "./Home.css";
interface Props {}
const Home: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [{ data, fetching }] = useMeQuery();
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.me) {
      dispatch(
        setUser({
          createdAt: data.me.createdAt,
          email: data.me.email,
          id: data.me.id,
          updatedAt: data.me.updatedAt,
        })
      );
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, data]);

  if (fetching) {
    return <Loading />;
  }
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
