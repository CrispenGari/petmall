import { View, Text } from "react-native";
import React from "react";
import { MarketNavProps } from "../../../../params";
import { decodeId } from "../../../../utils";
import { PetComments, PetDetails } from "../../../../components";
import {
  CommentType,
  useGetPetByIdQuery,
  usePetInteractionSubscription,
} from "../../../../graphql/generated/graphql";
import { useSelector } from "react-redux";
import { StateType } from "../../../../types";
import { COLORS, FONTS } from "../../../../constants";
import { useDevice } from "../../../../hooks";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../../../../styles";

const Pet: React.FunctionComponent<MarketNavProps<"Pet">> = ({
  navigation,
  route: {
    params: { petId: id },
  },
}) => {
  const petId: string = decodeId(id);
  const { dimension } = useMediaQuery();
  const { isIpad } = useDevice();
  const [{ data }, refetchPet] = useGetPetByIdQuery({
    variables: { input: { id: petId } },
  });
  const scrollViewRef = React.useRef<React.LegacyRef<ScrollView> | any>();
  const [{ data: petModification }] = usePetInteractionSubscription();
  const { user } = useSelector((state: StateType) => state);
  const [reaction, setReaction] = React.useState<string>("");
  const [replyTo, setReplyTo] = React.useState<
    | (CommentType & {
        parentCommentId: string;
      })
    | undefined
  >();

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!petModification?.petInteraction.petId) {
      (async () => {
        if (petModification.petInteraction.petId === petId) {
          await refetchPet();
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [refetchPet, petModification, petId]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.getPetById?.pet?.reactions) {
      const _reaction = data?.getPetById?.pet?.reactions.find(
        (reaction) => reaction.userId === user?.id
      );
      if (!!!_reaction) {
        setReaction("");
      } else {
        setReaction(_reaction.reaction);
      }
    }
    return () => {
      mounted = false;
    };
  }, [user, data]);

  if (!!!data?.getPetById?.pet)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.primary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginHorizontal: 5,
            textAlign: "center",
            color: COLORS.white,
            fontFamily: FONTS.regular,
            fontSize: 16,
          }}
        >
          Ops the pet is no longer available in the market.
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            {
              marginTop: 30,
              backgroundColor: COLORS.main,
              width: 200,
            },
          ]}
          activeOpacity={0.7}
          onPress={() => navigation.replace("Pets")}
        >
          <Text style={[styles.button__text, { fontSize: 16 }]}>
            Go to Pet Market
          </Text>
        </TouchableOpacity>
      </View>
    );

  if (dimension.width < 768) {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
        style={{
          backgroundColor: COLORS.primary,
          padding: isIpad ? 10 : 5,
          flex: 1,
        }}
      >
        {!!data?.getPetById?.pet && (
          <PetDetails
            pet={data?.getPetById?.pet as any}
            reaction={reaction}
            setReaction={setReaction}
            navigation={navigation}
          />
        )}

        {!!data?.getPetById?.pet && (
          <PetComments
            setReplyTo={setReplyTo}
            petId={petId}
            pet={data.getPetById.pet as any}
            replyTo={replyTo}
            navigation={navigation}
          />
        )}
      </ScrollView>
    );
  }

  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        padding: isIpad ? 10 : 5,
        flexDirection: "row",
        alignItems: "flex-start",
        flex: 1,
      }}
    >
      {!!data?.getPetById?.pet && (
        <PetDetails
          pet={data?.getPetById?.pet as any}
          reaction={reaction}
          setReaction={setReaction}
          navigation={navigation}
        />
      )}

      {!!data?.getPetById?.pet && (
        <PetComments
          setReplyTo={setReplyTo}
          petId={petId}
          pet={data.getPetById.pet as any}
          replyTo={replyTo}
          navigation={navigation}
        />
      )}
    </View>
  );
};

export default Pet;
