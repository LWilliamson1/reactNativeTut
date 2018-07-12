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
  Button,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';

const API_KEY = 'AIzaSyCWZc1sX57uQI7f3Ce2TIwbt4k-KNmm8eE'
export default class DetailComponent extends Component {
  constructor() {
      super()
      this.state = {
        name: 'Restaurant Roulette', 
        showName: true,
        photo: {},
        lat: null,
        lng: null,
        error: null,
        spinDisabled: false
      }
  }
  static defaultProps = {
    message: 'Hi There'
  }
  onChangeText(v){
    console.log(v)
  }
  onSubmitText(){
    console.log('submitted')
  }
  onClick() {
    console.log('clicked')
    this.updateRestaurant();
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
        this.updateRestaurant()
      },
      (error) => console.log(error.message) && this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  updateRestaurant() {
    this.setState({ spinDisabled: true });
    axios.get(`https://maps.googleapis.com/maps/api/place/radarsearch/json?location=${this.state.lat},${this.state.lng}&radius=4828&type=restaurant&key=${API_KEY}`)
    .then(response => {
      let id = response.data.results[Math.floor(Math.random() * response.data.results.length)].place_id
      return axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&opennow&key=${API_KEY}`)
        .then(response=>{
          let {name, rating, photos, price_level} = response.data.result
          this.props.navigation.navigate('DetailComponent', { name, lat: this.state.lat, lng: this.state.lng });
          this.setState({
            name,
            price_level,
            rating,
            photo: photos && photos.length && photos[0],
            spinDisabled: false
          }) 
        })
    })
  }
  componentWillMount() {
    this.setState({
      lat: this.props.navigation.state.params.lat,
      lng: this.props.navigation.state.params.lng
    }, ()=>{
      this.updateRestaurant();
    })
  }
  render() {
    let name = this.state.showName ? this.state.name : 'No Name'
    return (
      <View style={styles.content}>
        <Text style={styles.titleText}>{this.state.name}</Text>
        <TouchableOpacity
          style={styles.imageContainer}
          // onPress={this.updateRestaurant.bind(this)} 
        >
          <Image
            style={styles.image}
            source={{uri: this.state.photo && this.state.photo.photo_reference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${this.state.photo.width}&maxHeight=${this.state.photo.height}&photoreference=${this.state.photo.photo_reference}&key=${API_KEY}` : 'https://avatars0.githubusercontent.com/u/4041140?s=460&v=4'}}
            onError={(e) => { this.props.source = { uri: 'https://avatars0.githubusercontent.com/u/4041140?s=460&v=4' }}}
          /> 
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.rating}>Rating: {this.state.rating || 'N/A'}</Text>
          <Text style={styles.price}>Price: {this.state.price_level || 'N/A'}</Text>
        </View>
        {/* <TextInput
          placeholder="Enter Text"
          value={this.state.textValue}
          onChangeText={value=>this.onChangeText(value)} 
          onSubmitEditing={this.onSubmitText}
        /> */}
        <TouchableOpacity
          style={styles.button}
          onPress={this.updateRestaurant.bind(this)} 
          disabled={this.state.spinDisabled}
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
  titleText: {
    fontSize: 20,
    margin: 10,
    // alignSelf: 'stretch', 
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rating: {
    textAlign: 'center',
    justifyContent: 'flex-start',
    flex: 1
  },
  price: {
    textAlign: 'center',
    flex: 1,
    justifyContent: 'flex-end'
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flex: 1
  }
})