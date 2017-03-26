import React, {Component} from 'react';
import Camera from 'react-native-camera';
import axios from 'axios';

import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import Dropmenu from '../components/dropdown';

export default class Scanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      swapper: true,
      qrdata: '',
      party1: 'Person',
      party2: 'Person',
      transId: 'aasdakdjfakdjh',
      count: 1,
    }

    this.reader = this.reader.bind(this);
    this.takePicture = this.takePicture.bind(this);
  }

  takePicture() {
    this.camera.capture().then((data) => console.log(data)).catch(err => console.error(err));
  }

  reader(data) {
    this.setState({qrdata: data.data});
    this.setState({
      swapper: !this.state.swapper
    })

    axios.post('http://192.168.2.168:3001/api/bingo', {
      party1: this.state.party1 + this.state.count,
      party2: this.state.party2 + (this.state.count + 1),
      transId: this.state.transId,
      transData: this.state.qrdata
    }).then(res => {
      this.setState({
        count: this.state.count + 1,
        transId: 'sgdfgsdasdasdasd',
      });
    }).catch(err => {
      alert();
      console.error(err);
    });
  }

  render() {

    let content = '';

    if (this.state.swapper)
      content = (
        <View>
          <View style={styles.cam}>
            <Camera
              ref={(cam) => {
              this.camera = cam;
            }}
              style={styles.preview}
              aspect={Camera.constants.Aspect.fill}
              onBarCodeRead={(data) => {
              this.reader(data)
            }}
              barCodeTypes={['qr']}>
              {/* <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text> */}
            </Camera>
          </View>
        </View>

      );
    else
      content = (
        <View style={{
          top: 130
        }}>
          <Text style={{
            fontSize: 20
          }}>
            Transaction Details Received:
          </Text>
          <Text style={{
            fontSize: 20
          }}>
            {this.state.qrdata}
          </Text>

          <View style={{
            paddingTop: 80
          }}>
            <Button
              onPress={()=>{this.setState({
                swapper: true,
                count: this.state.count + 1,
              })}}
              title="Confirmed !"
              color="#43A047"
              accessibilityLabel="Learn more about this purple button"
              style={{
              paddingTop: 10
            }}/>
          </View>
        </View>
      );

    return (
      <View>
        <View style={styles.nav}>
          <Dropmenu/>
        </View>
        {content}
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
    top: -Dimensions.get('window').height/10 + 5,
    left: Dimensions.get('window').width / 2 - 60
  },
  cam: {
    top: Dimensions.get('window').height / 20 - 20,
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
