import React from "react";
import "./Task.css"

class Task extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contentState: '',
    }
    this.handleClickCheckbox = this.handleClickCheckbox.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }

  handleClickEdit() {
    this.props.handleEditingStart(this.props.taskObj);
  }

  handleClickCheckbox() {
    this.setState({
      contentState: 'line-through',
    })
    setTimeout(() => {
      this.props.deleteTask(this.props.taskObj.id);
    }, 500);
  }

  render() {
    const {content, importance, isFromYesterday} = this.props.taskObj;
    const dayStatusName = (isFromYesterday) ? 'yesterday' : '';

    return (
      <div className={"task " + importance}>
        <input className="checkbox should-off" type="checkbox" name="task" onChange={this.handleClickCheckbox}/>
        <span className={"content " + this.state.contentState + ' ' + dayStatusName}>
          {content}
        </span>
        <button className='edit-btn should-off' onClick={this.handleClickEdit}>
          edit
        </button>
      </div>
    )
  }
}

export default Task;