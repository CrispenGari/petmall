import {
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { AppDrawerNavProps } from "../../params";
import { styles } from "../../styles";
import { CustomTextInput } from "../../components";
import { COLORS, FONTS, GENDERS, PETS_CATEGORIES } from "../../constants";
import SelectDropdown from "react-native-select-dropdown";
import { Entypo, AntDesign } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as ImagePicker from "expo-image-picker";
import { useMediaPermission } from "../../hooks";
import { useSelector } from "react-redux";
import { StateType } from "../../types";
import * as Location from "expo-location";

const NewPet: React.FunctionComponent<AppDrawerNavProps<"NewPet">> = ({
  navigation,
  route,
}) => {
  const { camera, gallery } = useMediaPermission();
  const [error, setError] = React.useState<string>("");

  const pet:
    | {
        image: {
          uri: string;
          name: string;
        };
        location: Location.LocationGeocodedAddress | null;
        description: string;
        category: string;
        gender: string;
        price: number;
        age: number;
        name: string;
      }
    | undefined = route.params.editPet
    ? JSON.parse(route.params.editPet)
    : undefined;

  const [name, setName] = React.useState<string>(pet?.name ?? "");
  const { location: myLocation } = useSelector((state: StateType) => state);
  const [age, setAge] = React.useState<string>(pet?.age.toString() ?? "1");
  const [gender, setGender] = React.useState<string>(pet?.gender ?? GENDERS[0]);
  const [price, setPrice] = React.useState<string>(
    pet?.price.toString() ?? "0"
  );
  const [category, setCategory] = React.useState<string>(
    pet?.category ?? PETS_CATEGORIES[0]
  );
  const [description, setDescription] = React.useState<string>(
    pet?.description ?? ""
  );
  const [location, setLocation] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<
    { uri: string; fileName: string } | undefined
  >(
    pet?.image
      ? {
          fileName: pet.image.name,
          uri: pet.image.uri,
        }
      : undefined
  );

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!error) {
      Alert.alert(
        "PetMall",
        error,
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

  const previewPet = () => {
    if (!!!name.trim()) {
      setError("Pet Name is required!!");
      return;
    }
    if (!!!gender) {
      setError("Pet Gender is required!!");
      return;
    }
    if (!!!age) {
      setError("Pet Age is required!!");
      return;
    }
    if (!!!price) {
      setError("Pet Price is required!!");
      return;
    }
    if (!!!category) {
      setError("Pet Category is required!!");
      return;
    }
    if (description.trim().length < 10) {
      setError("Pet Description must be at least 10 characters long.");
      return;
    }
    if (!!!image) {
      setError("Pet Preview Image is required when marketing your Pet.");
      return;
    }

    navigation.navigate("PreviewPet", {
      newPet: JSON.stringify({
        age: Number(age),
        category,
        gender,
        description,
        name,
        price: Number(price),
        image: {
          name: image.fileName
            ? image.fileName
            : Math.random().toString().substring(2, 6),
          uri: image.uri,
        },
        location: location ? myLocation : null,
      }),
    });

    setName("");
    setAge("1");
    setImage(undefined);
    setDescription("");
    setPrice("");
    setGender(GENDERS[0]);
    setCategory(PETS_CATEGORIES[0]);
    setError("");
    setLocation(false);
  };

  const selectImage = async () => {
    if (!gallery) return;
    const image = await ImagePicker.launchImageLibraryAsync({
      aspect: [1, 1],
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
    });
    if (image.canceled) return;
    setImage({
      fileName:
        image.assets[0].fileName ?? Math.random().toString().substring(2, 6),
      uri: image.assets[0].uri,
    });
  };
  const takeImage = async () => {
    if (!camera) return;
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
    });
    if (image.canceled) return;

    setImage({
      fileName:
        image.assets[0].fileName ?? Math.random().toString().substring(2, 6),
      uri: image.assets[0].uri,
    });
  };

  useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      navigation.setOptions({
        headerTitle: "Sell new Pet",
        headerLeft: (props) => {
          return (
            <TouchableOpacity
              style={{ paddingHorizontal: 10 }}
              activeOpacity={0.7}
              onPress={() => navigation.toggleDrawer()}
            >
              <AntDesign name="menuunfold" size={24} color="white" />
            </TouchableOpacity>
          );
        },
      });
    }
    return () => {
      mounted = false;
    };
  }, []);
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
            onChangeText={(text) => setName(text)}
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
            text={age}
            onChangeText={(text) => setAge(text)}
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
            text={price}
            keyboardType={"decimal-pad"}
            onChangeText={(text) => setPrice(text)}
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
            onChangeText={(text) => setDescription(text)}
          />
          <SelectDropdown
            data={GENDERS}
            onSelect={(selectedItem, index) => {
              setGender(selectedItem);
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
            defaultButtonText="Select Pet Gender"
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
              setCategory(selectedItem);
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
            defaultButtonText="Select Pet Category"
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
              isChecked={location}
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
                setLocation(isChecked);
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
            {!!!image ? null : (
              <Image
                style={{
                  width: "100%",
                  height: 300,
                  marginBottom: 20,
                  borderRadius: 5,
                }}
                source={{
                  uri: image.uri,
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
                onPress={takeImage}
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
                onPress={selectImage}
              >
                <Entypo name="images" size={24} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.button,
              {
                alignSelf: "center",
                borderColor: COLORS.tertiary,
                backgroundColor: "transparent",
                borderWidth: 1,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => {
              setName("");
              setAge("1");
              setImage(undefined);
              setDescription("");
              setPrice("");
              setGender(GENDERS[0]);
              setCategory(PETS_CATEGORIES[0]);
              setError("");
              setLocation(false);
              navigation.navigate("Market");
            }}
          >
            <Text style={[styles.h1, { color: "white" }]}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { alignSelf: "center", marginTop: 30 }]}
            activeOpacity={0.7}
            onPress={previewPet}
          >
            <Text style={[styles.h1, { color: "white" }]}>Preview</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewPet;
