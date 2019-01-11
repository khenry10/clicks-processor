import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { CheckBox } from 'react-native-elements'


class TaskItem extends Component {

    constructor(props){
      super(props);
      this.state = { checked: false};
    }

    render(){
      //console.log("this = ", this)
      return (
        <View style={styles.taskItem}>
        <CheckBox
          checked={this.state.checked}
          onPress={() => this.setState({checked: !this.state.checked})}>
        </CheckBox>
          <TouchableOpacity onPress={this.props.onItemPressed}>
            <View >
              <View >
                <Text style={styles.taskText} > {this.props.taskName} </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
};


const styles = StyleSheet.create({
  taskItem: {
    width: "100%",
    backgroundColor: 'rgb(111, 111,111)', //'rgb(9,9,9)', //'rgb(25,25,25)',
    margin: 5,
    height: 50,
    flexDirection: "row",
    //justifyContent: "space-between",
    alignItems: "center"
  },
  nonTime: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskText: {
    color: "white",
    fontSize: 20,
    // borderColor: "red",
    // borderWidth: 1,
  },
  time: {
    width: 120,
    paddingLeft: 20,
    marginLeft: 50,
    // borderColor: "green",
    // borderWidth: 1,
  },
  checkbox: {
    width: 30,
    height: 30
  }
});

export default TaskItem;
