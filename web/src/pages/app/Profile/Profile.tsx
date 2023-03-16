import React from "react";
import { useParams } from "react-router-dom";
import {
  Footer,
  Header,
  ProfileCard,
  ProfileLogoutButton,
  ProfilePetsFlatList,
} from "../../../components";

import "./Profile.css";

interface Props {}
const Profile: React.FC<Props> = () => {
  const params = useParams();
  const [category, setCategory] = React.useState<string>("ALL PETS");

  return (
    <div className="profile">
      <Header />
      <ProfileCard
        userId={params.userId || ""}
        setCategory={setCategory}
        category={category}
      />
      <ProfilePetsFlatList
        userId={params.userId || ""}
        category={category}
        subtitle={`Pet in the market.`}
        setCategory={setCategory}
      />
      <ProfileLogoutButton />
      <Footer />
    </div>
  );
};

export default Profile;
