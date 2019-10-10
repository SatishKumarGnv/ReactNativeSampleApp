import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants'; 
// You can import from local files 
import Header from '../components/Header'; 

 export default class Dashboard extends React.Component {
  render() {
    return (
      <View style={styles.container}> 
       <Header/>   
      </View>
    );
  } 
}

 
const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    height:0,
    backgroundColor: '#54AFDD',
    padding: 10,
    bottom:0,
    maxHeight:735
  },
}); 