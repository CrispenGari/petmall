import {
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Image,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { AppDrawerNavProps } from "../../params";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "../../styles";
import { CustomTextInput } from "../../components";
import { COLORS, FONTS, GENDERS, PETS_CATEGORIES } from "../../constants";
import SelectDropdown from "react-native-select-dropdown";
import { Entypo } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
const PreviewPet: React.FunctionComponent<AppDrawerNavProps<"PreviewPet">> = ({
  navigation,
}) => {
  const [name, setName] = React.useState<string>("");
  const [age, setAge] = React.useState<number>(1);
  const [gender, setGender] = React.useState<string>(GENDERS[0]);
  const [price, setPrice] = React.useState<number>(0);
  const [category, setCategory] = React.useState<string>(PETS_CATEGORIES[0]);
  const [description, setDescription] = React.useState<string>("");
  const [location, setLocation] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<string>("");

  useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      navigation.setOptions({
        headerTitle: "Preview Pet",
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
        style={{ padding: 10 }}
      >
        <Text
          style={[
            styles.h1,
            { textAlign: "center", fontSize: 30, marginVertical: 20 },
          ]}
        >
          Add New Pet to Market
        </Text>
        <CustomTextInput
          label="Pet Name"
          placeholder="Pet Name"
          labelStyle={[styles.p, {}]}
          containerStyles={{
            marginBottom: 10,
            maxWidth: 500,
          }}
          text={name}
          onChangeText={(text) => setName(text)}
        />
        <CustomTextInput
          label="Pet Age (weeks)"
          placeholder="Pet Age in weeks"
          labelStyle={[styles.p, {}]}
          keyboardType={"number-pad"}
          containerStyles={{
            marginBottom: 10,
            maxWidth: 500,
          }}
          text={age as any}
          onChangeText={(text) => setAge(Number(text))}
        />
        <CustomTextInput
          leftIcon={<Text style={[styles.h1, {}]}>R</Text>}
          label="Price"
          placeholder="0.00"
          labelStyle={[styles.p, {}]}
          containerStyles={{
            marginBottom: 10,
            maxWidth: 500,
          }}
          text={price as any}
          keyboardType={"decimal-pad"}
          onChangeText={(text) => setPrice(Number(text))}
        />
        <CustomTextInput
          label="Pet Description"
          placeholder="Pet Description"
          multiline
          labelStyle={[styles.p, {}]}
          containerStyles={{
            marginBottom: 10,
            maxWidth: 500,
          }}
          inputStyle={{ height: 100 }}
          text={description}
          onChangeText={(text) => setCategory(text)}
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
            backgroundColor: COLORS.white,
            maxWidth: 500,
          }}
          buttonTextStyle={{
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
            backgroundColor: COLORS.white,
            maxWidth: 500,
            marginVertical: 10,
          }}
          buttonTextStyle={{
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
            backgroundColor: "white",
            borderRadius: 5,
            maxWidth: 500,
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
        <Text style={[styles.p, { marginTop: 20, fontSize: 20 }]}>
          Select a pet image.
        </Text>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            backgroundColor: "white",
            borderRadius: 5,
            maxWidth: 500,
            marginBottom: 10,
            height: 400,
          }}
        >
          <Image
            style={{
              width: "100%",
              height: 300,
              marginBottom: 20,
              borderRadius: 5,
            }}
            source={{
              uri: Image.resolveAssetSource(
                require("../../../assets/static/1.jpg")
              ).uri,
            }}
          />
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
          >
            <Entypo name="camera" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.button, { alignSelf: "center", marginTop: 30 }]}
        >
          <Text style={[styles.h1, { color: "white" }]}>Preview</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PreviewPet;
