import React from "react";
import { useGetPetsByCategoryQuery } from "../../graphql/generated/graphql";
import "./FlatList.css";
import { NoPets, Pet } from "..";

interface Props {
  title: string;
  subtitle: string;
}
const FlatList: React.FC<Props> = ({ title, subtitle }) => {
  const [{ data }] = useGetPetsByCategoryQuery({
    variables: {
      input: {
        category: title.toUpperCase(),
      },
    },
  });
  return (
    <div className="flatlist">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <div className="flatlist__items">
        {data?.getCategoryPets.count === 0 ? (
          <NoPets category={title} />
        ) : (
          data?.getCategoryPets.pets?.map((pet) => (
            <Pet key={pet.id} pet={pet} />
          ))
        )}
      </div>
    </div>
  );
};

export default FlatList;
