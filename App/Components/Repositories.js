import React, {Component, PropTypes} from 'react';
import Badge from './Badge';
import Separator from '../Helpers/Separator';
import WebView from '../Helpers/WebView';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableHighlight
} from 'react-native';

export default class Profile extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
  };

  openPage = (url) => {
    console.log(url);
    this.props.navigator.push({
      component: WebView,
      title: 'Web View',
      passProps: {url}
    })
  }

  render() {
    const {repos} = this.props;
    const list = repos.map((repo, index) => {
      const desc = repos[index].description ? <Text style={styles.description}>{repos[index].description}</Text> : <View></View>
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={this.openPage.bind(null, repo.html_url)}
              underlayColor='transparent'>
              <Text style={styles.name}>{repo.name}</Text>
            </TouchableHighlight>
            <Text style={styles.stars}>Stars: {repo.stargazers_count}</Text>
            {desc}
          </View>
          <Separator />
        </View>
      )
    })
    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={this.props.userInfo} />
        {list}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    padding: 10,
  },
  name: {
    color: '#488BEC',
    fontSize: 18,
    paddingBottom: 5,
  },
  stars: {
    color: '#488BEC',
    fontSize: 14,
    paddingBottom: 5,
  },
  description: {
    fontSize: 14,
    paddingBottom: 5,
  },
})
