import { TouchableOpacity, Text, Image, View } from "react-native";
import React from "react";
import { styles } from "../../styles";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../types";
import { useLogoutMutation } from "../../graphql/generated/graphql";
import BoxIndicator from "../BoxIndicator/BoxIndicator";
import { COLORS, TOKEN_KEY } from "../../constants";
import { setUser } from "../../actions";
import { del } from "../../utils";

interface Props {
  onPress?: () => void;
}
const DrawerProfile: React.FunctionComponent<Props> = ({ onPress }) => {
  const { user } = useSelector((state: StateType) => state);
  const [{ data, fetching }, logoutHandler] = useLogoutMutation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && data?.logout) {
      (async () => {
        const success = await del(TOKEN_KEY);
        console.log({ success });
        if (success) {
          dispatch(setUser(null));
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [data, dispatch]);

  const logout = async () => {
    await logoutHandler({});
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "white",
        borderBottomWidth: 0.5,
        paddingBottom: 20,
        marginBottom: 10,
      }}
    >
      <Text
        style={[styles.h1, { fontSize: 20, letterSpacing: 1, color: "white" }]}
      >
        PETMALL
      </Text>
      <Image
        source={{
          uri: Image.resolveAssetSource(require("../../../assets/profile.png"))
            .uri,
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 100,
          marginVertical: 10,
        }}
      />
      <Text style={[styles.h1, { color: "white" }]}>{user?.email}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={logout}
        disabled={fetching}
        style={[styles.button, { marginVertical: 10 }]}
      >
        <Text
          style={[
            styles.h1,
            { color: "white", marginRight: fetching ? 10 : 0 },
          ]}
        >
          logout
        </Text>
        {fetching ? <BoxIndicator color={COLORS.main} size={5} /> : null}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default DrawerProfile;
