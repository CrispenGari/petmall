import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { setUser } from "../../actions";
import { TOKEN_KEY } from "../../constants";
import { LogoutDocument } from "../../graphql/generated/graphql";
import { client } from "../../providers/UrqlProvider";
import { del } from "../../utils";
import "./ProfileLogoutButton.css";
interface Props {}
const ProfileLogoutButton: React.FC<Props> = () => {
  const dispatch = useDispatch();
  return (
    <div className="profile__logout__button">
      <h1>LOGOUT</h1>
      <Button
        primary
        onClick={async () => {
          const { data } = await client
            .mutation(LogoutDocument, {})
            .toPromise();
          if (data.logout) {
            await del(TOKEN_KEY);
            dispatch(setUser(null));
            window.location.reload();
          }
        }}
      >
        LOGOUT
      </Button>
    </div>
  );
};

export default ProfileLogoutButton;