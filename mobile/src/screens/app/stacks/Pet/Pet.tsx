import { View } from "react-native";
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
import { COLORS } from "../../../../constants";
import { useDevice } from "../../../../hooks";

const Pet: React.FunctionComponent<MarketNavProps<"Pet">> = ({
  navigation,
  route: {
    params: { petId: id },
  },
}) => {
  const petId: string = decodeId(id);
  const { isIpad } = useDevice();
  const [{ data }, refetchPet] = useGetPetByIdQuery({
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
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        padding: isIpad ? 10 : 5,
        flexDirection: isIpad ? "row" : "column",
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
        />
      )}
    </View>
  );
};

export default Pet;
