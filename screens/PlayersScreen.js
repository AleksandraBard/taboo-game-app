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
  TextInput
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Players from '../components/Players'

export default class PlayersScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      textInputData: "",
      players: [],
    };
  }

  async componentDidMount() {
    let players = await AsyncStorage.getItem("players");
    if (players) {
      let parsed = JSON.parse(players);
      this.setState({ players: parsed });
    }
  }

  addPlayer = async (name) => {
    let players = await AsyncStorage.getItem("players");
    if (players) {
      let parsed = JSON.parse(players);
      parsed.push(name);
      await AsyncStorage.setItem("players", JSON.stringify(parsed));
      this.componentDidMount();
    } else {
      let list = [];
      list.push(name);
      await AsyncStorage.setItem("players", JSON.stringify(list));
      this.componentDidMount();
    }
  };

  removePlayer = async (name) => {
    let players = await AsyncStorage.getItem("players");
    let parsed = JSON.parse(players);
    let withoutPlayer = parsed.filter((person) => person !== name);
    await AsyncStorage.setItem("players", JSON.stringify(withoutPlayer));
    this.componentDidMount();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView />
        <ImageBackground
          source={{
            uri:
              "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <View
            style={{
              height: 70,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 50,
            }}
          >
            <Image
              source={{
                uri:
                  "https://tabooau.co/wp-content/themes/goodz-child/img/logo.png",
              }}
              style={{
                width: 70,
                height: 70,
                alignSelf: "center",
                marginTop: 40,
              }}
            />
          </View>
          <View style={{ height: 45 }}>
            <TextInput
              onChangeText={(text) => this.setState({ textInputData: text })}
              style={{ flex: 1, backgroundColor: "white" }}
              placeholder="Enter name of a new Player"
              placeholderTextColor="grey"
            />
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity
              title="addPlayer"
              style={{
                width: 100,
                height: 50,
                backgroundColor: "purple",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 25,
                margin: 18,
              }}
              onPress={() => this.addPlayer(this.state.textInputData)}
            >
              <Text style={{ color: "white" }}>Add Player</Text>
            </TouchableOpacity>
          </View>
          <Players players={this.state.players} removePlayer={this.removePlayer}/>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <TouchableOpacity
              title="start"
              style={{
                width: 150,
                height: 50,
                backgroundColor: "purple",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 25,
              }}
              onPress={() => this.props.navigation.navigate("CardScreen")}
            >
              <Text style={{ color: "white" }}>Submit and play!</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <SafeAreaView />
      </View>
    );
  }
}
