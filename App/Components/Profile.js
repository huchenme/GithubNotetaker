import React, {Component} from 'react';
import Badge from './Badge';
import Separator from '../Helpers/Separator';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';

export default class Profile extends Component {
  getRowTitle(item) {
    item = (item === 'public_repos') ? item.replace('_', ' ') : item;
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }

  render() {
    const {userInfo} = this.props;
    const topicArr = [
      'company',
      'location',
      'followers',
      'following',
      'email',
      'bio',
      'public_repos',
    ];
    const list = topicArr.map((item, index) => {
      if (!userInfo[item]) {
        return <View key={index} />;
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}>
                {this.getRowTitle(item)}
              </Text>
              <Text style={styles.rowContent}>
                {userInfo[item]}
              </Text>
            </View>
            <Separator />
          </View>
        )
      }
    });
    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={userInfo} />
        {list}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    padding: 10,
  },
  rowTitle: {
    color: '#488BEC',
    fontSize: 16,
  },
  rowContent: {
    fontSize: 19,
  },
})
