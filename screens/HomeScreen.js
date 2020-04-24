import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Button,
  AsyncStorage,
  SafeAreaView,
} from "react-native";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView />
        <ImageBackground
          source={{
            uri:
              "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
          }}
          style={{ flex: 1, width: "100%", height: "100%" }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 25,
                color: "#B340B7",
                fontWeight: "bold",
                textDecorationStyle: "dotted",
              }}
            >
              Welcome to the Taboo Game
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{
                uri:
                  "https://tabooau.co/wp-content/themes/goodz-child/img/logo.png",
              }}
              style={{ width: 200, height: 200, alignSelf: "center" }}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 20, color: "#FF7F96" }}
            >
              Ready to start?
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                marginTop: 30,
                marginBottom: 30,
                color: "#FF7F96",
              }}
            >
              Press the button
            </Text>
            <TouchableOpacity
              title="start"
              style={{
                width: 100,
                height: 50,
                backgroundColor: "purple",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 25,
              }}
              onPress={() => this.props.navigation.navigate("PlayersScreen")}
            >
              <Text style={{ color: "white" }}>START</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <SafeAreaView />
      </View>
    );
  }
}
