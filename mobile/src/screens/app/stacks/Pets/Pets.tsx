import { ScrollView } from "react-native";
import React from "react";
import { MarketNavProps } from "../../../../params";
import Banner from "../../../../components/Banner/Banner";
import { COLORS, PETS_CATEGORIES } from "../../../../constants";
import { PetCategory } from "../../../../components";
import * as N from "expo-notifications";
import { encodeId } from "../../../../utils";

const Pets: React.FunctionComponent<MarketNavProps<"Pets">> = ({
  navigation,
}) => {
  React.useEffect(() => {
    const subscription = N.addNotificationResponseReceivedListener(
      (response) => {
        const { id, type } = response.notification.request.content.data as {
          type: "pet-interaction" | "new-message";
          id: string;
        };
        switch (type) {
          case "new-message":
            navigation.navigate("Chat", {
              chatId: encodeId(id),
            });
            break;
          case "pet-interaction":
            navigation.navigate("Pet", {
              petId: encodeId(id),
            });
            break;
          default:
            break;
        }
      }
    );
    return () => subscription.remove();
  }, [navigation]);
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.secondary }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <Banner />

      {PETS_CATEGORIES.map((category) => (
        <PetCategory
          title={category}
          navigation={navigation}
          key={category}
          subtitle={`All ${category.toLowerCase()} in the market.`}
        />
      ))}
    </ScrollView>
  );
};

export default Pets;
