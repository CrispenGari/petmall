import { StackNavigationProp } from "@react-navigation/stack";
import { Image, TouchableOpacity, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { COLORS, FONTS, ngrokDomain } from "../../constants";
import {
  ChatType,
  useMarkAsSoldMutation,
} from "../../graphql/generated/graphql";
import { MarketParamList } from "../../params";
import { StateType } from "../../types";
import { encodeId } from "../../utils";
import { styles } from "../../styles";
import BoxIndicator from "../BoxIndicator/BoxIndicator";
import { useMediaQuery } from "../../hooks";
interface Props {
  chat: ChatType;
  navigation: StackNavigationProp<MarketParamList, "Chat">;
}
const CustomChatHeader: React.FunctionComponent<Props> = ({
  chat,
  navigation,
}) => {
  const [{ fetching: marking }, markAsSold] = useMarkAsSoldMutation();

  const { dimension } = useMediaQuery();
  const markAsSoldHandler = async () => {
    await markAsSold({ input: { id: chat?.pet?.id || "" } });
  };
  const { user: me } = useSelector((state: StateType) => state);

  if (dimension.width < 540) {
    return (
      <View
        style={{
          flexDirection: "column",

          padding: 10,
          backgroundColor: COLORS.primary,
        }}
      >
        <View style={{ width: "100%", flexDirection: "row" }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate("Pet", {
                petId: encodeId(chat.pet?.id || ""),
              })
            }
          >
            <Image
              source={{
                uri: !!chat.pet?.image
                  ? chat.pet.image.replace("127.0.0.1:3001", ngrokDomain)
                  : Image.resolveAssetSource(
                      require("../../../assets/profile.png")
                    ).uri,
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 5,
                marginVertical: 3,
                resizeMode: "cover",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, marginHorizontal: 5 }}
            onPress={() =>
              navigation.navigate("Pet", {
                petId: encodeId(chat.pet?.id || ""),
              })
            }
            activeOpacity={0.7}
          >
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTS.regularBold,
                fontSize: 20,
              }}
            >
              {chat?.chatTitle}
            </Text>
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTS.regularBold,
                fontSize: 20,
              }}
            >
              R {chat.pet?.price}
            </Text>
            <Text
              style={{
                color: "gray",
                fontSize: 14,
                fontFamily: FONTS.regular,
              }}
            >
              {chat?.pet?.seller?.id === me?.id
                ? "You are the seller"
                : `Seller: ${chat?.pet?.seller?.firstName}`}{" "}
              • {chat?.pet?.reactions?.length} reactions •{" "}
              {chat?.pet?.comments?.length} comments
            </Text>
          </TouchableOpacity>
        </View>
        {chat?.pet?.seller?.id === me?.id && (
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.button,
                {
                  backgroundColor: COLORS.main,
                  maxWidth: 100,
                  marginRight: 10,
                  borderRadius: 5,
                },
              ]}
              onPress={() =>
                navigation.navigate("EditPet", {
                  petId: encodeId(chat.pet?.id || ""),
                })
              }
            >
              <Text
                style={[styles.button__text, { fontFamily: FONTS.regularBold }]}
              >
                EDIT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  borderRadius: 5,
                  backgroundColor: COLORS.tertiary,
                  maxWidth: 100,
                },
              ]}
              onPress={markAsSoldHandler}
              disabled={chat.pet?.sold}
            >
              <Text
                style={[
                  styles.button__text,
                  {
                    fontFamily: FONTS.regularBold,
                    marginRight: marking ? 5 : 0,
                  },
                ]}
              >
                SOLD
              </Text>
              {marking ? (
                <BoxIndicator color={COLORS.secondary} size={5} />
              ) : null}
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 10,
        backgroundColor: COLORS.primary,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate("Pet", { petId: encodeId(chat.pet?.id || "") })
        }
      >
        <Image
          source={{
            uri: !!chat.pet?.image
              ? chat.pet.image.replace("127.0.0.1:3001", ngrokDomain)
              : Image.resolveAssetSource(require("../../../assets/profile.png"))
                  .uri,
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 5,
            marginVertical: 3,
            resizeMode: "cover",
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1, marginHorizontal: 5 }}
        onPress={() =>
          navigation.navigate("Pet", { petId: encodeId(chat.pet?.id || "") })
        }
        activeOpacity={0.7}
      >
        <Text
          style={{
            color: COLORS.white,
            fontFamily: FONTS.regularBold,
            fontSize: 20,
          }}
        >
          {chat?.chatTitle}
        </Text>
        <Text
          style={{
            color: COLORS.white,
            fontFamily: FONTS.regularBold,
            fontSize: 20,
          }}
        >
          R {chat.pet?.price}
        </Text>
        <Text
          style={{
            color: "gray",
            fontSize: 14,
            fontFamily: FONTS.regular,
          }}
        >
          {chat?.pet?.seller?.id === me?.id
            ? "You are the seller"
            : `Seller: ${chat?.pet?.seller?.firstName}`}{" "}
          • {chat?.pet?.reactions?.length} reactions •{" "}
          {chat?.pet?.comments?.length} comments
        </Text>
      </TouchableOpacity>

      {chat?.pet?.seller?.id === me?.id && (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.button,
              {
                backgroundColor: COLORS.main,
                maxWidth: 100,
                marginRight: 10,
                borderRadius: 5,
              },
            ]}
            onPress={() =>
              navigation.navigate("EditPet", {
                petId: encodeId(chat.pet?.id || ""),
              })
            }
          >
            <Text
              style={[styles.button__text, { fontFamily: FONTS.regularBold }]}
            >
              EDIT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                borderRadius: 5,
                backgroundColor: COLORS.tertiary,
                maxWidth: 100,
              },
            ]}
            onPress={markAsSoldHandler}
            disabled={chat.pet?.sold}
          >
            <Text
              style={[
                styles.button__text,
                { fontFamily: FONTS.regularBold, marginRight: marking ? 5 : 0 },
              ]}
            >
              SOLD
            </Text>
            {marking ? (
              <BoxIndicator color={COLORS.secondary} size={5} />
            ) : null}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CustomChatHeader;
