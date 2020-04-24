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
  Animated,
  Easing,
} from "react-native";
import CountDown from "react-native-countdown-component";

export default class CardScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      card: {},
      count: 0,
    };
    this.game = 0;
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.addScore = this.addScore.bind(this);
    this.animatedValue = new Animated.Value(0);
  }

  async componentDidMount() {
    const tabooCards = [
      { word: "Nose", taboo1: "face", taboo2: "smell", taboo3: "ear" },
      { word: "Table", taboo1: "chair", taboo2: "desk", taboo3: "school" },
      { word: "Summer", taboo1: "hot", taboo2: "winter", taboo3: "vacation" },
      { word: "Door", taboo1: "open", taboo2: "close", taboo3: "house" },
      {
        word: "Computer",
        taboo1: "machine",
        taboo2: "game",
        taboo3: "internet",
      },
      { word: "Socks", taboo1: "feet", taboo2: "foot", taboo3: "shoe" },
      { word: "Love", taboo1: "like", taboo2: "boy", taboo3: "wedding" },
      { word: "Teeth", taboo1: "mouth", taboo2: "tooth", taboo3: "smile" },
      { word: "Catch", taboo1: "ball", taboo2: "throw", taboo3: "hand" },
      { word: "Drink", taboo1: "water", taboo2: "soda", taboo3: "thirsty" },
    ];
    const cards = JSON.stringify(tabooCards);
    await AsyncStorage.setItem("cards", cards);
    const newCount = this.state.count + 1;
    this.setState({
      card: await this.getCard(this.state.count),
      count: newCount,
    });
  }

  async componentWillUnmount() {
    await AsyncStorage.setItem("score", "0");
  }

  getCard = async (num) => {
    let cards = await AsyncStorage.getItem("cards");
    let parsedCards = JSON.parse(cards);
    return parsedCards[num];
  };

  addScore = async () => {
    const score = await AsyncStorage.getItem("score");
    const parsedScore = JSON.parse(score);
    const addedScore = parsedScore + 1;
    await AsyncStorage.setItem("score", JSON.stringify(addedScore));
    this.game = addedScore;
  };

  startShake = () => {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 150,
      easing: Easing.linear,
    }).start();
  };

  render() {
    const { navigate } = this.props.navigation;
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
          <CountDown
            until={30}
            onFinish={() => alert("Time is UP!")}
            size={20}
            digitStyle={{ backgroundColor: "#FFF" }}
            digitTxtStyle={{ color: "purple" }}
            timeToShow={["S"]}
            timeLabels={{ s: "sec" }}
          />
          {!this.state.card ? (
            <View style={styles.card}>
              <Text style={styles.done}>Sorry! No more cards :(</Text>
              <Button
                title="Go to Players Page"
                onPress={() => navigate("Players")}
              />
            </View>
          ) : (
            <View>
              <Animated.View style={styles.card}>
                <Text style={styles.word}>{this.state.card.word}</Text>
                <Text style={styles.taboo}>{this.state.card.taboo1}</Text>
                <Text style={styles.taboo}>{this.state.card.taboo2}</Text>
                <Text style={styles.taboo}>{this.state.card.taboo3}</Text>
              </Animated.View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  title="skip"
                  style={{
                    width: 60,
                    height: 60,
                    margin: 15,
                    backgroundColor: "orange",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 25,
                  }}
                  onPress={this.componentDidMount}
                >
                  <Text style={{ color: "white" }}>SKIP!</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  title="taboo"
                  style={{
                    width: 60,
                    height: 60,
                    margin: 15,
                    backgroundColor: "red",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 25,
                  }}
                  onPress={() => {
                    this.startShake();
                    alert("It was TaBoOooo!!!");
                  }}
                >
                  <Text style={{ color: "white" }}>TABOO!!!</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  title="Got it! NEXT!"
                  style={{
                    width: 60,
                    height: 60,
                    margin: 15,
                    backgroundColor: "green",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 25,
                  }}
                  onPress={() => {
                    this.componentDidMount();
                    this.addScore();
                  }}
                >
                  <Text style={{ color: "white" }}>GOT IT!</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View style={styles.score}>
            <Text style={styles.addScore}>Scores: {this.game}</Text>
          </View>
        </ImageBackground>
        <SafeAreaView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    textAlign: "center",
    width: 50,
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: "pink",
    fontSize: 24,
    marginHorizontal: 10,
  },
  word: {
    marginTop: 100,
    marginBottom: 50,
    textAlign: "center",
    fontSize: 25,
    color: "red",
    fontWeight: "bold",
  },
  taboo: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  card: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    height: 400,
    width: 250,
    backgroundColor: "#fff",
    borderColor: "pink",
  },
  countdown: {
    fontSize: 24,
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  score: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    height: 30,
    width: 600,
    backgroundColor: "#fff",
    borderColor: "pink",
  },
  addedScore: {
    fontSize: 15,
    color: "green",
  },
  done: {
    color: "blue",
    fontSize: 15,
  },
});
