import React, {PropTypes} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

const Badge = ({userInfo}) => (
  <View style={styles.container}>
    <Image style={styles.image} source={{uri: userInfo.avatar_url}}/>
    <Text style={styles.name}>
      {userInfo.name}
    </Text>
    <Text style={styles.handle}>
      {userInfo.login}
    </Text>
  </View>
);

Badge.propTypes = {
  userInfo: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string,
    login: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#48BBEC',
    paddingBottom: 10,
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white',
  },
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default Badge;
