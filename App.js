import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button, Picker,
FlatList } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {users:[],
      language: 'javascript',
      user:'ram'
    };
  }
  search() {
    this.setState({users: [...this.state.users, this.state.user]})
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Userform, {this.state.language}
        </Text>
        <TextInput value={this.state.user} onChangeText={(text)=> this.setState({user:text}) }/>
        <Button onPress={this.search.bind(this)} title="search" />
        <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: 300, backgroundColor: 'red' }}
          onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="Javascript" />
        </Picker>
        <FlatList
          data={this.state.users}
          renderItem={({ item }) => <Text>{item}</Text>}
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
