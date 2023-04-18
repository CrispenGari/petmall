import React from "react";
import {
  useGetPetsByCategoryQuery,
  useNewCategoryPetSubscription,
} from "../../graphql/generated/graphql";
import "./FlatList.css";
import { NoPets, Pet } from "..";

interface Props {
  title: string;
  subtitle: string;
}
const FlatList: React.FC<Props> = ({ title, subtitle }) => {
  const [{ data }, refetchCategoryPets] = useGetPetsByCategoryQuery({
    variables: {
      input: {
        category: title.toUpperCase(),
      },
    },
  });
  const [{ data: categoryPet }] = useNewCategoryPetSubscription();
  React.useEffect(() => {
    let mounted: boolean = true;
    if (
      mounted &&
      title.toUpperCase() === categoryPet?.categoryPetSubscription.category
    ) {
      (async () => {
        await refetchCategoryPets();
      })();
    }
    return () => {
      mounted = false;
    };
  }, [title, refetchCategoryPets, categoryPet]);

  return (
    <div className="flatlist">
      <h1>{title.replace(/_/g, " ")}</h1>
      <p>{subtitle.replace(/_/g, " ")}</p>
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
