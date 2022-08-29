import React from "react";
import './App.css';

import Head from "./components/Head/Head";
import List from "./components/List/List";

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
    }
    this.createList = this.createList.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
  }

  createList() {
    const currentList = this.state.schedules[this.state.currentDay];
    return (
      <List
        list={currentList}
      />
    )
  }

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

  }

  render() {
    const head = this.createHead();
    const list = this.createList();

    return (
      <div>
        <div>
          <button onClick={this.handleClickPrev}>Previous</button>
          {head}
          <button onClick={this.handleClickNext}>Next</button>
          <button>Add</button>
          {list}
        </div>
      </div>
    )
  }
}

export default App;
