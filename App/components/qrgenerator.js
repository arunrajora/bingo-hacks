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
      fetch('https://bingo-1f719.firebaseio.com/data.json')
      .then(data => data.json()).then(data => {

        // console.log(Object.keys(data).length);
        // console.log(count);
        if (count + 1 == Object.keys(data).length){
          this.state.count = this.state.count + 1;
          this.setState({swapper: true})
        }
        // console.log(data[count].party1);
      }).catch(err => console.log(err))
    }, 4000);
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
