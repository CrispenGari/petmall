import React from "react";
import { useGetPetsByCategoryQuery } from "../../graphql/generated/graphql";

interface Props {
  title: string;
  subtitle: string;
}
const FlatList: React.FC<Props> = ({ title, subtitle }) => {
  const [{ data, fetching }] = useGetPetsByCategoryQuery({
    variables: {
      input: {
        category: "CATS",
      },
    },
  });
  console.log({ data, fetching });
  return (
    <div className="flatlist">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <div className="flatlist__items"></div>
    </div>
  );
};

export default FlatList;
