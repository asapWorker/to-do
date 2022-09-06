import React from "react";
import "./Title.css"

const NAMESOfWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const NAMESOfMonths = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];

class Title extends React.Component {
  render() {
    const weekDay = NAMESOfWeekDays[this.props.date.getDay()];
    const month = NAMESOfMonths[this.props.date.getMonth()];
    const monthDay = this.props.date.getDate();
    const dayRelativelyToday = (this.props.dayRelativelyToday) ? <span className='day-relatively-today'>{this.props.dayRelativelyToday}</span> : null;

    return <div className="title">
      {dayRelativelyToday}
      <span className='month'>{month + monthDay}</span>
      <span className='weekday'>{weekDay}</span>
    </div>
  }
}

export default Title;