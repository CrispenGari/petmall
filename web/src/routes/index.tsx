import React from "react";
import { Navigate } from "react-router-dom";
import { Routes as R, Route, BrowserRouter as Router } from "react-router-dom";
import { Home } from "../pages/app";
import {} from "../pages/auth";
import { NotFound } from "../pages/common";

interface PropsType {
  user: any;
}
interface StateType {}
export class Routes extends React.Component<PropsType, StateType> {
  render() {
    // const { user } = this.props;
    return (
      <Router>
        <R>
          <Route path="/" element={<Navigate to="/app/pets" replace />} />
          <Route path="/app/pets" caseSensitive element={<Home />} />
          <Route path="*" caseSensitive element={<NotFound />} />
        </R>
      </Router>
    );
  }
}
