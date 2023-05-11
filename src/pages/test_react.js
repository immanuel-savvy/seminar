import React from "react";
import { View, Text, Image } from "react-native";

class Blacko extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#662D9E",
        }}
      >
        <Image
          style={{
            height: 100,
            width: 100,
            borderRadius: 20,
          }}
          source={require("path_to_the_image.jpg")}
        />
        <Text>Anything Textual!</Text>
      </View>
    );
  }
}

export default Blacko;
