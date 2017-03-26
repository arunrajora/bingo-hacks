import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Picker
} from 'react-native';

export default class Dropmenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: 'seller'
    }
  }

  render() {
    return (
      <Picker
        style={styles.drop}
        selectedValue={this.state.profile}
        onValueChange={(lang) => this.setState({profile: lang})}>
        <Picker.Item label="Seller" value="seller"/>
        <Picker.Item label="Delivery" value="delivery"/>
        <Picker.Item label="Buyer" value="buyer"/>
      </Picker>
    );
  }
}

const styles = StyleSheet.create({
  drop: {
    width: 120
  }
});
