import React, {Component} from 'react';
import QRCode from 'react-native-qrcode';

// import Camera from 'react-native-camera';
import Dropmenu from '../components/dropdown';

import {AppRegistry, StyleSheet, Text, View, Dimensions} from 'react-native';

export default class Qrgenerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stringCount: 'Transaction - 1',
      text1: 'hey there',
      text2: 'hey there',
      text3: 'hey there',
    }
  }
  render() {
    return (
      <View>
        <View style={styles.nav}>
          <Dropmenu/>
        </View>
        <View style={{alignItems: 'center', fontSize: 2}}>
          <Text style={{fontSize: 30}}>{this.state.stringCount}</Text>
        </View>
        <View style={styles.qrcode}>
          <QRCode value={this.state.text1} size={310} bgColor='black' fgColor='white'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: -15,
    left: Dimensions.get('window').width / 2 - 60
  },

  qrcode: {
    top: 40
  },
});
