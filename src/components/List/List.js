import React from "react";
import "./List.css"
import Task from "../Task/Task";

class List extends React.Component {
  render() {
    let tasks = 'No tasks';
    let listClass = 'no-tasks';

    if (this.props.list) {
      tasks = this.props.list.map((task) => {
        return (
          <Task
            key={task.id}
            taskObj={task}
            handleEditingStart={this.props.handleEditingStart}
            deleteTask={this.props.deleteTask}
          />
        )
      })
      listClass = "list";
    }
    return (
      <div className={listClass}>
        {tasks}
      </div>
    )
  }
}

export default List;