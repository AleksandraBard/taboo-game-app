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
import { FlatList } from "react-native-gesture-handler";

export default function Players ({players, removePlayer}) {
    return (
        <View style={{ height: 300, alignItems: "center", marginTop: 50 }}>
            <View>
              {!players.length ? (
                <Text style={{ color: "purple", fontSize: 25 }}>
                  No one registered yet :(
                </Text>
              ) : (
                <Text style={{ color: "purple", fontSize: 25 }}>PLAYERS:</Text>
              )}
              <FlatList
                style={{ marginTop: 40 }}
                data={players}
                renderItem={({ item }) => (
                  <View>
                    <Text
                      style={{
                        color: "pink",
                        fontSize: 20,
                        marginTop: 10,
                        alignItems: "center",
                      }}
                    >
                      {item}
                    </Text>
                    <TouchableOpacity onPress={() => removePlayer(item)}>
                      <Text style={{ color: "black", fontSize: 10 }}>
                        [remove]
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
    )
}