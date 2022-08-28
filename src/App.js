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
  }

  createList() {
    const currentList = this.state.schedules[this.state.currentDay];
    return (
      <List
        list={currentList}
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

  render() {
    return (
      <div>
        <div>
          <button>previous</button>
          <Head/>
          <button>next</button>
        </div>
        <List/>
      </div>
    )
  }
}

export default App;
