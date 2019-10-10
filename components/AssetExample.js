import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';


export default class AssetExample extends React.Component {
  render() {
    return (
      <View style={styles.container}>  
        <Image style={styles.logo} source={require('../assets/snack-icon.png')} /> 
      </View>
       
    );
  }
}

const styles = StyleSheet.create({
  container: {
     maxHeight:0,
     padding:10,
     position:'absolute',
     marginBottom:680,
     bottom:0
  },
  // paragraph: {
  //   margin: 10,
  //   marginBottom: 0,
  //   fontSize: 14,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  logo: {
    height: 58,
    width: 58,
  }
});
