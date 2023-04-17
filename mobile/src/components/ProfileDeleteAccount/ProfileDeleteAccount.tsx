import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { setUser } from "../../actions";
import { useDispatch } from "react-redux";
import { COLORS, FONTS, TOKEN_KEY } from "../../constants";
import {
  ErrorType,
  useDeleteAccountMutation,
} from "../../graphql/generated/graphql";
import { del } from "../../utils";
import { styles } from "../../styles";
import BoxIndicator from "../BoxIndicator/BoxIndicator";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import { FontAwesome } from "@expo/vector-icons";
import { useMediaQuery } from "../../hooks";

import { StackNavigationProp } from "@react-navigation/stack";
import { MarketParamList } from "../../params";

interface Props {
  navigation: StackNavigationProp<MarketParamList, "Pets">;
}
const ProfileDeleteAccount: React.FunctionComponent<Props> = ({
  navigation,
}) => {
  const { dimension } = useMediaQuery();
  const [error, setError] = React.useState<ErrorType>({
    field: "",
    message: "",
  });
  const [hidePassword, setHidePassword] = React.useState<boolean>(true);
  const [hideConfPassword, setHideConfPassword] = React.useState<boolean>(true);
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(5);
  const [{ fetching, data }, deleteAccount] = useDeleteAccountMutation();
  const [{ password, confirmPassword }, setForm] = React.useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });
  const deleteAccountHandler = async () => {
    await deleteAccount({
      input: {
        confirmPassword,
        password,
      },
    });
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && data?.deleteAccount.error) {
      setError(data.deleteAccount.error);
      setForm({ confirmPassword: "", password: "" });
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && count > -1 && !!data?.deleteAccount.success) {
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
    if (mounted && count <= 0) {
      (async () => {
        await del(TOKEN_KEY);
        dispatch(setUser(null));
        navigation.navigate("Pets");
      })();
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, count, navigation]);
  return (
    <KeyboardAvoidingView
      style={{
        backgroundColor: COLORS.main,
        marginVertical: 3,
        paddingHorizontal: 5,
        paddingVertical: 10,
      }}
    >
      <Text
        style={{ fontFamily: FONTS.regular, color: COLORS.white, fontSize: 20 }}
      >
        DELETE ACCOUNT
      </Text>
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: 16,
          color: COLORS.tertiary,
        }}
      >
        Deleting your account is an irreversible action. Once you delete your
        account you will lose everything associated to it.
      </Text>
      {data?.deleteAccount.success && (
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

      <View
        style={{
          flexDirection: dimension.width >= 600 ? "row" : "column",
          justifyContent: "space-between",
        }}
      >
        <CustomTextInput
          leftIcon={<FontAwesome name="lock" size={24} color={COLORS.main} />}
          keyboardType="default"
          placeholder="Account Password"
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
          placeholder="Confirm Account Password"
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
          onSubmitEditing={deleteAccountHandler}
        />
      </View>
      {error.field && (
        <Text style={{ color: COLORS.red, fontFamily: FONTS.regular }}>
          {error.message}.
        </Text>
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.button,
          {
            backgroundColor: COLORS.tertiary,
            maxWidth: 200,
            borderRadius: 5,
            marginTop: 10,
            marginLeft: 0,
            alignItems: "center",
          },
        ]}
        disabled={fetching}
        onPress={deleteAccountHandler}
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
          Delete Account
        </Text>
        {fetching ? <BoxIndicator color={COLORS.main} size={5} /> : null}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ProfileDeleteAccount;
