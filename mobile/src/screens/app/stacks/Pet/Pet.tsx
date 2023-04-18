import { View } from "react-native";
import React from "react";
import { MarketNavProps } from "../../../../params";
import { decodeId } from "../../../../utils";
import { BoxIndicator, PetComments, PetDetails } from "../../../../components";
import {
  CommentType,
  useGetPetByIdQuery,
  usePetInteractionSubscription,
} from "../../../../graphql/generated/graphql";
import { useSelector } from "react-redux";
import { StateType } from "../../../../types";
import { COLORS } from "../../../../constants";
import { useDevice } from "../../../../hooks";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { ScrollView } from "react-native-gesture-handler";

const Pet: React.FunctionComponent<MarketNavProps<"Pet">> = ({
  navigation,
  route: {
    params: { petId: id },
  },
}) => {
  const petId: string = decodeId(id);
  const { dimension } = useMediaQuery();
  const { isIpad } = useDevice();
  const [{ data, fetching }, refetchPet] = useGetPetByIdQuery({
    variables: { input: { id: petId } },
  });

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

  if (fetching)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.primary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BoxIndicator size={20} color={COLORS.main} />
      </View>
    );

  if (dimension.width < 768) {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
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
