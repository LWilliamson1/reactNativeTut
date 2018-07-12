/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import update from 'immutability-helper';
import axios from 'axios';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  PermissionsAndroid
} from 'react-native';

// async function requestLocationPermission(callback) {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         'title': 'Restaurant Roulette Location Permissions',
//         'message': 'Restaurant Roulette is better when it can use your location, ' +
//                    'but you can always enter your zipcode manually .'
//       }
//     )
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log("You can use the location")
//       callback();
//     } else {
//       console.log("Location permission denied")
//     }
//   } catch (err) {
//     console.warn(err)
//   }
// }
const appIcon = require('../../assets/app_icon.png')

const API_KEY = 'AIzaSyCWZc1sX57uQI7f3Ce2TIwbt4k-KNmm8eE'
export default class Home extends Component {
  constructor() {
      super()
      this.state = {
        name: 'Restaurant Roulette', 
        showName: true,
        photo: {}
      }
  }
  async requestLocationPermission() {
    try{
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
            'title': 'Restaurant Roulette Location Permissions',
            'message': 'Restaurant Roulette is better when it can use your location, ' +
                        'but you can always enter your zipcode manually .'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location")
            this.getLocation();
        } else {
            console.log("Location permission denied")
        }
    } catch (err){ console.log(err)} 
  }
  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          error: null,
        });
      },
      (error) => console.log(error.message) && this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  onClick() {
    console.log('clicked')
    this.props.navigation.navigate('DetailComponent', { name: 'Restaurant Roulette', lat: this.state.lat, lng: this.state.lng });
    this.props.navigation.navigate('DetailComponent');
  }
  componentDidMount() {
    this.requestLocationPermission(this.getLocation)
  }
  
  render() {
    return (
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={this.onClick.bind(this)} 
        >
          <Image
            style={styles.image}
            source={ appIcon }
          /> 
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onClick.bind(this)} 
        >
          <Text> Touch Here </Text>
       </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 10,
    flex: 1
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    resizeMode: 'contain',
    width: undefined,
    height: undefined
  },
  titleText: {
    fontSize: 20,
    margin: 10,
    // alignSelf: 'stretch', 
    textAlign: 'center',
    fontWeight: 'bold',
  }
})