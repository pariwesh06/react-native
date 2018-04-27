import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, TextInput, Button, Picker,
  FlatList
} from 'react-native';
const details_page = 'details';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
function requestPermission() {
  // alert('test');
  try {
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Cool Photo App Camera Permission',
        'message': 'allow geolocation?.'
      }
    )
  } catch (err) {
    console.warn(err)
  }
}
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      language: 'javascript',
      user: 'ram'
    };
  }
  getContacts() {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        alert(err);
      } else {
        console.log(contacts);
      }
    })
  }
  getLocation() {
    requestPermission().then((permission) => {
      console.log(permission)
      if (permission === PermissionsAndroid.RESULTS.GRANTED)
        navigator.geolocation.watchPosition((location) => console.log(location));
    },
      () => { console.log(arguments) },
      {
        maximumAge: 1000
      })
  }
  componentWillmount() {
    this.search();
    navigator.geolocation.watchPosition((location) => console.log(location));
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch();
  }
  search() {
    var promise = fetch('http://it-ebooks-api.info/v1/search/angular');
    promise.then((response) => {
      response.json().then((data) => {
        console.log(data.Books);
        this.setState({ users: data.Books });
      });
    })
    //logic
  }
  gotoDetails() {
    // console.log(this.props.navigation);
    this.props.navigation.navigate("details", { title: 'Javascript', price: 300 });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Userform, {this.state.language}
        </Text>
        <TextInput value={this.state.user} onChangeText={(text) => this.setState({ user: text })} />
        <Button onPress={this.search.bind(this)} title="search" />
        <Button onPress={this.gotoDetails.bind(this)} title="go to details" />
        <Button onPress={this.getLocation.bind(this)} title="getLocation" />
        <Button onPress={this.getContacts.bind(this)} title="getContacts" />

        <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: 300, backgroundColor: 'red' }}
          onValueChange={(book, itemIndex) => {
            this.props.navigation.navigate(details_page, book);
            {/*this.setState({ language: itemValue })*/ }
          }}>
          {this.state.users.map(item => {
            return <Picker.Item label={item.Title} value={item} />
          })
          }

        </Picker>
        <FlatList
          data={this.state.users}
          renderItem={(book) => <Text>{book.Title}</Text>}
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
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});