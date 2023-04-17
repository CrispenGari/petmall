import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../actions";
import { COLORS, FONTS, TOKEN_KEY, ngrokDomain } from "../../constants";
import * as ImagePicker from "expo-image-picker";
import { Entypo, Ionicons } from "@expo/vector-icons";
import {
  useUpdateProfileAvatarMutation,
  useUpdateUserInfoMutation,
  useGetUserQuery,
  ErrorType,
} from "../../graphql/generated/graphql";
import { StateType } from "../../types";
import { generateRNFile, store } from "../../utils";
import { styles } from "../../styles";
import { useMediaPermission, useMediaQuery } from "../../hooks";
import BoxIndicator from "../BoxIndicator/BoxIndicator";
import CustomTextInput from "../CustomTextInput/CustomTextInput";

interface Props {
  userId: string;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}
const ProfileCard: React.FC<Props> = ({
  userId: id,
  category,
  setCategory,
}) => {
  const { dimension } = useMediaQuery();
  const { camera, gallery } = useMediaPermission();
  const { user: me } = useSelector((state: StateType) => state);
  const [
    { fetching: updatingAvatar, data: updatedAvatarResult },
    updateAvatar,
  ] = useUpdateProfileAvatarMutation();
  const [{ fetching: updatingInfo, data: updatedUserInfo }, updateUserInfo] =
    useUpdateUserInfoMutation();
  const [{ data }, refetchUser] = useGetUserQuery({
    variables: { input: { id } },
  });
  const [{ email, image, firstName, lastName }, setForm] = React.useState<{
    email: string;
    image: any;
    firstName: string;
    lastName: string;
  }>({
    image: null,
    email: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = React.useState<ErrorType>({
    field: "",
    message: "",
  });
  const [previewImage, setPreviewImage] = React.useState("");
  const [enableEdit, setEnableEdit] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.user) {
      const { firstName, lastName, email } = data.user;
      setForm((state) => ({ ...state, email, firstName, lastName }));
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  const updateProfileAvatar = async () => {
    if (!!!image) {
      setPreviewImage(me?.avatar || "");
      return;
    }
    await updateAvatar({ input: { avatar: image } });
    setPreviewImage(me?.avatar || "");
  };

  const handleSelectImage = async (platform: "camera" | "gallery") => {
    if (platform === "gallery") {
      if (!gallery) return;
      const image = await ImagePicker.launchImageLibraryAsync({
        aspect: [1, 1],
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        allowsEditing: true,
      });
      if (image.canceled) return;
      const payload = {
        name:
          image.assets[0].fileName ?? Math.random().toString().substring(2, 6),
        uri: image.assets[0].uri,
      };
      setPreviewImage(payload.uri);
      const img = await generateRNFile({
        ...payload,
      });
      setForm((state) => ({ ...state, image: img }));
    } else {
      if (!camera) return;
      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
      });
      if (image.canceled) return;
      const payload = {
        name:
          image.assets[0].fileName ?? Math.random().toString().substring(2, 6),
        uri: image.assets[0].uri,
      };
      setPreviewImage(payload.uri);

      const img = await generateRNFile({
        ...payload,
      });
      setForm((state) => ({ ...state, image: img }));
    }
  };

  const updateProfileInfo = async () => {
    await updateUserInfo({ input: { email, firstName, lastName } });
    setEnableEdit(false);
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!updatedUserInfo?.updateUserInfo) {
      if (updatedUserInfo.updateUserInfo.error) {
        setError(updatedUserInfo.updateUserInfo.error);
      } else {
        setError({ field: "", message: "" });
      }
    }
    return () => {
      mounted = false;
    };
  }, [updatedUserInfo]);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!updatedUserInfo?.updateUserInfo.jwt) {
      (async () => {
        const value = await store(
          TOKEN_KEY,
          updatedUserInfo.updateUserInfo.jwt as any
        );
        if (value) {
          dispatch(setUser(updatedUserInfo.updateUserInfo.me as any));
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [updatedUserInfo, dispatch]);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      if (!!updatedAvatarResult?.updateAvatar) {
        (async () => {
          await refetchUser();
        })();
      }
    }
    return () => {
      mounted = false;
    };
  }, [updatedAvatarResult, refetchUser]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!me) {
      setPreviewImage(me.avatar || "");
    }
    return () => {
      mounted = false;
    };
  }, [me]);
  return (
    <View
      style={{ padding: 20, backgroundColor: COLORS.main, marginVertical: 5 }}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={{
            uri: !!previewImage
              ? previewImage.replace("127.0.0.1:3001", ngrokDomain)
              : Image.resolveAssetSource(require("../../../assets/profile.png"))
                  .uri,
          }}
          style={{
            width: 150,
            height: 150,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={[
              styles.button,
              {
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 40,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => handleSelectImage("camera")}
          >
            <Entypo name="camera" size={16} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 40,
                marginLeft: 20,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => handleSelectImage("gallery")}
          >
            <Entypo name="images" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {!!!previewImage.startsWith("http") && (
          <>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setPreviewImage(me?.avatar || "");
              }}
              style={[
                styles.button,
                {
                  backgroundColor: COLORS.primary,
                  width: 150,
                  borderRadius: 5,
                  marginTop: 10,
                  marginLeft: 5,
                },
              ]}
            >
              <Text
                style={[styles.button__text, { fontFamily: FONTS.regularBold }]}
              >
                RESTORE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.button,
                {
                  backgroundColor: COLORS.primary,
                  width: 150,
                  borderRadius: 5,
                  marginTop: 0,
                  marginLeft: 5,
                  alignItems: "center",
                },
              ]}
              disabled={updatingAvatar}
              onPress={updateProfileAvatar}
            >
              <Text
                style={[
                  styles.button__text,
                  {
                    fontFamily: FONTS.regularBold,
                    marginRight: updatingAvatar ? 10 : 0,
                  },
                ]}
              >
                UPDATE
              </Text>
              {updatingAvatar ? (
                <BoxIndicator color={COLORS.main} size={5} />
              ) : null}
            </TouchableOpacity>
          </>
        )}
      </View>

      <KeyboardAvoidingView>
        <Text
          style={{
            fontFamily: FONTS.regularBold,
            fontSize: 20,
            marginBottom: 10,
            color: COLORS.white,
          }}
        >
          Profile
        </Text>
        <CustomTextInput
          editable={enableEdit}
          error={error?.field === "email" ? error.message : ""}
          errorStyle={[styles.p, { color: "red", marginTop: 5 }]}
          leftIcon={<Entypo name="email" size={24} color={COLORS.main} />}
          keyboardType="email-address"
          placeholder="johndoe@petmall.com"
          containerStyles={{
            width: "100%",
            borderRadius: 5,
            marginBottom: 2,
          }}
          text={email}
          onChangeText={(text) =>
            setForm((state) => ({ ...state, email: text }))
          }
        />
        <View
          style={{
            flexDirection: dimension.width >= 600 ? "row" : "column",
            justifyContent: "space-between",
          }}
        >
          <CustomTextInput
            editable={enableEdit}
            error={error?.field === "firstName" ? error.message : ""}
            errorStyle={[styles.p, { color: "red", marginTop: 5 }]}
            leftIcon={
              <Ionicons name="person-sharp" size={24} color={COLORS.main} />
            }
            keyboardType="default"
            placeholder="First Name(s)"
            containerStyles={{
              borderRadius: 5,
              marginBottom: 2,
            }}
            outerContainerStyles={{
              width: "100%",
              flex: 1,
            }}
            text={firstName}
            onChangeText={(text) =>
              setForm((state) => ({ ...state, firstName: text }))
            }
          />
          <CustomTextInput
            editable={enableEdit}
            error={error?.field === "lastName" ? error.message : ""}
            errorStyle={[styles.p, { color: "red", marginTop: 5 }]}
            leftIcon={
              <Ionicons name="person-sharp" size={24} color={COLORS.main} />
            }
            keyboardType="default"
            placeholder="Last Name"
            containerStyles={{
              width: "100%",
              borderRadius: 5,
              marginBottom: 2,
            }}
            outerContainerStyles={{
              width: "100%",
              flex: 1,
              marginLeft: dimension.width >= 600 ? 5 : 0,
            }}
            text={lastName}
            onChangeText={(text) =>
              setForm((state) => ({ ...state, lastName: text }))
            }
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 10,
            alignItems: "center",
            justifyContent:
              dimension.width < 600 ? "space-between" : "flex-start",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setEnableEdit(true);
            }}
            style={[
              styles.button,
              {
                backgroundColor: COLORS.tertiary,
                width: 150,
                borderRadius: 5,

                marginTop: 0,
              },
            ]}
          >
            <Text
              style={[styles.button__text, { fontFamily: FONTS.regularBold }]}
            >
              EDIT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.button,
              {
                backgroundColor: COLORS.primary,
                width: 150,
                borderRadius: 5,
                marginTop: 0,
                marginLeft: 5,
                alignItems: "center",
              },
            ]}
            disabled={updatingInfo || !enableEdit}
            onPress={updateProfileInfo}
          >
            <Text
              style={[
                styles.button__text,
                {
                  fontFamily: FONTS.regularBold,
                  marginRight: updatingInfo ? 10 : 0,
                },
              ]}
            >
              UPDATE
            </Text>
            {updatingInfo ? (
              <BoxIndicator color={COLORS.main} size={5} />
            ) : null}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ProfileCard;
