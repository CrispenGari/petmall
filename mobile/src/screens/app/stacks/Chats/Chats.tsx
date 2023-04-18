import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Chat, CustomTextInput } from "../../../../components";
import { COLORS, FONTS } from "../../../../constants";
import { MarketNavProps } from "../../../../params";
import { useSelector } from "react-redux";
import { StateType } from "../../../../types";
import { Feather } from "@expo/vector-icons";

const Chats: React.FunctionComponent<MarketNavProps<"Chats">> = ({
  navigation,
}) => {
  const [filter, setFilter] = React.useState<string>("");
  const { user, chats } = useSelector((state: StateType) => state);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!!user?.emailVerified && !!!user?.isLoggedIn) {
      navigation.navigate("Pets");
    }
    return () => {
      mounted = false;
    };
  }, [navigation, user]);
  const [_chats, set_Chats] = React.useState(chats.chats);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      if (!!filter) {
        set_Chats(
          chats.chats.filter((chat) =>
            chat.chatTitle.toLowerCase().includes(filter.trim().toLowerCase())
          )
        );
      } else {
        set_Chats(chats.chats.filter(Boolean));
      }
    }
    return () => {
      mounted = false;
    };
  }, [filter, chats]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <CustomTextInput
        placeholder="filter chats"
        containerStyles={{}}
        outerContainerStyles={{
          maxWidth: 400,
          backgroundColor: COLORS.primary,
          margin: 10,
        }}
        text={filter}
        onChangeText={(text) => setFilter(text)}
        keyboardType="default"
        leftIcon={<Feather name="search" size={24} color="gray" />}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ padding: 10, backgroundColor: COLORS.main, flex: 1 }}
      >
        {chats.count === 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={{ fontFamily: FONTS.regular, color: COLORS.white }}>
              No new chats.
            </Text>
          </View>
        ) : _chats.length === 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={{ fontFamily: FONTS.regular, color: COLORS.white }}>
              No chats that matches "{filter.trim()}"
            </Text>
          </View>
        ) : (
          _chats.map((chat) => (
            <Chat navigation={navigation} key={chat.id} chat={chat as any} />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Chats;
