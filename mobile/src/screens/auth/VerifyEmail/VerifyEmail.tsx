import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { AppDrawerNavProps } from "../../../params";
import { COLORS, SCREEN_HEIGHT, TOKEN_KEY } from "../../../constants";
import { styles } from "../../../styles";
import * as Animatable from "react-native-animatable";
import { BoxIndicator, CustomTextInput } from "../../../components";
import {
  ErrorType,
  useResendVerificationCodeMutation,
  useVerifyEmailMutation,
} from "../../../graphql/generated/graphql";
import { useDispatch } from "react-redux";

import { Ionicons } from "@expo/vector-icons";
import { store } from "../../../utils";
import { setUser } from "../../../actions";
const VerifyEmail: React.FunctionComponent<
  AppDrawerNavProps<"VerifyEmail">
> = ({
  navigation,
  route: {
    params: { email },
  },
}) => {
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
  const [{ fetching, data }, verifyEmail] = useVerifyEmailMutation();
  const [{ fetching: resending, data: result }, resendVerificationCode] =
    useResendVerificationCodeMutation();
  const dispatch = useDispatch();
  const [code, setCode] = React.useState<string>("");
  const [message, setMessage] =
    React.useState<string>(`The verification code has been sent to ${email}. Please check
  your emails.`);
  const [error, setError] = React.useState<ErrorType>({
    field: "",
    message: "",
  });
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!result?.resendVerificationCode.me) {
      setMessage(
        `The verification code has been resent to ${result?.resendVerificationCode.me?.email}.`
      );
    }
    return () => {
      mounted = false;
    };
  }, [result]);
  const verifyEmailHandler = async () => {
    await verifyEmail({ input: { code, email } });
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.verifyEmail) {
      if (data.verifyEmail.error) {
        setCode("");
        setError(data.verifyEmail.error);
      } else {
        setError({ field: "", message: "" });
      }
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.verifyEmail.jwt) {
      (async () => {
        const value = await store(TOKEN_KEY, data.verifyEmail.jwt as any);
        if (value) {
          dispatch(setUser(data.verifyEmail.me as any));
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [data, dispatch]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.verifyEmail.jwt) {
      setError({ field: "", message: "" });
      setCode("");
      navigation.navigate("Market");
    }
    return () => {
      mounted = false;
    };
  }, [data, navigation]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!result?.resendVerificationCode) {
      if (result.resendVerificationCode.error) {
        setCode("");
        setError(result.resendVerificationCode.error);
      } else {
        setError({ field: "", message: "" });
      }
    }
    return () => {
      mounted = false;
    };
  }, [result]);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!result?.resendVerificationCode.jwt) {
      (async () => {
        const value = await store(
          TOKEN_KEY,
          result.resendVerificationCode.jwt as any
        );
        if (value) {
          dispatch(setUser(result.resendVerificationCode.me as any));
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [result, dispatch]);

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
                Verify Email
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
                {message}
              </Animatable.Text>
            </View>
            <View
              style={{
                flex: 0.65,
                width: "100%",
                maxWidth: 500,
                padding: 10,
                alignItems: "center",
              }}
            >
              <CustomTextInput
                error={!!error ? error.message : ""}
                errorStyle={[styles.p, { color: "red", marginTop: 5 }]}
                leftIcon={
                  <Ionicons name="person-sharp" size={24} color={COLORS.main} />
                }
                keyboardType="phone-pad"
                placeholder="0 0 0 - 0 0 0"
                containerStyles={{
                  width: "100%",
                  maxWidth: 500,
                  borderRadius: 0,
                }}
                text={code}
                onChangeText={(text) => setCode(text)}
              />

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={async () => {
                  await resendVerificationCode({});
                }}
                disabled={resending || fetching}
                style={{
                  marginVertical: 20,
                  alignSelf: "flex-end",
                }}
              >
                <Text
                  style={[
                    styles.button__text,
                    { fontSize: 20, textDecorationLine: "underline" },
                  ]}
                >
                  Did not receive the code?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={verifyEmailHandler}
                disabled={fetching || resending}
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
                  VERIFY EMAIL
                </Text>
                {fetching ? (
                  <BoxIndicator color={COLORS.main} size={5} />
                ) : null}
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default VerifyEmail;
