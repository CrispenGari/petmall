import React from "react";
import { Navigate } from "react-router-dom";
import { Routes as R, Route, BrowserRouter as Router } from "react-router-dom";
import {
  Chat,
  Chats,
  EditPet,
  Home,
  NewPet,
  Notifications,
  Pet,
  Profile,
} from "../pages/app";
import { ForgotPassword, Login, Register, VerifyEmail } from "../pages/auth";
import {  NotFound } from "../pages/common";
interface Props {}
const Routes: React.FC<Props> = () => {
  return (
    <Router>
      <R>
        <Route path="/" element={<Navigate to="/app/pets" replace />} />
        <Route path="/app/pets" caseSensitive element={<Home />} />
        <Route path="/auth/login" caseSensitive element={<Login />} />
        <Route path="/auth/register" caseSensitive element={<Register />} />
        <Route
          path="/auth/verify-email"
          caseSensitive
          element={<VerifyEmail />}
        />
        <Route
          path="/auth/change-password"
          caseSensitive
          element={<ForgotPassword />}
        />
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
        <Route
          path="/app/notifications/:userId"
          caseSensitive
          element={<Notifications />}
        />
        <Route path="*" caseSensitive element={<NotFound />} />
      </R>
    </Router>
  );
};

export default Routes;
