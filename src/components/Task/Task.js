import React from "react";

class Task extends React.Component {
  render() {
    const {content, importance, isFromYesterday} = this.props.taskObj;
    const dayStatusName = (isFromYesterday) ? 'yesterday' : '';

    return (
      <div>
        <input type="checkbox" name="task"/>
        <span className={importance + ' ' + dayStatusName}>
          {content}
        </span>
        <button className='edit-btn'>
          edit
        </button>
      </div>
    )
  }
}

export default Task;