import React from "react";
import "./Editor.css"

import {IMPORTANCE_OPTIONS} from "../../constants";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: (this.props.existedTask) ? this.props.existedTask.content : '',
      isError: false,
      importance: (this.props.existedTask) ? this.props.existedTask.importance : IMPORTANCE_OPTIONS[0],
    }

    this.createImportanceChoice = this.createImportanceChoice.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickCommit = this.handleClickCommit.bind(this);

    this.textareaField = React.createRef();
  }

  /*create radio buttons for choosing importance of tasks
  ---------------------------------------------*/
  createImportanceChoice() {
    const name = 'importance';
    let importanceElements = IMPORTANCE_OPTIONS.slice();

    importanceElements = importanceElements.map((val) => {
      return (
        <React.Fragment key={val}>
          <input
            type="radio"
            name={name}
            value={val}
            checked={val === this.state.importance}
            onChange={this.handleChange}
            id={val}
          />
          <label htmlFor={val} className={name + ' ' + val}></label>
        </React.Fragment>
      )
    });

    return (
    <div className="editor-importance">
      {importanceElements}
    </div>
    )
  }
  /*------------------------------------------*/


  /*elements' actions handlers
  ----------------------------------------------*/
  handleChange(event) {
    const elemName = event.target.name;

    if (elemName === 'textarea') {
      this.setState({
        text: event.target.value,
      })
    } else if (elemName === "importance") {
      this.setState({
        importance: event.target.value,
      })
    }
  }

  handleClickCommit(event) {
    event.preventDefault();

    if (this.state.text === '') {
      this.setState({
        isError: true,
      });
      this.textareaField.current.focus();
      return;
    }
    const existedTask = this.props.existedTask;

    const task = {
      id: (existedTask) ? existedTask.id : Date.now(),
      content: this.state.text,
      importance: this.state.importance,
      isFromYesterday: existedTask?.isFromYesterday,
    }

    this.props.handleEditingFinish(task);
  }
  /*--------------------------------------------*/

  render() {
    const ImportanceChoice = this.createImportanceChoice();

    return (
      <form className="editor" onSubmit={this.handleClickCommit}>
        <input
          type="text"
          className={"editor-text-input" + ((this.state.isError) ? " errored" : "")}
          name="textarea"
          onChange={this.handleChange}
          value={this.state.text}
          ref={this.textareaField}
          placeholder="Enter task"
        />
        <div className="editor-interface">
          {ImportanceChoice}
          <button
            type="submit"
            className="editor-btn"
          >
            Commit
          </button>
        </div>
      </form>
    )
  }

  componentDidMount() {
    this.textareaField.current.focus();
  }
}

export default Editor;