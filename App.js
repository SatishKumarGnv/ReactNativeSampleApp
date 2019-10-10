import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';
import Header from './components/Header';
import Login from './components/Login'; 
import Routes from './assets/Routes'; 

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
         
        <Routes/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    height: 0,
    backgroundColor: '#54AFDD',
    padding: 10,
    bottom: 0,
    maxHeight: 735,
  },
});
