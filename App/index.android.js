import React, {Component} from 'react';
import Camera from 'react-native-camera';

import Scanner from './components/scanner';
import Qrgenerator from './components/qrgenerator';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

export default class bingohacks extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activity: true
    }

    this.swapper = this.swapper.bind(this);
  }

  swapper() {
    this.setState({
      activity: !this.state.activity
    });
  }

  render() {

    let active = '';

    if (this.state.activity)
      active = (<Scanner/>);
    else
      active = (<Qrgenerator/>);

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.swapper}
          onPress={() => {
          this.swapper()
        }}>
          <View></View>
        </TouchableOpacity>
        {active}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  swapper: {
    top: 10,
    left: -Dimensions.get('window').width / 2 + 20,
    height: 20,
    width: 20,
    backgroundColor: 'white'
  },
});

AppRegistry.registerComponent('bingohacks', () => bingohacks);
