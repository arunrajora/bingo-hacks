import React, {Component} from 'react';
import QRCode from 'react-native-qrcode';
import axios from 'axios';

// import Camera from 'react-native-camera';
import Dropmenu from '../components/dropdown';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TextInput
} from 'react-native';

export default class Qrgenerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '--Enter--Transaction--Info--',
      swapper: false,
      count: 0,
    }
  }

  componentDidMount() {
    setInterval(() => {
      const count = this.state.count;
      fetch('http://192.168.2.168:3001/api/bingo').then(data => data.json()).then(data => {
        console.log(data[count].party1);
        console.log(count);
        if (count + 1== data.length)
          this.setState({swapper: true})
        // console.log(data[count].party1);
      }).catch(err => console.log(err))
    }, 1500);
  }

  render() {
    let content = '';

    if (!this.state.swapper)
      content = (
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({text: text})}
            value={this.state.text}/>

          <View style={styles.qrcode}>
            <QRCode value={this.state.text} size={260} bgColor='black' fgColor='white'/>
          </View>
        </View>
      )
    else
      content = (
        <View style={{
          paddingTop: 120
        }}>
          <Button
            onPress={()=>{
              this.state.count = this.state.count + 1
              this.setState({
              swapper: false,
            })}}
            title="Confirmed !"
            color="#43A047"
            accessibilityLabel="Learn more about this purple button"/>
        </View>
      )
    return (
      <View>
        <View style={styles.nav}>
          <Dropmenu/>
        </View>
        <View style={{
          alignItems: 'center',
          top: -50,
        }}>
          {/* <Text style={{
            fontSize: 30
          }}>{this.state.text}</Text> */}
        </View>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: -Dimensions.get('window').height/10 + 5,
    left: Dimensions.get('window').width / 2 - 60
  },
  input : {
    top: -50,
  },
  qrcode: {
    top: -20
  },
});
