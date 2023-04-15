import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { UserType } from "../../graphql/generated/graphql";
import { encodeId } from "../../utils";
import { COLORS, FONTS, ngrokDomain } from "../../constants";
import { MarketParamList } from "../../params";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDevice } from "../../hooks";

interface Props {
  seller: UserType;
  navigation: StackNavigationProp<MarketParamList, "Pet">;
}
const SellerCard: React.FunctionComponent<Props> = ({ seller, navigation }) => {
  const { isIpad } = useDevice();

  return (
    <View
      style={{
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <View style={{}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Profile", { userId: encodeId(seller.id) })
          }
        >
          <Text
            style={{
              fontFamily: FONTS.regularBold,
              textDecorationLine: "underline",
              color: COLORS.white,
              fontSize: 20,
            }}
          >
            {seller.firstName} {seller.lastName}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Profile", { userId: encodeId(seller.id) })
          }
        >
          <Text
            style={{
              fontFamily: FONTS.regular,
              color: COLORS.white,
            }}
          >
            {seller.email}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Profile", { userId: encodeId(seller.id) })
        }
      >
        <Image
          source={{
            uri: !!seller.avatar
              ? seller.avatar.replace("127.0.0.1:3001", ngrokDomain)
              : Image.resolveAssetSource(require("../../../assets/profile.png"))
                  .uri,
          }}
          style={{
            width: isIpad ? 100 : 50,
            height: isIpad ? 100 : 50,
            borderRadius: 5,
            marginVertical: 3,
            resizeMode: "cover",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SellerCard;
