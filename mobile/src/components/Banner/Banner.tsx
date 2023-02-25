import { View, Text, ImageBackground } from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS, SCREEN_HEIGHT } from "../../constants";
import { styles } from "../../styles";

const banners = [
  require(`../../../assets/static/0.jpg`),
  require(`../../../assets/static/1.jpg`),
  require(`../../../assets/static/2.jpg`),
  require(`../../../assets/static/3.jpg`),
];
const Banner = () => {
  const [index, setIndex] = useState(0);
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      if (index < banners.length - 1) {
        setIndex((state) => state + 1);
      } else {
        setIndex(0);
      }
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [index]);

  return (
    <ImageBackground
      style={{
        width: "100%",
        height: SCREEN_HEIGHT / 2,
      }}
      source={banners[index]}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, .5)",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: FONTS.regularBold,
            color: COLORS.white,
          }}
        >
          Welcome to PetMall.
        </Text>
        <Text
          style={[
            styles.p,
            { color: "white", marginTop: 5, textAlign: "center" },
          ]}
        >
          Pet marketing made easy for you. By and sell pets using our
          application.
        </Text>
      </View>
    </ImageBackground>
  );
};

export default Banner;
