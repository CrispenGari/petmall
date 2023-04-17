import { View, Text, TouchableOpacity, Button } from "react-native";
import React from "react";
import { LogoutDocument } from "../../graphql/generated/graphql";
import { client } from "../../providers/UrqlProvider";
import { useDispatch } from "react-redux";
import { setUser } from "../../actions";
import { COLORS, FONTS, TOKEN_KEY } from "../../constants";
import { del } from "../../utils";
import { styles } from "../../styles";
import BoxIndicator from "../BoxIndicator/BoxIndicator";
import { StackNavigationProp } from "@react-navigation/stack";
import { MarketParamList } from "../../params";

interface Props {
  navigation: StackNavigationProp<MarketParamList, "Pets">;
}
const ProfileLogoutButton: React.FunctionComponent<Props> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const [fetching, setFetching] = React.useState<boolean>(false);
  return (
    <View
      style={{
        backgroundColor: COLORS.main,
        marginVertical: 3,
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginBottom: 30,
      }}
    >
      <Text
        style={{ fontFamily: FONTS.regular, color: COLORS.white, fontSize: 20 }}
      >
        LOGOUT
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.button,
          {
            backgroundColor: COLORS.tertiary,
            maxWidth: 200,
            borderRadius: 5,
            marginTop: 10,
            marginLeft: 0,
            alignItems: "center",
          },
        ]}
        onPress={async () => {
          setFetching(true);
          const { data } = await client
            .mutation(LogoutDocument as any, {})
            .toPromise();
          if (data.logout) {
            await del(TOKEN_KEY);
            dispatch(setUser(null));
            setFetching(false);
            navigation.navigate("Pets");
          }
        }}
        disabled={fetching}
      >
        <Text
          style={[
            styles.button__text,
            {
              fontFamily: FONTS.regularBold,
              marginRight: fetching ? 10 : 0,
            },
          ]}
        >
          Logout
        </Text>
        {fetching ? <BoxIndicator color={COLORS.main} size={5} /> : null}
      </TouchableOpacity>
    </View>
  );
};

export default ProfileLogoutButton;
