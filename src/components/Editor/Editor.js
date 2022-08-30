import React from "react";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      importance: 'less',
      key: undefined,
    }

    this.createImportanceChoice = this.createImportanceChoice.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickCommit = this.handleClickCommit.bind(this);
  }

  createImportanceChoice() {
    const name = 'importance';
    const importanceValues = ["less", "middle", "very"];

    const importanceElements = importanceValues.map((val) => {
      return (
        <input
          key={val}
          type="radio"
          name={name}
          value={val}
          checked={val === this.state.importance}
          onChange={this.handleChange}
        />
      )
    });

    return (
    <div>
      {importanceElements}
    </div>
    )
  }

  handleChange(event) {
    const elemName = event.target.name;

    if (elemName === 'textarea') {
      this.setState((state, props) => {
        return {
          text: event.target.value,
        }
      })
    } else if (elemName === "importance") {
      this.setState((state, props) => {
        return {
          importance: event.target.value,
        }
      })
    }
  }

  handleClickCommit() {
    this.setState({
      key: Date.now(),
    })
  }

  render() {
    return (
      <div>
        <textarea
          name="textarea"
          id=""
          cols="30" rows="10"
          onChange={this.handleChange}
          value={this.state.text}
        />
        <div>
          {this.createImportanceChoice()}
          <button onClick={this.handleClickCommit}>
            Commit
          </button>
        </div>
      </div>
    )
  }
}

export default Editor;