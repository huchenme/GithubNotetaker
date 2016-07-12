import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import { getBio, getRepos } from '../Utils/api';
import Dashboard from './Dashboard';

export default class Main extends Component {
  state = {
    username: '',
    isLoading: false,
    error: false,
  };

  handleSubmit = () => {
    this.setState({
      isLoading: true
    });
    getBio(this.state.username)
      .then(res => {
        if (res.message === 'Not Found') {
          this.setState({
            error: 'User not found',
            isLoading: false
          })
        } else {
          this.props.navigator.push({
            title: res.name || "Select an Option",
            component: Dashboard,
            passProps: { userInfo: res }
          });
          this.setState({
            isLoading: false,
            username: '',
            error: false
          })
        }
      })
  };

  render() {
    const showError = (
      this.state.error ? <Text>{this.state.error}</Text> : <View></View>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Search for a Github User
        </Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChangeText={(text) => this.setState({username: text})}/>
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit}
          underlayColor="white">
          <Text style={styles.buttonText}>
            SEARCH
          </Text>
        </TouchableHighlight>
        <ActivityIndicator
          animating={this.state.isLoading}
          color="#111"
          size="large"/>
        {showError}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    marginTop: 65,
    backgroundColor: '#48BBEC',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: 'white'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});
