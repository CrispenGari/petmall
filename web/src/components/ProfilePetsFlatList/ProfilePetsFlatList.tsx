import React from "react";
import { useGetUserQuery } from "../../graphql/generated/graphql";
import "./ProfilePetsFlatList.css";
import { NoPets, Pet } from "..";
import { Select } from "semantic-ui-react";
import { PETS_CATEGORIES } from "../../constants";

interface Props {
  category: string;
  subtitle: string;
  userId: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}
const ProfilePetsFlatList: React.FC<Props> = ({
  category,
  subtitle,
  userId: id,
  setCategory,
}) => {
  const [{ data }] = useGetUserQuery({
    variables: { input: { id } },
  });

  if (data?.user.pets.length === 0)
    return (
      <div className="profile__pets__flatlist__not__pets">
        <p>No pets in the market.</p>
      </div>
    );
  return (
    <div className="profile__pets__flatlist">
      <div className="profile__pets__flatlist__header">
        <div className="profile__pets__flatlist__header__left">
          <h1>{category.replace(/_/g, " ")}</h1>
          <p>{subtitle.replace(/_/g, " ")}</p>
        </div>
        <Select
          className={"new__pet__form__input"}
          placeholder="Filter Category"
          options={["ALL PETS", ...PETS_CATEGORIES].map((category) => ({
            key: category,
            value: category,
            text: category.replace(/_/g, " "),
          }))}
          value={category}
          onChange={(e, { value }) => setCategory(value as any)}
        />
      </div>

      <div className="profile__pets__flatlist__items">
        {category === "ALL PETS" ? (
          data?.user.pets
            .filter(Boolean)
            .map((pet) => <Pet key={pet.id} pet={pet} />)
        ) : data?.user.pets.filter((pet) => pet.category === category)
            .length === 0 ? (
          <NoPets category={category} />
        ) : (
          data?.user.pets
            .filter((pet) => pet.category === category)
            .map((pet) => <Pet key={pet.id} pet={pet} />)
        )}
      </div>
    </div>
  );
};

export default ProfilePetsFlatList;
