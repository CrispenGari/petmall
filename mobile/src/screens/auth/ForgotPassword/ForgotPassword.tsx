import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import {
  ErrorType,
  useRequestForgotPasswordLinkMutation,
} from "../../../graphql/generated/graphql";
import { AppDrawerNavProps } from "../../../params";
import { COLORS, SCREEN_HEIGHT } from "../../../constants";
import { styles } from "../../../styles";
import { BoxIndicator, CustomTextInput } from "../../../components";
import * as Animatable from "react-native-animatable";
import { Entypo } from "@expo/vector-icons";
import Divider from "../../../components/Divider/Divider";
const ForgotPassword: React.FunctionComponent<
  AppDrawerNavProps<"ForgotPassword">
> = ({ navigation }) => {
  const [email, setEmail] = React.useState<string>("");
  const [error, setError] = React.useState<ErrorType>({
    field: "",
    message: "",
  });
  const [{ fetching, data }, requestForgotPasswordLink] =
    useRequestForgotPasswordLinkMutation();

  console.log(JSON.stringify({ data }, null, 2));

  React.useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      navigation.setOptions({
        headerShown: false,
      });
    }
    return () => {
      mounted = false;
    };
  }, []);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.requestForgotPassword.error) {
      setError(data.requestForgotPassword.error);
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.requestForgotPassword.success) {
      setError({ field: "", message: "" });
      Alert.alert(
        "PetMall",
        `The reset password link was sent to your email address ${email}. Resetting password is done on the browser, so after changing your password, please come back and login with new credentials.`,
        [
          { text: "OK", style: "default" },
          { text: "CANCEL", style: "destructive" },
        ],
        { cancelable: false }
      );
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  const requestForgotPasswordLinkHandler = async () => {
    await requestForgotPasswordLink({
      input: { email: email.trim().toLowerCase() },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.main }}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior="padding"
        enabled
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        <ScrollView
          style={{
            flex: 1,
            padding: 10,
            width: "100%",
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          bounces={false}
        >
          <View
            style={{
              height: SCREEN_HEIGHT,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  styles.h1,
                  { color: "white", fontSize: 25, letterSpacing: 1 },
                ]}
              >
                Forgot Password
              </Text>
              <Animatable.Image
                animation={"bounce"}
                duration={2000}
                iterationCount={1}
                easing={"linear"}
                direction={"normal"}
                useNativeDriver={false}
                source={{
                  uri: Image.resolveAssetSource(
                    require("../../../../assets/icon.png")
                  ).uri,
                }}
                style={{
                  width: 100,
                  height: 100,
                  tintColor: "white",
                  marginBottom: 10,
                  resizeMode: "contain",
                }}
              />
              <Animatable.Text
                style={[
                  styles.p,
                  {
                    marginVertical: 10,
                    width: "90%",
                    textAlign: "center",
                    color: "white",
                  },
                ]}
                animation={"zoomIn"}
                iterationCount={1}
                useNativeDriver={false}
              >
                Please enter the email address of your account. The reset
                password link will be directly sent to this email address.{" "}
              </Animatable.Text>
            </View>
            <View
              style={{
                flex: 0.8,
                width: "100%",
                maxWidth: 500,
                padding: 10,
                alignItems: "center",
              }}
            >
              <CustomTextInput
                errorStyle={[styles.p, { color: "red", marginTop: 5 }]}
                leftIcon={<Entypo name="email" size={24} color={COLORS.main} />}
                keyboardType="email-address"
                placeholder="johndoe@petmall.com"
                error={!!error.message ? error.message : ""}
                containerStyles={{
                  width: "100%",
                  maxWidth: 500,
                  borderRadius: 0,
                }}
                text={email}
                onChangeText={(text) => setEmail(text)}
                onSubmitEditing={requestForgotPasswordLinkHandler}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={requestForgotPasswordLinkHandler}
                disabled={fetching}
                style={[
                  styles.button,
                  {
                    width: "100%",
                    marginTop: 30,
                    marginBottom: 10,
                    justifyContent: "center",
                    flexDirection: "row",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.button__text,
                    { fontSize: 20, marginRight: fetching ? 10 : 0 },
                  ]}
                >
                  REQUEST LINK
                </Text>
                {fetching ? (
                  <BoxIndicator color={COLORS.main} size={5} />
                ) : null}
              </TouchableOpacity>
              <Divider title="Oh I remember my password." />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Login")}
                disabled={fetching}
                style={[
                  styles.button,
                  {
                    width: "100%",
                    marginTop: 30,
                    marginBottom: 0,
                    justifyContent: "center",
                    flexDirection: "row",
                    backgroundColor: COLORS.secondary,
                  },
                ]}
              >
                <Text style={[styles.button__text, { fontSize: 20 }]}>
                  LOGIN
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgotPassword;
