import React, {Component} from 'react';
import Camera from 'react-native-camera';

import {AppRegistry, StyleSheet, Text, View, Dimensions} from 'react-native';

import Dropmenu from '../components/dropdown';

export default class Scanner extends Component {
  constructor(props) {
    super(props);

    this.reader = this.reader.bind(this);
    this.takePicture = this.takePicture.bind(this);
  }

  takePicture() {
    this.camera.capture().then((data) => console.log(data)).catch(err => console.error(err));
  }

  reader(data) {
    alert(data.data);
    console.log(data);
  }

  render() {
    return (
      <View>
        <View style={styles.nav}>
          <Dropmenu/>
        </View>
        <View>
          <View style={styles.cam}>
            <Camera
              ref={(cam) => {
              this.camera = cam;
            }}
              style={styles.preview}
              aspect={Camera.constants.Aspect.fill}
              onBarCodeRead={(data) => {this.reader(data)}}
              barCodeTypes={['qr']}>
              <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
            </Camera>
          </View>
        </View>
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
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: -15,
    left: Dimensions.get('window').width / 2 - 60
  },
  cam: {
    top: Dimensions.get('window').height / 4.5,
    height: Dimensions.get('window').height - 250,
    width: Dimensions.get('window').width - 50
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
