import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { AppDrawerNavProps } from "../../params";
import * as Animatable from "react-native-animatable";

import { FONTS, COLORS, SCREEN_HEIGHT, TOKEN_KEY } from "../../constants";
import { styles } from "../../styles";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { BoxIndicator, Footer, CustomTextInput } from "../../components";
import Divider from "../../components/Divider/Divider";
import { useLoginMutation } from "../../graphql/generated/graphql";
import { store } from "../../utils";
import { useDispatch } from "react-redux";
import { setUser } from "../../actions";

interface ErrorType {
  message: string;
  field: "email" | "password" | "confirm-password" | string;
}

const Login: React.FunctionComponent<AppDrawerNavProps<"Login">> = ({
  navigation,
}) => {
  const [password, setPassword] = React.useState<string>("");
  const [hidePassword, setHidePassword] = React.useState<boolean>(true);
  const [email, setEmail] = React.useState<string>("");
  const [error, setError] = React.useState<ErrorType | undefined>();
  const [{ data, fetching }, loginHandler] = useLoginMutation();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
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
    if (mounted && !!data?.login) {
      if (data.login.error) {
        setError(data.login.error);
        setPassword("");
      } else {
        setEmail("");
        setError(undefined);
        setPassword("");
        dispatch(setUser(data.login.me || null));
        (async () => {
          await store(TOKEN_KEY, data.login.jwt ?? "");
          navigation.navigate("Market");
        })();
      }
    }
    return () => {
      mounted = false;
    };
  }, [data, dispatch]);

  const login = async () => {
    await loginHandler({
      input: {
        email,
        password,
      },
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
                flex: 0.4,
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
                LOGIN to PETMALL
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
                    require("../../../assets/icon.png")
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
                If you have an account please click the LOGIN button.
              </Animatable.Text>
            </View>
            <View
              style={{
                flex: 0.6,
                width: "100%",
                maxWidth: 500,
                padding: 10,
                alignItems: "center",
              }}
            >
              <CustomTextInput
                label="Email Address"
                labelStyle={{
                  color: "white",
                  fontFamily: FONTS.regularBold,
                  fontSize: 20,
                  marginBottom: 5,
                }}
                errorStyle={[styles.p, { color: "red", marginTop: 5 }]}
                leftIcon={<Entypo name="email" size={24} color={COLORS.main} />}
                keyboardType="email-address"
                placeholder="johndoe@petmall.com"
                error={error?.field === "email" ? error.message : ""}
                containerStyles={{
                  width: "100%",
                  maxWidth: 500,
                }}
                text={email}
                onChangeText={(text) => setEmail(text)}
              />

              <CustomTextInput
                label="Password"
                labelStyle={{
                  color: "white",
                  fontFamily: FONTS.regularBold,
                  fontSize: 20,
                  marginBottom: 5,
                }}
                error={error?.field === "password" ? error.message : ""}
                errorStyle={[styles.p, { color: "red", marginTop: 5 }]}
                leftIcon={<Entypo name="email" size={24} color={COLORS.main} />}
                keyboardType="email-address"
                placeholder="password"
                containerStyles={{
                  width: "100%",
                  maxWidth: 500,
                }}
                text={password}
                rightIcon={
                  !hidePassword ? (
                    <FontAwesome name="eye" size={24} color={COLORS.main} />
                  ) : (
                    <FontAwesome
                      name="eye-slash"
                      size={24}
                      color={COLORS.main}
                    />
                  )
                }
                onRightIconPress={() => setHidePassword((state) => !state)}
                secureTextEntry={hidePassword}
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={login}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={login}
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
                  LOGIN
                </Text>
                {fetching ? (
                  <BoxIndicator color={COLORS.main} size={5} />
                ) : null}
              </TouchableOpacity>
              <Divider title="New to PETMALL?" />

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Register")}
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
                  REGISTER
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Footer />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
