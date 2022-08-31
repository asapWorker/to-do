import React from "react";
import Task from "../Task/Task";

class List extends React.Component {
  render() {
    let tasks = 'No tasks';
    if (this.props.list) {
      tasks = this.props.list.map((task) => {
        return (
          <Task
            key={task.id}
            taskObj={task}
            handleEditingStart={this.props.handleEditingStart}
          />
        )
      })
    }
    return <div>
      {tasks}
    </div>
  }
}

export default List;