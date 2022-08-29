import React from "react";

const NAMESOfWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const NAMESOfMonths = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', "Nov.", 'Dec.'];

class Head extends React.Component {
  render() {
    const weekDay = NAMESOfWeekDays[this.props.date.getDay()];
    const month = NAMESOfMonths[this.props.date.getMonth()];
    const monthDay = this.props.date.getDate();
    const dayRelativelyToday = (this.props.dayRelativelyToday) ? <span>{this.props.dayRelativelyToday}</span> : null;

    return <div>
      {dayRelativelyToday}
      <span>{month + ' ' + monthDay}</span>
      <span>{weekDay}</span>
    </div>
  }
}

export default Head;