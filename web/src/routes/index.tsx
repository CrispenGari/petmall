import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Routes as R, Route, BrowserRouter as Router } from "react-router-dom";
import { setUser } from "../actions";
import {
  useMeQuery,
  useOnUserStateChangeSubscription,
} from "../graphql/generated/graphql";
import { Chat, Chats, EditPet, Home, NewPet, Pet, Profile } from "../pages/app";
import { Login, Register } from "../pages/auth";
import { NotFound } from "../pages/common";
import { StateType } from "../types";
interface Props {}
const Routes: React.FC<Props> = () => {
  const { user: me } = useSelector((state: StateType) => state);
  const [{ data: newUser }, refetchUser] = useMeQuery();
  const [{ data }] = useOnUserStateChangeSubscription({
    variables: { userId: me?.id || "" },
  });

  console.log({ data });

  console.log({ me: data?.onUserStateChange });
  const dispatch = useDispatch();

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.onUserStateChange) {
      refetchUser();
    }
    return () => {
      mounted = false;
    };
  }, [refetchUser, data]);

  return (
    <Router>
      <R>
        <Route path="/" element={<Navigate to="/app/pets" replace />} />
        <Route path="/app/pets" caseSensitive element={<Home />} />
        <Route path="/auth/login" caseSensitive element={<Login />} />
        <Route path="/auth/register" caseSensitive element={<Register />} />
        <Route path="/app/pet/:petId" caseSensitive element={<Pet />} />
        <Route path="/app/chats/:userId" caseSensitive element={<Chats />} />
        <Route path="/app/chat/:chatId" caseSensitive element={<Chat />} />
        <Route path="/app/pet/new" caseSensitive element={<NewPet />} />
        <Route
          path="/app/pet/edit/:petId"
          caseSensitive
          element={<EditPet />}
        />
        <Route
          path="/app/profile/:userId"
          caseSensitive
          element={<Profile />}
        />
        <Route path="*" caseSensitive element={<NotFound />} />
      </R>
    </Router>
  );
};

export default Routes;
