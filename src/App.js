import React from "react";
import './App.css';

import Head from "./components/Head/Head";
import List from "./components/List/List";
import Editor from "./components/Editor/Editor";

//days constants
const FIRST_DAY = 0;
const LAST_DAY = 6;
const DAYS_C = 7;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: new Array(DAYS_C).fill(null),
      currentDay: FIRST_DAY,
      mode: 'reading',
      taskIsBeingEdit: null,
    }

    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleEditingStart = this.handleEditingStart.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleEditingFinish = this.handleEditingFinish.bind(this);
  }

  /*create elements
  ------------------------------------*/
  createHead() {
    const date = new Date(Date.now() + this.state.currentDay * 24 * 3600 * 1000);
    let dayRelativelyToday = undefined;

    if (this.state.currentDay === 0) {
      dayRelativelyToday = 'Today';
    } else if (this.state.currentDay === 1) {
      dayRelativelyToday = 'Tomorrow';
    }

    return (
      <Head
        date={date}
        dayRelativelyToday={dayRelativelyToday}
      />
    )
  }

  createList() {
    const currentList = this.state.schedules[this.state.currentDay];
    return (
      <List
        list={currentList ? Array.from(currentList.values()) : null}
        handleEditingStart={this.handleEditingStart}
      />
    )
  }

  createEditor() {
    return (
      <Editor
        handleEditingFinish={this.handleEditingFinish}
        existedTask={this.state.taskIsBeingEdit}
      />
    )
  }
  /*-----------------------------------*/



  /*buttons' events handlers
  -------------------------------------*/
  handleClickPrev() {
    this.setState((state, props) => {
      if (state.currentDay !== FIRST_DAY) {
        return {currentDay: state.currentDay - 1};
      }
    })
  }

  handleClickNext() {
    this.setState((state, props) => {
      if (state.currentDay !== LAST_DAY) {
        return {currentDay: state.currentDay + 1};
      }
    })
  }

  handleClickAdd() {
    this.handleEditingStart();
  }
  /*-----------------------------------*/


  handleEditingStart(task = null) {
    this.setState({
      mode: 'editing',
      taskIsBeingEdit: task,
    })
  }

  handleEditingFinish(task, isExistedTask = false) {
    this.setState((state, props) => {
      let currentDaySchedule = state.schedules[state.currentDay];
      if (!currentDaySchedule) {
        currentDaySchedule = new Map();
      } else {
        currentDaySchedule = new Map(currentDaySchedule);
      }
      currentDaySchedule.set(task.id, task);

      const schedules = state.schedules.slice();
      schedules[state.currentDay] = currentDaySchedule;

      return {
        schedules: schedules,
        mode: 'reading',
      }
    })
  }


  render() {
    const Head = this.createHead();
    const List = this.createList();
    const Editor = this.createEditor();

    return (
      <div>
        <div>
          <button onClick={this.handleClickPrev}>Previous</button>
          {Head}
          <button onClick={this.handleClickNext}>Next</button>
          <button onClick={this.handleClickAdd}>Add</button>
          {List}
          {(this.state.mode === 'reading') ? null : Editor}
        </div>
      </div>
    )
  }
}

export default App;
