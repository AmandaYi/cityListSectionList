 
import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import CityList from "./components/cityList"

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CityList></CityList>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})