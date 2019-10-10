import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';

import {Actions} from 'react-native-router-flux';
import { Header } from 'react-navigation-stack';
import Headers from './Header';

// import Ajax from './assets/wrapper/ajax';
export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      onLogin:this.onLogin.bind(this), 
      dashboard:this.dashboard.bind(this) 
    };
  }
 
	dashboard() {
		Actions.dashboard()
	}

  onLogin() {
    const { username, password } = this.state;
      var datas = { 
                  Password: `${username}`,
                  UserName: `${password}`,
              };
var dataToSend = { UserName: `${username}`, Password: `${password}` };

    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

fetch('http://uaims.apcrda.org/Login/ValidateUser', {
      method: 'POST', //Request Type
      body: formBody, //post body
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(response => response.json())
      //If response is in json then in success
      .then(responseJson => {
        if (responseJson.ReturnCode == 0) {
        Alert.alert('Welcome you are Authorized');    
        this.dashboard();
        }
        
        if (responseJson.ReturnCode == 1) {
        Alert.alert('Invalid Credentials');  
        }
        
        if (responseJson.ReturnCode == 2) {
        Alert.alert('Please Contact Admin');  
        }
        // Alert.alert(JSON.stringify(responseJson));
        // alert(JSON.stringify(responseJson));
        console.log(responseJson);
      })
      //If response is not in json then in error
      .catch(error => {
         Alert.alert(JSON.stringify(error));
        // alert(JSON.stringify(error));
        console.error(error);
      }); 
  }  
  render() {
    return (
    
      <View style={styles.container}>
      <Headers/>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.state.onLogin} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#54AFDD',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
