import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Auth0 from 'react-native-auth0';

var credentials = require('../../secrets');
const auth0 = new Auth0(credentials);

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { accessToken: null };
  }

  redirect = () => {
    this.props.navigation.navigate('OrderConfirm')
  }
  _onLogin = () => {
    console.log('working in login')

    auth0.webAuth
      .authorize({
        scope: 'openid profile',
        audience: 'https://rewards-app-project.auth0.com/userinfo',
        useBrowser: true
      })
      .then(_ => {
        this.setState({ accessToken: credentials.accessToken })
        this.redirect();

      })
      .catch(error => console.log(error));
  };

  _onLogout = () => {
    if (Platform.OS === 'android') {
      this.setState({ accessToken: null });
    } else {
      auth0.webAuth
        .clearSession({})
        .then(success => {
          this.setState({ accessToken: null });
        })
        .catch(error => console.log(error));
    }
  };

  render() {
    let loggedIn = this.state.accessToken === null ? false : true;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Login</Text>
        <Text>
          You are {loggedIn ? '' : 'not '}logged in.
        </Text>
        <Button
          onPress={loggedIn ? this._onLogout : this._onLogin}
          title={loggedIn ? 'Log Out' : 'Log In'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

AppRegistry.registerComponent('Login', () => Login);