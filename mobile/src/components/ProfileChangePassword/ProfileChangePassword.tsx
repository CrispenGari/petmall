import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  ErrorType,
  LogoutDocument,
  useChangeAccountPasswordMutation,
} from "../../graphql/generated/graphql";
import { useDispatch } from "react-redux";
import { client } from "../../providers/UrqlProvider";
import { COLORS, FONTS, TOKEN_KEY } from "../../constants";
import { setUser } from "../../actions";
import { del } from "../../utils";
import { useMediaQuery } from "../../hooks";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import { styles } from "../../styles";
import { FontAwesome } from "@expo/vector-icons";
import BoxIndicator from "../BoxIndicator/BoxIndicator";
import { StackNavigationProp } from "@react-navigation/stack";
import { MarketParamList } from "../../params";

interface Props {
  navigation: StackNavigationProp<MarketParamList, "Pets">;
}
const ProfileChangePassword: React.FunctionComponent<Props> = ({
  navigation,
}) => {
  const [{ fetching, data }, changeAccountPassword] =
    useChangeAccountPasswordMutation();
  const { dimension } = useMediaQuery();
  const dispatch = useDispatch();
  const [hidePassword, setHidePassword] = React.useState<boolean>(true);
  const [hideCurrentPassword, setHideCurrentPassword] =
    React.useState<boolean>(true);
  const [hideConfPassword, setHideConfPassword] = React.useState<boolean>(true);
  const [count, setCount] = React.useState<number>(5);
  const [error, setError] = React.useState<ErrorType>({
    field: "",
    message: "",
  });
  const [{ password, confirmPassword, currentPassword }, setForm] =
    React.useState<{
      password: string;
      confirmPassword: string;
      currentPassword: string;
    }>({
      password: "",
      confirmPassword: "",
      currentPassword: "",
    });

  const changePassword = async () => {
    await changeAccountPassword({
      input: {
        confirmPassword,
        currentAccountPassword: currentPassword,
        password,
      },
    });
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && data?.changeAccountPassword.error) {
      setError(data.changeAccountPassword.error);
      setForm({ confirmPassword: "", password: "", currentPassword: "" });
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && count > -1 && !!data?.changeAccountPassword.success) {
      const intervalId = setInterval(() => {
        setCount((state) => state - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
    return () => {
      mounted = false;
    };
  }, [count, data]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.changeAccountPassword.success && count === 0) {
      (async () => {
        const { data } = await client
          .mutation(LogoutDocument as any, {})
          .toPromise();
        if (data.logout) {
          await del(TOKEN_KEY);
          dispatch(setUser(null));
          navigation.navigate("Pets");
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, count, data, navigation]);

  return (
    <KeyboardAvoidingView
      style={{
        backgroundColor: COLORS.main,
        marginVertical: 3,
        paddingVertical: 10,
        paddingHorizontal: 5,
      }}
    >
      <Text
        style={{ fontFamily: FONTS.regular, color: COLORS.white, fontSize: 20 }}
      >
        CHANGE ACCOUNT PASSWORD
      </Text>
      <Text
        style={{ fontFamily: FONTS.regular, fontSize: 16, color: COLORS.white }}
      >
        When you change your account password, you will need to login again with
        new credentials.
      </Text>
      {data?.changeAccountPassword.success && (
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: 16,
            color: COLORS.white,
          }}
        >
          Logging out in {count}s.
        </Text>
      )}
      {error.field && (
        <Text style={{ color: COLORS.red, fontFamily: FONTS.regular }}>
          {error.message}.
        </Text>
      )}

      <CustomTextInput
        leftIcon={<FontAwesome name="lock" size={24} color={COLORS.main} />}
        keyboardType="default"
        placeholder="Current Account Password"
        containerStyles={{
          borderRadius: 5,
          marginBottom: 2,
          marginTop: 10,
        }}
        outerContainerStyles={{
          width: "100%",
          flex: 1,
        }}
        text={currentPassword}
        rightIcon={
          !hideCurrentPassword ? (
            <FontAwesome name="eye" size={24} color={COLORS.main} />
          ) : (
            <FontAwesome name="eye-slash" size={24} color={COLORS.main} />
          )
        }
        onRightIconPress={() => setHideCurrentPassword((state) => !state)}
        secureTextEntry={hideCurrentPassword}
        onChangeText={(text) =>
          setForm((state) => ({ ...state, currentPassword: text }))
        }
      />
      <View
        style={{
          flexDirection: dimension.width >= 600 ? "row" : "column",
          justifyContent: "space-between",
        }}
      >
        <CustomTextInput
          leftIcon={<FontAwesome name="lock" size={24} color={COLORS.main} />}
          keyboardType="default"
          placeholder="New Password"
          containerStyles={{
            borderRadius: 5,
            marginBottom: 2,
          }}
          outerContainerStyles={{
            width: "100%",
            flex: 1,
          }}
          text={password}
          rightIcon={
            !hidePassword ? (
              <FontAwesome name="eye" size={24} color={COLORS.main} />
            ) : (
              <FontAwesome name="eye-slash" size={24} color={COLORS.main} />
            )
          }
          onRightIconPress={() => setHidePassword((state) => !state)}
          secureTextEntry={hidePassword}
          onChangeText={(text) =>
            setForm((state) => ({ ...state, password: text }))
          }
        />
        <CustomTextInput
          leftIcon={<FontAwesome name="lock" size={24} color={COLORS.main} />}
          keyboardType="default"
          placeholder="Confirm New Password"
          containerStyles={{
            borderRadius: 5,
            marginBottom: 2,
          }}
          outerContainerStyles={{
            width: "100%",
            flex: 1,
            marginLeft: dimension.width >= 600 ? 5 : 0,
          }}
          text={confirmPassword}
          rightIcon={
            !hideConfPassword ? (
              <FontAwesome name="eye" size={24} color={COLORS.main} />
            ) : (
              <FontAwesome name="eye-slash" size={24} color={COLORS.main} />
            )
          }
          onRightIconPress={() => setHideConfPassword((state) => !state)}
          secureTextEntry={hideConfPassword}
          onChangeText={(text) =>
            setForm((state) => ({ ...state, confirmPassword: text }))
          }
          onSubmitEditing={changePassword}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.button,
          {
            backgroundColor: COLORS.primary,
            maxWidth: 200,
            borderRadius: 5,
            marginTop: 10,
            marginLeft: 0,
            alignItems: "center",
          },
        ]}
        disabled={fetching}
        onPress={changePassword}
      >
        <Text
          style={[
            styles.button__text,
            {
              fontFamily: FONTS.regularBold,
              marginRight: fetching ? 10 : 0,
            },
          ]}
        >
          Change Password
        </Text>
        {fetching ? <BoxIndicator color={COLORS.main} size={5} /> : null}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ProfileChangePassword;
