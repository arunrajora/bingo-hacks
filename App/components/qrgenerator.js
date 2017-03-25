import React, {Component} from 'react';
// import Camera from 'react-native-camera';
import Dropmenu from '../components/dropdown';

import {AppRegistry, StyleSheet, Text, View, Dimensions} from 'react-native';

export default class Qrgenerator extends Component {
  render() {
    return (
      <View>
        <View style={styles.nav}>
          <Dropmenu/>
        </View>
        <Text>QR generator</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: 0,
    top: -15,
    left: Dimensions.get('window').width / 2 - 60
  }
});
