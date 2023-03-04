import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { AppDrawerNavProps } from "../../params";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import { FONTS, COLORS, SCREEN_HEIGHT, TOKEN_KEY } from "../../constants";
import { styles } from "../../styles";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { BoxIndicator, Footer, CustomTextInput } from "../../components";
import Divider from "../../components/Divider/Divider";
import { useRegisterMutation } from "../../graphql/generated/graphql";
import { store } from "../../utils";
import { useDispatch } from "react-redux";
import { setUser } from "../../actions";

interface ErrorType {
  message: string;
  field: "email" | "password" | "confirm-password" | string;
}
const Register: React.FunctionComponent<AppDrawerNavProps<"Register">> = ({
  navigation,
}) => {
  const [password, setPassword] = React.useState<string>("");
  const [hidePassword, setHidePassword] = React.useState<boolean>(true);
  const [email, setEmail] = React.useState<string>("");
  const [hideConfPassword, setHideConfPassword] = React.useState<boolean>(true);
  const [conf, setConf] = React.useState<string>("");
  const [error, setError] = React.useState<ErrorType | undefined>();
  const [{ fetching, data }, registerHandler] = useRegisterMutation();
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

  useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.register) {
      if (data.register.error) {
        setError(data.register.error);
        setPassword("");
        setConf("");
      } else {
        setConf("");
        setEmail("");
        setError(undefined);
        setPassword("");
        dispatch(setUser(data.register.me || null));
        (async () => {
          const success = await store(TOKEN_KEY, data.register.jwt ?? "");
          if (success) {
            navigation.navigate("Market");
          }
        })();
      }
    }
    return () => {
      mounted = false;
    };
  }, [data, dispatch, navigation]);

  const register = async () => {
    await registerHandler({
      input: {
        email,
        confirmPassword: conf,
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
                flex: 0.35,
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
                REGISTER to PETMALL
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
                flex: 0.65,
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
                error={error?.field === "email" ? error.message : ""}
                errorStyle={[styles.p, { color: "red", marginTop: 5 }]}
                leftIcon={<Entypo name="email" size={24} color={COLORS.main} />}
                keyboardType="email-address"
                placeholder="johndoe@petmall.com"
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
              />

              <CustomTextInput
                label="Confirm Password"
                labelStyle={{
                  color: "white",
                  fontFamily: FONTS.regularBold,
                  fontSize: 20,
                  marginBottom: 5,
                }}
                error={error?.field === "confirm-password" ? error.message : ""}
                errorStyle={[styles.p, { color: "red", marginTop: 5 }]}
                leftIcon={<Entypo name="email" size={24} color={COLORS.main} />}
                keyboardType="email-address"
                placeholder="confirm password"
                containerStyles={{
                  width: "100%",
                  maxWidth: 500,
                }}
                text={conf}
                rightIcon={
                  !hideConfPassword ? (
                    <FontAwesome name="eye" size={24} color={COLORS.main} />
                  ) : (
                    <FontAwesome
                      name="eye-slash"
                      size={24}
                      color={COLORS.main}
                    />
                  )
                }
                onRightIconPress={() => setHideConfPassword((state) => !state)}
                secureTextEntry={hideConfPassword}
                onChangeText={(text) => setConf(text)}
                onSubmitEditing={register}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={register}
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
                  REGISTER
                </Text>
                {fetching ? (
                  <BoxIndicator color={COLORS.main} size={5} />
                ) : null}
              </TouchableOpacity>
              <Divider title="Already a member of PETMALL?" />

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
          <View style={{ height: 100 }} />
        </ScrollView>
        <Footer />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;
