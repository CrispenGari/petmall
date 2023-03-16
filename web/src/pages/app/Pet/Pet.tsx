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
interface Props {
  globalProps: GlobalPropsType;
}
const Pet: React.FC<Props> = ({ globalProps: { params } }) => {
  const [{ data }, refetchPet] = useGetPetByIdQuery({
    variables: { input: { id: params.petId as string } },
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
        if (petModification.petInteraction.petId === (params.petId as string)) {
          await refetchPet();
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [refetchPet, petModification, params]);

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
            petId={params.petId || ""}
            replyTo={replyTo}
          />
        )}
      </div>
    </div>
  );
};

export default withGlobalProps(Pet);
