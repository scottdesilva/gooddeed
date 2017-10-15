// Exported from snack.expo.io
import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image } from 'react-native';
import { Constants, Facebook, Google, Font } from 'expo';

export default class App extends Component {

  state = {
    fontLoaded: false

  };

  async componentDidMount() {
      await Font.loadAsync({
        'aka': require('./assets/fonts/akaDora.ttf'),
      });

      this.setState({ fontLoaded: true});
  }

  _handleButtonPress = () => {
    Alert.alert(
      'Button pressed!',
      'You did it!',
    );
  };

//FB Login
  _handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '1201211719949057', // Replace with your own app id in standalone app
        { permissions: ['public_profile'] }
      );

      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const profile = await response.json();
          Alert.alert(
            'Logged in!',
            `Hi ${profile.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };

//Google Login
  _handleGoogleLogin = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
        iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
        androidClientId: '603386649315-9rbv8vmv2vvftetfbvlrbufcps1fajqf.apps.googleusercontent.com',
        iosClientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      switch (type) {
        case 'success': {
          Alert.alert(
            'Logged in!',
            `Hi ${user.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={{uri:'http://www.designyourway.net/diverse/amasia/White.jpg'}}
            style={{flex:1, flexWrap: 'wrap'}}
            //transform={[{scale:0.75}]}
            >
          </Image>
        </View>

        <View style={styles.titleContainer}>
         {  this.state.fontLoaded ?
           (  <Text style={styles.title}>GoodDeed</Text> ) : null}
        </View>

        <View style={styles.buttonContainer}>

          <Button
            color='blue'
            title="Login with Facebook"
            onPress={this._handleFacebookLogin}
          />

          <Button
            color='red'
            title="Login with Google"
            onPress={this._handleGoogleLogin}
          />

        <Button
            color='#69F0AE'
            title="Sign in with Email"
            onPress={this._handleButtonPress}
          />
        </View>

        <View style={styles.footerContainer}>
          <Text>Copyright</Text>
          <Text
            style={{color:'#69F0AE'}}>GoodDeed Team
          </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#E0E0E0',
  },
  logoContainer: {
    flex:7,
    backgroundColor:'#E0E0E0',
    justifyContent:'center',
    alignItems:'stretch',
  },
  buttonContainer: {
    flex:5,
    justifyContent:'space-around',
    backgroundColor:'#CFD8DC',
    alignItems:'center',
  },
  titleContainer: {
    flex:1.25,
    justifyContent: 'center',
    backgroundColor:'#B0BEC5',
    alignItems:'center',
  },
  footerContainer: {
    flex:1.75,
    justifyContent:'flex-end',
    backgroundColor:'#CFD8DC',
    alignItems:'center',
  },
  title: {
    fontFamily: 'aka',
    fontSize: 42,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems:'center',
    color: '#69F0AE',
  },
  button: {
    paddingTop:10,
    paddingBottom:50,
    width:50,
    marginBottom:50,
  },

});
