import React from "react";

import './App.css';

import {ReactComponent as ArrowRight} from "./icons/arrow-right.svg";

import Title from "./components/Title/Title.js";
import List from "./components/List/List";
import Editor from "./components/Editor/Editor";
import {FIRST_DAY, LAST_DAY, DAYS_C, IMPORTANCE} from "./constants";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: new Array(DAYS_C).fill(null),
      currentDay: FIRST_DAY,
      mode: 'reading',
    }

    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleEditingStart = this.handleEditingStart.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleEditingFinish = this.handleEditingFinish.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
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
      <Title
        date={date}
        dayRelativelyToday={dayRelativelyToday}
      />
    )
  }

  createList() {
    const currentList = this.state.schedules[this.state.currentDay];
    return (
      <List
        list={currentList}
        handleEditingStart={this.handleEditingStart}
        deleteTask={this.deleteTask}
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

  createArrow(directionIsLeft) {
    if (!directionIsLeft) {
      return (
        <ArrowRight
          className="arrow"
        />
      )
    } else {
      return (
        <ArrowRight
          className="arrow"
          transform="rotate(180)"
        />
      )
    }
  }
  /*-----------------------------------*/



  /*buttons' events handlers
  -------------------------------------*/
  handleClickPrev() {
    this.setState((state) => {
      if (state.currentDay !== FIRST_DAY) {
        return {currentDay: state.currentDay - 1};
      }
    })
  }

  handleClickNext() {
    this.setState((state) => {
      if (state.currentDay !== LAST_DAY) {
        return {currentDay: state.currentDay + 1};
      }
    })
  }

  handleClickAdd() {
    this.handleEditingStart();
  }
  /*-----------------------------------*/


  /*editing start and finish action handlers
  --------------------------------------*/
  handleEditingStart(task = null) {
    this.setState({
      mode: 'editing',
      taskIsBeingEdit: task,
    })
  }

  handleEditingFinish(task) {
    this.setState((state) => {
      const schedules = state.schedules.slice();

      let currentDaySchedule = schedules[state.currentDay];
      if (!currentDaySchedule) {
        currentDaySchedule = new Map();
      } else {
        currentDaySchedule = new Map(currentDaySchedule.entries());
      }
      currentDaySchedule.set(task.id, task);

      schedules[state.currentDay] = this.sortTasks(currentDaySchedule);

      return {
        schedules: schedules,
        mode: 'reading',
      }
    })
  }
  /*----------------------------------------*/


  deleteTask(taskId) {
    this.setState((state) => {
      const schedules = state.schedules.slice();

      const currentDaySchedule = new Map(schedules[state.currentDay].entries());
      currentDaySchedule.delete(taskId);

      schedules[state.currentDay] = (!currentDaySchedule.size) ? null : currentDaySchedule;

      return {
        schedules: schedules,
      }
    })
  }

  sortTasks(tasksMap) {
    const tasksArr = Array.from(tasksMap.entries());
    tasksArr.sort(compare);
    return new Map(tasksArr);

    function compare(task1, task2) {
      task1 = task1[1];
      task2 = task2[1];

      if (task1.isFromYesterday !== task2.isFromYesterday) {
        return (task2.isFromYesterday);
      } else if (task1.importance !== task2.importance) {
        const task1Importance = IMPORTANCE[task1.importance];
        const task2Importance = IMPORTANCE[task2.importance];
        return (task2Importance - task1Importance);
      } else {
        return (task1.id - task2.id);
      }
    }
  }


  render() {
    const Head = this.createHead();
    const List = this.createList();
    const Editor = this.createEditor();
    const LeftArrow = this.createArrow(true);
    const RightArrow = this.createArrow(false);

    return (
        <div className={"app " + this.state.mode}>
          <div className={"app-always-visible"}>

            <div className="app-header">

              <button className="days-change-btn should-off" onClick={this.handleClickPrev}>
                {LeftArrow}
              </button>

              <div className="head-wrapper">
                {Head}
              </div>

              <button className="days-change-btn should-off" onClick={this.handleClickNext}>
                {RightArrow}
              </button>

            </div>

            <div className="list-wrapper">
              {List}
            </div>

            <div className="add-btn-wrapper">
              <button className="add-btn should-off" onClick={this.handleClickAdd}>Add</button>
            </div>

          </div>

          {(this.state.mode === 'reading') ? null :
            <div className="editor-wrapper">
              {Editor}
            </div>
          }

        </div>
    )
  }
}

export default App;
