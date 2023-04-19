import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Footer,
  Header,
  ProfileCard,
  ProfileChangePassword,
  ProfileDeleteAccount,
  ProfileLogoutButton,
  ProfilePetsFlatList,
} from "../../../components";
import { StateType } from "../../../types";
import { decodeId } from "../../../utils";

import "./Profile.css";

interface Props {}
const Profile: React.FC<Props> = () => {
  const params = useParams();

  const userId: string = decodeId(params.userId as string);
  const [category, setCategory] = React.useState<string>("ALL PETS");
  const { user } = useSelector((state: StateType) => state);
  const navigator = useNavigate();
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!!user?.emailVerified && !!!user?.isLoggedIn) {
      navigator("/app/pets", { replace: true });
    }
    return () => {
      mounted = false;
    };
  }, [navigator, user]);

  return (
    <div className="profile">
      <Header />
      <ProfileCard
        userId={userId}
        setCategory={setCategory}
        category={category}
      />
      <ProfilePetsFlatList
        userId={userId}
        category={category}
        subtitle={`Pet in the market.`}
        setCategory={setCategory}
      />
      {user?.id === userId && (
        <>
          <ProfileChangePassword />
          <ProfileDeleteAccount />
          <ProfileLogoutButton />
        </>
      )}

      <Footer />
    </div>
  );
};

export default Profile;
