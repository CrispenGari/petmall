import { View, Text } from "react-native";
import React from "react";
import { ReactionType } from "../../graphql/generated/graphql";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { COLORS, FONTS, REACTIONS } from "../../constants";

interface Props {
  reactions: ReactionType[];
}

const ReactionsSummary: React.FunctionComponent<Props> = ({ reactions }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
      {REACTIONS.map((reaction) => (
        <GetReactionIconCount
          key={reaction}
          reaction={reaction}
          reactions={reactions}
        />
      ))}
    </View>
  );
};

export default ReactionsSummary;

const GetReactionIconCount: React.FunctionComponent<{
  reaction: string;
  reactions: ReactionType[];
}> = ({ reaction, reactions }) => {
  const count = reactions.filter((r) => r.reaction === reaction).length || 0;
  return (
    <View style={{ flexDirection: "row", alignItems: "center", margin: 5 }}>
      {reaction === "DISLIKE" ? (
        <AntDesign name="like1" size={16} color={COLORS.main} />
      ) : reaction === "LOVE" ? (
        <Entypo name="heart" size={16} color={COLORS.main} />
      ) : reaction === "OFFER_LOVE" ? (
        <FontAwesome5 name="hand-holding-heart" size={16} color={COLORS.main} />
      ) : reaction === "OFFER_MONEY" ? (
        <FontAwesome5 name="hand-holding-usd" size={16} color={COLORS.main} />
      ) : (
        <AntDesign name="dislike1" size={16} color="black" />
      )}
      <Text style={{ fontFamily: FONTS.regular, color: "gray", marginLeft: 3 }}>
        {count}
      </Text>
    </View>
  );
};
