import React from "react";

import { Header, PetComments, PetDetails } from "../../../components";
import {
  CommentType,
  useGetPetByIdQuery,
  usePetInteractionSubscription,
} from "../../../graphql/generated/graphql";
import { withGlobalProps } from "../../../hoc";
import { GlobalPropsType, StateType } from "../../../types";
import "./Pet.css";
import { useSelector } from "react-redux";
import { decodeId } from "../../../utils";
interface Props {
  globalProps: GlobalPropsType;
}
const Pet: React.FC<Props> = ({ globalProps: { params } }) => {
  const petId: string = decodeId(params.petId as string);
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
    <div className="pet__page">
      <Header />
      <div className="pet__page__pet__container">
        {!!data?.getPetById?.pet && (
          <PetDetails
            pet={data.getPetById.pet as any}
            reaction={reaction}
            setReaction={setReaction}
          />
        )}
        {!!data?.getPetById?.pet && (
          <PetComments
            pet={data.getPetById.pet as any}
            setReplyTo={setReplyTo}
            petId={petId}
            replyTo={replyTo}
          />
        )}
      </div>
    </div>
  );
};

export default withGlobalProps(Pet);
