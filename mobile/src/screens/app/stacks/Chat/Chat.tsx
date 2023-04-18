import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useRef } from "react";
import { MarketNavProps } from "../../../../params";
import { COLORS, FONTS, ngrokDomain } from "../../../../constants";
import { decodeId } from "../../../../utils";
import { useSelector } from "react-redux";
import {
  useSendMessageMutation,
  useMarkMessagesAsReadMutation,
  useMarkAsSoldMutation,
  useNewChatMessageSubscription,
  useChatMessagesQuery,
} from "../../../../graphql/generated/graphql";
import { StateType } from "../../../../types";
import { Message } from "../../../../components";
import { useMediaQuery } from "../../../../hooks";

const Chat: React.FunctionComponent<MarketNavProps<"Chat">> = ({
  navigation,
  route: {
    params: { chatId: id },
  },
}) => {
  const scrollViewRef = useRef<React.LegacyRef<ScrollView> | any>();

  const { user: me } = useSelector((state: StateType) => state);
  const [{ fetching: sending }, sendMessage] = useSendMessageMutation();
  const [{ fetching: reading }, readMessages] = useMarkMessagesAsReadMutation();
  const [{ fetching: marking }, markAsSold] = useMarkAsSoldMutation();

  const [{ data: chatMessage }] = useNewChatMessageSubscription({
    variables: {
      input: {
        userId: me?.id || "",
      },
    },
  });
  const chatId = decodeId(id);

  const scrollRef = React.useRef<HTMLDivElement | undefined>();
  const [{ data: chat }, refetchChatMessages] = useChatMessagesQuery({
    variables: { input: { id: chatId } },
  });
  const [message, setMessage] = React.useState<string>(``);

  const sendMessageHandler = async () => {
    if (!!!message.trim()) return;
    await sendMessage({ input: { message, chatId } });
    setMessage("");
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!!me?.emailVerified && !!!me?.isLoggedIn) {
      navigation.replace("Pets");
    }
    return () => {
      mounted = false;
    };
  }, [navigator, me]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!chatId) {
      (async () => {
        await readMessages({ input: { chatId } });
      })();
    }
    return () => {
      mounted = false;
    };
  }, [chatId, readMessages]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!chatMessage?.newChatMessage.userId) {
      (async () => {
        await refetchChatMessages();
        if (scrollRef?.current) {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [refetchChatMessages, chatMessage]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!chat?.chat.chat?.messages) {
      if (scrollRef?.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }
    return () => {
      mounted = false;
    };
  }, [chat]);

  const { dimension } = useMediaQuery();

  const markAsSoldHandler = async () => {
    await markAsSold({ input: { id: chat?.chat.chat?.pet?.id || "" } });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          style={{
            flex: 1,
          }}
          source={{
            uri: chat?.chat.chat?.pet?.image.replace(
              "127.0.0.1:3001",
              ngrokDomain
            ),
          }}
          blurRadius={6}
          resizeMode="cover"
        >
          <ScrollView
            style={{
              marginBottom: 30,
              flex: 1,
              padding: 10,
              height: dimension.height - 80,
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 999,
                backgroundColor: COLORS.main,
                alignSelf: "center",
                paddingHorizontal: 10,
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 16,
                  fontFamily: FONTS.regular,
                }}
              >
                Your messages with are end-to-end encrypted.
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  Alert.alert(
                    "PetMall - End-to-End Encrypted",
                    "This means that your messages with your customer or your seller will be private between the two of you. Not anyone will have access to your messages outside this private chat even the PetMall team can to be able to see your messages.",
                    [{ text: "OK", style: "cancel" }],
                    { cancelable: false }
                  );
                }}
              >
                <Text
                  style={{
                    color: COLORS.tertiary,
                    marginLeft: 3,
                    fontSize: 16,
                    fontFamily: FONTS.regular,
                  }}
                >
                  Learn more.
                </Text>
              </TouchableOpacity>
            </View>

            {chat?.chat.chat?.messages?.map((message) => (
              <Message
                message={message}
                key={message.id}
                navigation={navigation}
              />
            ))}
            <View style={{ height: 100 }} />
          </ScrollView>

          <KeyboardAvoidingView
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
            keyboardVerticalOffset={100 + 20}
            behavior="padding"
            enabled
          >
            <TextInput
              multiline
              editable={!sending}
              onSubmitEditing={sendMessageHandler}
              value={message}
              onChangeText={(text) => setMessage(text)}
              style={{
                backgroundColor: "white",
                flex: 1,
                padding: 10,
                height: 50,
                fontSize: 20,
                fontFamily: FONTS.regular,
                borderRadius: 5,
                marginHorizontal: 10,
              }}
              placeholder="Write a message..."
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: COLORS.tertiary,
                marginRight: 10,
                padding: 10,
                borderRadius: 5,
                width: 100,
                alignItems: "center",
              }}
              disabled={!!!message || sending}
              onPress={sendMessageHandler}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: FONTS.regular,
                }}
              >
                Send
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Chat;
