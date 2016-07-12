import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import { getBio, getRepos, getNotes } from '../Utils/api';
import Profile from './Profile';
import Notes from './Notes';
import Repositories from './Repositories';

export default class Dashboard extends Component {
  makeBackground(btn) {
    const obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      flex: 1,
      justifyContent: 'center'
    };

    if(btn === 0) {
      obj.backgroundColor = '#48BBEC'
    } else if(btn === 1) {
      obj.backgroundColor = '#E77AAE'
    } else {
      obj.backgroundColor = '#758BF4'
    }

    return obj;
  }

  goToProfile = () => {
    this.props.navigator.push({
      title: "Profile Page",
      component: Profile,
      passProps: { userInfo: this.props.userInfo }
    });
  }

  goToRepos = () => {
    getRepos(this.props.userInfo.login)
      .then(res => {
        console.log(res);
        this.props.navigator.push({
          title: "Repos",
          component: Repositories,
          passProps: {
            userInfo: this.props.userInfo,
            repos: res
          }
        });
      })
  }

  goToNotes = () => {
    getNotes(this.props.userInfo.login)
      .then(res => {
        res = res || {};
        this.props.navigator.push({
          title: "Notes",
          component: Notes,
          passProps: {
            userInfo: this.props.userInfo,
            notes: res
          }
        });
      }).catch(error => {
        console.log(error);
      })
  }

  render() {
    console.log(this.props.userInfo)
    return (
      <View style={styles.container}>
        <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image}/>
        <TouchableHighlight
          onPress={this.goToProfile}
          style={this.makeBackground(0)}
          underlayColor='#88D4F5'>
          <Text style={styles.buttonText}>
            View Profile
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.goToRepos}
          style={this.makeBackground(1)}
          underlayColor='#88D4F5'>
          <Text style={styles.buttonText}>
            View Repos
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.goToNotes}
          style={this.makeBackground(2)}
          underlayColor='#88D4F5'>
          <Text style={styles.buttonText}>
            View Notes
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1,
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center',
  },
});
