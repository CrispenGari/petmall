import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { StateType } from "../types";
import React from "react";
import { useMeQuery } from "../graphql/generated/graphql";
import { setUser } from "../actions";

export const withGlobalProps = (Component: any) => {
  function ComponentWithRouterProp(props: any) {
    const [{ data }] = useMeQuery();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    React.useEffect(() => {
      let mounted: boolean = true;
      if (mounted && !!data) {
        dispatch(setUser(data.me as any));
      }
      return () => {
        mounted = false;
      };
    }, [dispatch, data]);
    const user = useSelector((state: StateType) => state.user);
    const params = useParams();
    return (
      <Component
        {...props}
        globalProps={{
          location,
          navigate,
          params,
          user,
          dispatch,
        }}
      />
    );
  }
  return ComponentWithRouterProp;
};
