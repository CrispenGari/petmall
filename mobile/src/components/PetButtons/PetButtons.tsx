import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  PetType,
  useMarkAsSoldMutation,
  useNewChatMutation,
} from "../../graphql/generated/graphql";
import { encodeId } from "../../utils";
import { useSelector } from "react-redux";
import { StateType } from "../../types";
import { styles } from "../../styles";
import { COLORS, FONTS } from "../../constants";
import CustomTextInput from "../CustomTextInput/CustomTextInput";

interface Props {
  pet: PetType;
}
const PetButtons: React.FunctionComponent<Props> = ({ pet }) => {
  const { user } = useSelector((state: StateType) => state);
  const [{ fetching: marking }, markAsSold] = useMarkAsSoldMutation();
  const [{ fetching: sending, data }, newChat] = useNewChatMutation();
  const [message, setMessage] = React.useState<string>(
    `Hey ${pet.seller?.firstName}, is this still available?`
  );
  const sendMessage = async () => {
    if (!!!message.trim()) return;
    await newChat({
      input: { message, userId: pet.seller?.id || "", petId: pet.id },
    });
    setMessage("");
  };
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.newChat.chatId) {
      //   navigate(`/app/chat/${encodeId(data.newChat.chatId)}`);
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  const markAsSoldHandler = async () => {
    await markAsSold({ input: { id: pet.id } });
  };

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-start",
        marginVertical: 10,
      }}
    >
      <CustomTextInput
        outerContainerStyles={{ flex: 1 }}
        text={message}
        onChangeText={(text) => setMessage(text)}
        multiline
        placeholder="Write a message to the seller..."
        containerStyles={{ padding: 5 }}
        inputStyle={{ margin: 0 }}
        numberOfLines={2}
      />
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: COLORS.main,
            width: 100,
            borderRadius: 5,
            marginTop: 0,
            marginLeft: 5,
          },
        ]}
        onPress={markAsSoldHandler}
        disabled={pet.sold}
      >
        <Text style={[styles.button__text, { fontFamily: FONTS.regularBold }]}>
          SEND
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: COLORS.main, flex: 1, marginRight: 10 },
        ]}
      >
        <Text style={[styles.button__text, { fontFamily: FONTS.regularBold }]}>
          EDIT
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: COLORS.tertiary, flex: 1 }]}
        onPress={markAsSoldHandler}
        disabled={pet.sold}
      >
        <Text style={[styles.button__text, { fontFamily: FONTS.regularBold }]}>
          SOLD
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default PetButtons;
