import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';

import TaskItem from './ListItem';

const TaskList = props => {
  return (
    <View>
      <View style={styles.taskHeader} >
        <Text style={styles.taskHeaderText}> Task Name </Text>
      </View>
    <FlatList
      style={styles.listContainer}
      keyboardShouldPersistTaps={'handled'}
      data={props.tasks}
      keyExtractor={ item => item.key.toString() }
      renderItem={ info  => (
        <TaskItem
          taskName={ info.item.value }
          onItemPressed={ () => props.onItemDeleted( info.item.key )}
        />
      )}
    >
    </FlatList>
    </View>
  )

};

const styles = StyleSheet.create({
  listContainer: {
    width: 350
  },
  taskHeader: {
    //width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  taskHeaderText: {
    color: "white",
    fontSize: 21,
    marginTop: 15
    //height: 75
  }
});

export default TaskList;
