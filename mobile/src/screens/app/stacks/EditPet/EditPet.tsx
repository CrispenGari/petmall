import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React from "react";
import { MarketNavProps } from "../../../../params";
import { useSelector } from "react-redux";
import { COLORS, FONTS, GENDERS, PETS_CATEGORIES } from "../../../../constants";
import {
  useUpdatePetMutation,
  useDeletePetMutation,
  useGetPetByIdQuery,
  ErrorType,
} from "../../../../graphql/generated/graphql";
import { StateType } from "../../../../types";
import { decodeId, encodeId, generateRNFile } from "../../../../utils";
import SelectDropdown from "react-native-select-dropdown";
import { Entypo, AntDesign } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as ImagePicker from "expo-image-picker";
import { BoxIndicator, CustomTextInput } from "../../../../components";
import { styles } from "../../../../styles";
import { useMediaPermission } from "../../../../hooks";

const EditPet: React.FunctionComponent<MarketNavProps<"EditPet">> = ({
  navigation,
  route: {
    params: { petId: id },
  },
}) => {
  const petId = decodeId(id);
  const { camera, gallery } = useMediaPermission();
  const [{ fetching: updating, data: updateData }, updatePet] =
    useUpdatePetMutation();
  const [{ fetching: deleting, data: deleteData }, deletePet] =
    useDeletePetMutation();

  const [{ data, fetching }] = useGetPetByIdQuery({
    variables: { input: { id: petId } },
  });
  const { user, location } = useSelector((state: StateType) => state);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!updateData) {
      if (!!updateData?.update?.success) {
        navigation.replace("Pet", { petId: encodeId(petId) });
      }
    }
    return () => {
      mounted = false;
    };
  }, [updateData, navigation, petId]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!deleteData) {
      if (!!deleteData?.deletePet?.success) {
        navigation.replace("Pets");
      }
    }
    return () => {
      mounted = false;
    };
  }, [deleteData, navigation]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!!user?.emailVerified && !!!user?.isLoggedIn) {
      navigation.navigate("Pets");
    }
    return () => {
      mounted = false;
    };
  }, [navigator, user]);

  const [
    { name, age, price, description, gender, category, enableLocation, image },
    setForm,
  ] = React.useState<{
    name: string;
    age: number;
    price: number;
    description: string;
    gender: string;
    category: string;
    image: any;
    enableLocation: boolean;
  }>({
    image: null,
    name: "",
    age: 1,
    price: 0.0,
    description: "",
    gender: GENDERS[0],
    category: PETS_CATEGORIES[0],
    enableLocation: false,
  });

  const [error, setError] = React.useState<ErrorType>({
    field: "",
    message: "",
  });

  const [previewImage, setPreviewImage] = React.useState("");

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.getPetById?.pet) {
      const {
        price,
        age,
        image,
        category,
        description,
        gender,
        name,
        location,
      } = data?.getPetById?.pet;
      setForm((state) => ({
        ...state,
        price,
        age,
        category,
        description,
        gender,
        image: null,
        name,
        enableLocation: !!!location
          ? false
          : location.lat !== 0 && location.lon !== 0,
      }));
      setPreviewImage(image);
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  const deletePetHandler = async () => {
    await deletePet({ input: { id: petId } });
  };

  const updatePetHandler = async () => {
    if (!!!name.trim()) {
      setError({ field: "name", message: "Pet Name is required!!" });
      return;
    }
    if (!!!gender) {
      setError({ field: "gender", message: "Pet Gender is required!!" });
      return;
    }
    if (!!!age) {
      setError({ field: "age", message: "Pet Age is required!!" });
      return;
    }
    if (!!!price) {
      setError({ field: "price", message: "Pet Price is required!!" });
      return;
    }
    if (!!!category) {
      setError({ field: "category", message: "Pet Category is required!!" });
      return;
    }
    if (description.trim().length < 10) {
      setError({
        field: "description",
        message: "Pet Description must be at least 10 characters long.",
      });
      return;
    }
    setError({
      field: "",
      message: "",
    });
    await updatePet({
      input: {
        id: petId,
        age: Number(age.toString()),
        category,
        gender,
        description,
        image,
        name: name.trim(),
        price: Number.parseFloat(price.toString()),
        location: enableLocation ? location : null,
      },
    });
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
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!error.message) {
      Alert.alert(
        "PetMall",
        error.message,
        [
          {
            text: "OK",
            style: "destructive",
          },
        ],
        { cancelable: true }
      );
    }
    return () => {
      mounted = false;
    };
  }, [error]);

  if (fetching)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.primary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BoxIndicator size={20} color={COLORS.main} />
      </View>
    );
  return (
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
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ padding: 10, backgroundColor: COLORS.secondary }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            width: "100%",
            alignSelf: "center",
            maxWidth: 500,
          }}
        >
          <Text
            style={[
              styles.h1,
              {
                textAlign: "center",
                fontSize: 30,
                marginVertical: 20,
                color: COLORS.white,
              },
            ]}
          >
            Create Market for New Pet
          </Text>
          <CustomTextInput
            label="Pet Name"
            placeholder="Pet Name"
            labelStyle={[styles.p, { color: COLORS.white }]}
            containerStyles={{
              backgroundColor: COLORS.main,
              marginBottom: 10,
              maxWidth: 500,
            }}
            text={name}
            onChangeText={(text) =>
              setForm((state) => ({ ...state, name: text }))
            }
          />
          <CustomTextInput
            label="Pet Age (weeks)"
            placeholder="Pet Age in weeks"
            labelStyle={[styles.p, { color: COLORS.white }]}
            keyboardType={"number-pad"}
            containerStyles={{
              marginBottom: 10,
              maxWidth: 500,
              backgroundColor: COLORS.main,
            }}
            text={age.toString()}
            onChangeText={(text) =>
              setForm((state) => ({ ...state, age: Number(text) }))
            }
          />
          <CustomTextInput
            leftIcon={
              <Text style={[styles.h1, { color: COLORS.white }]}>R</Text>
            }
            label="Price"
            placeholder="0.00"
            labelStyle={[styles.p, { color: COLORS.white }]}
            containerStyles={{
              backgroundColor: COLORS.main,
              marginBottom: 10,
              maxWidth: 500,

              borderWidth: 0,
            }}
            text={price.toString()}
            keyboardType={"decimal-pad"}
            onChangeText={(text) =>
              setForm((state) => ({ ...state, price: Number(text) }))
            }
          />
          <CustomTextInput
            label="Pet Description"
            placeholder="Pet Description"
            multiline
            labelStyle={[styles.p, { color: COLORS.white }]}
            containerStyles={{
              backgroundColor: COLORS.main,
              marginBottom: 10,
              maxWidth: 500,
            }}
            inputStyle={{ height: 100 }}
            text={description}
            onChangeText={(text) =>
              setForm((state) => ({ ...state, description: text }))
            }
          />
          <SelectDropdown
            data={GENDERS}
            onSelect={(selectedItem, index) => {
              setForm((state) => ({ ...state, gender: selectedItem }));
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={{
              width: "100%",
              borderColor: COLORS.main,
              borderRadius: 5,
              backgroundColor: COLORS.main,
              maxWidth: 500,
            }}
            buttonTextStyle={{
              color: COLORS.white,
              fontFamily: FONTS.regular,
            }}
            defaultButtonText={gender}
            rowTextStyle={{
              textTransform: "lowercase",
            }}
            rowStyle={{
              padding: 0,
              height: 40,
            }}
          />

          <SelectDropdown
            data={PETS_CATEGORIES}
            onSelect={(selectedItem, index) => {
              setForm((state) => ({ ...state, category: selectedItem }));
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={{
              width: "100%",
              borderColor: COLORS.main,
              borderRadius: 5,
              backgroundColor: COLORS.main,
              maxWidth: 500,
              marginVertical: 10,
            }}
            buttonTextStyle={{
              color: COLORS.white,
              fontFamily: FONTS.regular,
            }}
            defaultButtonText={category}
            rowTextStyle={{
              textTransform: "lowercase",
            }}
            rowStyle={{
              padding: 0,
              height: 40,
            }}
          />

          <View
            style={{
              padding: 10,
              backgroundColor: COLORS.main,
              borderRadius: 5,
              maxWidth: 500,
              width: "100%",
            }}
          >
            <BouncyCheckbox
              size={25}
              fillColor={COLORS.secondary}
              unfillColor={COLORS.white}
              isChecked={enableLocation}
              text="Enable current location and city."
              iconStyle={{ borderColor: COLORS.main }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={[
                styles.p,
                {
                  flex: 1,
                  marginLeft: 10,
                  fontSize: 20,
                  textDecorationColor: "transparent",
                },
              ]}
              onPress={(isChecked: boolean) => {
                setForm((state) => ({ ...state, enableLocation: isChecked }));
              }}
            />
          </View>
          <Text
            style={[
              styles.p,
              { marginTop: 20, fontSize: 20, color: COLORS.white },
            ]}
          >
            Select a pet image.
          </Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              backgroundColor: COLORS.main,
              borderRadius: 5,
              maxWidth: 500,
              marginBottom: 10,
              height: 400,
              width: "100%",
            }}
          >
            {!!!previewImage ? null : (
              <Image
                style={{
                  width: "100%",
                  height: 300,
                  marginBottom: 20,
                  borderRadius: 5,
                }}
                source={{
                  uri: previewImage,
                }}
              />
            )}
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    width: 50,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 50,
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => handleSelectImage("camera")}
              >
                <Entypo name="camera" size={24} color={COLORS.white} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    width: 50,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 50,
                    marginLeft: 20,
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => handleSelectImage("gallery")}
              >
                <Entypo name="images" size={24} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row-reverse" }}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  alignSelf: "center",
                  backgroundColor: COLORS.tertiary,
                  flex: 1,
                  marginTop: 0,
                },
              ]}
              activeOpacity={0.7}
              onPress={deletePetHandler}
            >
              <Text
                style={[
                  styles.h1,
                  { color: "white", marginRight: deleting ? 5 : 0 },
                ]}
              >
                Delete Pet
              </Text>

              {deleting ? <BoxIndicator color={COLORS.main} size={5} /> : null}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                { alignSelf: "center", marginTop: 0, flex: 1, marginRight: 10 },
              ]}
              activeOpacity={0.7}
              onPress={updatePetHandler}
            >
              <Text
                style={[
                  styles.h1,
                  { color: "white", marginRight: updating ? 5 : 0 },
                ]}
              >
                Update Pet
              </Text>
              {updating ? <BoxIndicator color={COLORS.main} size={5} /> : null}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              {
                alignSelf: "flex-start",
                borderColor: COLORS.tertiary,
                backgroundColor: "transparent",
                borderWidth: 1,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => {
              setForm((state) => ({
                ...state,
                name: "",
                age: 1,
                description: "",
                price: 0,
                gender: GENDERS[0],
                category: PETS_CATEGORIES[0],
                enableLocation: false,
                image: undefined,
              }));
              setError({ field: "", message: "" });
              navigation.navigate("Pet", {
                petId: encodeId(petId),
              });
            }}
          >
            <Text style={[styles.h1, { color: "white" }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditPet;
