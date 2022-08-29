import React from "react";
import Task from "../Task/Task";

import Task from "../Task/Task";

class List extends React.Component {
  render() {
    let tasks = 'No tasks';
    if (this.props.list) {
      tasks = this.props.list.map((task) => {
        return (
          <Task
            key={task.key}
            taskObj={task.obj}
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