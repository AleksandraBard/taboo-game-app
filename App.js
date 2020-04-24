import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import HomeScreen from './screens/HomeScreen'
import CardScreen from './screens/CardScreen'
import PlayersScreen from './screens/PlayersScreen'

export default function App() {
  return (
    <AppContainer />
  );
}

const StackNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: false,
      headerBackTitle: false
    }
  } ,
  PlayersScreen: {
    screen: PlayersScreen,
    navigationOptions: {
      header: false,
      headerBackTitle: false
    }
  } ,
  CardScreen: {
    screen: CardScreen,
    navigationOptions: {
      header: false,
      headerBackTitle: false
    }
  } 
})

const AppSwitchNavigator = createSwitchNavigator({
  StackNavigator
})


const AppContainer = createAppContainer(AppSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
