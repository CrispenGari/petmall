import { Text, TouchableOpacity, ScrollView, View, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { AppDrawerNavProps } from "../../params";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "../../styles";
import { COLORS, FONTS } from "../../constants";
import * as Location from "expo-location";
import { BoxIndicator } from "../../components";
import { useNewPetMutation } from "../../graphql/generated/graphql";
import { generateRNFile } from "../../utils";

const PreviewPet: React.FunctionComponent<AppDrawerNavProps<"PreviewPet">> = ({
  navigation,
  route,
}) => {
  const pet: {
    image: {
      uri: string;
      name: string;
    };
    location: { lat: number; lon: number } | null;
    description: string;
    category: string;
    gender: string;
    price: number;
    age: number;
    name: string;
  } = JSON.parse(route.params.newPet);
  const [{ fetching, data }, addPet] = useNewPetMutation();

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data) {
      if (!!data.add?.success) {
        navigation.navigate("Market");
      }
    }
    return () => {
      mounted = false;
    };
  }, [data, navigation]);

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

  const add = async () => {
    const image = await generateRNFile({
      ...pet.image,
    });

    await addPet({
      input: {
        age: pet.age,
        category: pet.category,
        description: pet.description,
        gender: pet.gender,
        image: image,
        name: pet.name,
        price: pet.price,
        location: pet.location,
      },
    });
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{ padding: 10, backgroundColor: COLORS.secondary }}
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
        Add New Pet to Market
      </Text>
      <Text
        style={[
          styles.h1,
          { fontSize: 25, color: "white", textAlign: "center" },
        ]}
      >
        {`${pet.name} (${pet.age} wks)`}
      </Text>
      <Image
        style={{
          width: "100%",
          height: 300,
          marginBottom: 20,
          borderRadius: 5,
          marginTop: 10,
        }}
        source={{
          uri: pet.image.uri,
        }}
      />

      <View style={{ marginBottom: 10 }}>
        <Text style={[styles.h1, { fontSize: 25, color: "white" }]}>
          Pet Details
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.p, { fontSize: 20, color: "white" }]}>Name</Text>
          <Text style={[styles.p, { fontSize: 20, color: "white" }]}>
            {pet.name}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.p, { fontSize: 20, color: "white" }]}>Age</Text>
          <Text style={[styles.p, { fontSize: 20, color: "white" }]}>
            {pet.age} wks
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.p, { fontSize: 20, color: "white" }]}>
            Gender
          </Text>
          <Text style={[styles.p, { fontSize: 20, color: "white" }]}>
            {pet.gender.toLowerCase()}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.p, { fontSize: 20, color: "white" }]}>
            Category
          </Text>
          <Text style={[styles.p, { fontSize: 20, color: "white" }]}>
            {pet.category.toLowerCase()}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.p, { fontSize: 20, color: "white" }]}>
            Price
          </Text>
          <Text
            style={[
              styles.p,
              { fontSize: 20, color: "white", fontFamily: FONTS.regularBold },
            ]}
          >
            R {pet.price}
          </Text>
        </View>

        <Text style={[styles.p, { fontSize: 18, color: "white" }]}>
          {pet.description}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          {
            alignSelf: "center",
            marginTop: 30,
            backgroundColor: COLORS.tertiary,
          },
        ]}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate("NewPet", {
            editPet: JSON.stringify(pet),
          })
        }
      >
        <Text style={[styles.h1, { color: "white" }]}>Edit Pet</Text>
      </TouchableOpacity>

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
        onPress={() => navigation.navigate("Market")}
      >
        <Text style={[styles.h1, { color: "white" }]}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { alignSelf: "center" }]}
        activeOpacity={0.7}
        onPress={add}
      >
        <Text
          style={[
            styles.h1,
            { color: "white", marginRight: fetching ? 10 : 0 },
          ]}
        >
          Add to Market
        </Text>

        {fetching ? <BoxIndicator color={COLORS.main} size={5} /> : null}
      </TouchableOpacity>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

export default PreviewPet;
