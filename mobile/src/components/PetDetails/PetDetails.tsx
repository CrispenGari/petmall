import { View, Text, Image } from "react-native";
import React from "react";
import Popover from "react-native-popover-view";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import {
  COLORS,
  FONTS,
  SCREEN_HEIGHT,
  ngrokDomain,
  relativeTimeObject,
} from "../../constants";
import { CommentType, PetType } from "../../graphql/generated/graphql";
import PetButtons from "../PetButtons/PetButtons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Reactions from "../Reactions/Reactions";
import ReactionsSummary from "../ReactionsSummary/ReactionsSummary";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

interface Props {
  pet: PetType;
  reaction: string;
  setReaction: React.Dispatch<React.SetStateAction<string>>;
}
const PetDetails: React.FunctionComponent<Props> = ({
  pet,
  reaction,
  setReaction,
}) => {
  return (
    <View style={{ width: "100%", maxWidth: 500, height: SCREEN_HEIGHT * 0.8 }}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: FONTS.regularBold,
          color: COLORS.white,
        }}
      >
        {pet.name}
      </Text>
      <Text style={{ fontFamily: FONTS.regular, color: COLORS.white }}>
        {pet.age} weeks • {pet.gender.toLowerCase()} • listed{" "}
        {dayjs(new Date(Number(pet.createdAt))).fromNow()} ago
      </Text>
      <Image
        source={{
          uri: pet.image.replace("127.0.0.1:3001", ngrokDomain),
        }}
        style={{
          width: "100%",
          flex: 1,
          borderRadius: 5,
          marginVertical: 3,
          resizeMode: "cover",
        }}
      />
      <Text
        style={{
          fontSize: 20,
          fontFamily: FONTS.regularBold,
          color: COLORS.white,
        }}
      >
        R {pet.price}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily: FONTS.regularBold,
          color: COLORS.white,
        }}
      >
        {pet.description}
      </Text>
      <PetButtons pet={pet} />
      <View style={{}}>
        <Popover
          from={
            <TouchableOpacity>
              <Text>Press here to open popover!</Text>
            </TouchableOpacity>
          }
        >
          <Reactions
            petId={pet.id}
            reaction={reaction}
            sold={pet.sold}
            setReaction={setReaction}
          />
        </Popover>
        <Popover
          from={
            <TouchableOpacity>
              <Text>{pet.reactions?.length || 0} reactions</Text>
            </TouchableOpacity>
          }
        >
          <ReactionsSummary reactions={pet.reactions || []} />
        </Popover>
      </View>
    </View>
  );
};

export default PetDetails;
