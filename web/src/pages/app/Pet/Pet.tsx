import React from "react";

import { Header, PetComments, PetDetails } from "../../../components";
import {
  CommentType,
  useGetPetByIdQuery,
  useNewChatMessageSubscription,
  useNewNotificationSubscription,
  usePetInteractionSubscription,
} from "../../../graphql/generated/graphql";
import { withGlobalProps } from "../../../hoc";
import { GlobalPropsType, StateType } from "../../../types";
import "./Pet.css";
import { useSelector } from "react-redux";
import { decodeId, sendNotification } from "../../../utils";
import { useNavigate } from "react-router-dom";
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

  const navigator = useNavigate();
  const [noti, setNoti] = React.useState<{
    message: string;
    title: string;
    data: {
      type: "pet-interaction" | "new-message";
      id: string;
    };
  }>({
    message: "",
    title: "",
    data: { id: "", type: "pet-interaction" },
  });
  const { user: me } = useSelector((state: StateType) => state);
  const [{ data: notification }] = useNewNotificationSubscription({
    variables: {
      input: {
        userId: me?.id || "",
      },
    },
  });
  const [{ data: chatMessage }] = useNewChatMessageSubscription({
    variables: {
      input: {
        userId: me?.id || "",
      },
    },
  });

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!chatMessage?.newChatMessage.userId) {
      (async () => {
        if (!!chatMessage.newChatMessage) {
          if (!!chatMessage.newChatMessage.chatId) {
            setNoti({
              title: `New Market Message - PetMall`,
              message: "You have a new chat message.",
              data: {
                id: chatMessage.newChatMessage.chatId,
                type: "new-message",
              },
            });
          }
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [chatMessage]);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!notification?.newNotification) {
      (async () => {
        if (!!notification.newNotification.notification) {
          if (!!notification.newNotification.petId) {
            setNoti({
              title: `New Notification - PetMall`,
              message: notification.newNotification.notification.notification,
              data: {
                id: notification.newNotification.petId,
                type: "pet-interaction",
              },
            });
          }
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [notification]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!noti.title && !!navigator) {
      (async () => {
        sendNotification(noti.title, noti.message, noti.data, navigator);
        setNoti({
          message: "",
          title: "",
          data: { id: "", type: "pet-interaction" },
        });
      })();
    }
    return () => {
      mounted = false;
    };
  }, [noti, navigator]);

  if (!!!data?.getPetById?.pet)
    return (
      <div className="pet__page">
        <Header />
        <div className="pet__page__no__pet">
          <p>Ops the pet is no longer available in the market.</p>
        </div>
      </div>
    );
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
