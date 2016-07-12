import React, {Component, PropTypes} from 'react';
import Badge from './Badge';
import Separator from '../Helpers/Separator';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TextInput,
  TouchableHighlight
} from 'react-native';
import { getNotes, addNote } from '../Utils/api';

export default class Notes extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    notes: PropTypes.object.isRequired
  }

  state = {
    dataSource: this.ds.cloneWithRows(this.props.notes),
    note: '',
    error: ''
  }

  ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})

  handleSubmit = () => {
    const note = this.state.note;
    this.setState({
      note: ''
    })
    addNote(this.props.userInfo.login, note)
      .then(data => {
        getNotes(this.props.userInfo.login)
          .then(data => {
            this.setState({
              dataSource: this.ds.cloneWithRows(data)
            })
          })
      }).catch(err => {
        console.log('Request failed', err);
        this.setState({error});
      })
  }

  renderRow = (rowData) => (
    <View>
      <View style={styles.rowContainer}>
        <Text>{rowData}</Text>
      </View>
      <Separator />
    </View>
  )

  footer() {
    return (
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.note}
          onChangeText={(text) => this.setState({note: text})}
          placeholder="New Note"/>
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit}
          underlayColor="#88D4F5">
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderHeader={
            () => <Badge userInfo={this.props.userInfo} />
          } />
        {this.footer()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10,
  },
  rowContainer: {
    padding: 10,
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row',
  },
})
