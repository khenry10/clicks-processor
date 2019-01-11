import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet, Text } from 'react-native';

//import { checkIfEmpty } from './../../utils/utils.js';
//import { fetcher } from './../../utils/fetcher.js';
//import { TASKS_ENDPOINT, lightBlack } from "../../constants.js";

class TaskInput extends Component {

  state = {
      taskName: ""
  };

  /**
    this keyword refers to the class, a named non-arrow function would create
      a new scope and bind this to the function and not the class
  **/

  _taskNameChangeHandler = val =>  {
    //console.log("this = ", this);
    console.log(" val = ", val)
    this.setState({
      taskName: val
    });
  };


  _taskSubmitHandler = () => {

    /**
      protects against saving an empty string
    **/
    // if ( checkIfEmpty( this.state.taskName ) ){
    //   return;
    // };
    //this.state.taskName = "";
    //this.state.taskEstimate = "";

    console.log("this.state = ", this.state);
    console.log("this.props = ", this.props);
    this.props.onTaskAdded( this.state.taskName );

    this.setState({
      taskName: ""
    });

  };

  // _addSeeds = () => {
  //   this.props.onTaskAdded( "breakfast", 2 );
  //   this.props.onTaskAdded( "shower", 5 );
  //   this.props.onTaskAdded( "float", 10 );
  // };

  componentDidMount(){
    //this._addSeeds();
  };

  render(){
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.taskInput}
          placeholder="Add Task"
          value={this.state.taskName}
          onChangeText={this._taskNameChangeHandler}
        />
        <Button
          style={styles.button}
          onPress={this._taskSubmitHandler}
          title='Add'
        />
        {/*<Button*/}
          {/*onPress={this._addSeeds}*/}
          {/*title='Seed'*/}
        {/*/>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderColor: "grey",
    width: "100%",
    paddingTop: 15,
    paddingBottom: 15,
    height: 75,
    borderColor: 'rgb(50, 50, 50)',
    marginTop: "5%",
    borderWidth: 1,
    borderRadius: 1,
    //backgroundColor: 'rgb(25,25,25)'
    //backgroundColor: lightBlack
  },
  taskInput: {
    width: 320,
    backgroundColor: 'rgb(193, 193, 193)',
    margin: 5
  },
  button: {
    marginRight: 55
  }
});

export default TaskInput;
