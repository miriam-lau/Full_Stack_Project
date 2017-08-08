import React from 'react';
import DayPicker from 'react-day-picker';

import 'react-day-picker/lib/style.css';

export default class SelectDay extends React.Component {
  state = {
    selectedDay: new Date(), // We set the selected default as today
  };
  handleDayClick = (day, { selected, disabled }) => {
    if (disabled) {
      return;
    }
    if (selected) {
      // Unselect the day if already selected
      this.setState({
        selectedDay: undefined,
      });
      return;
    }
    this.setState({
      selectedDay: day,
    });
  };
  render() {
    const { selectedDay } = this.state;
    return (
      <div>
        <DayPicker
          onDayClick={this.handleDayClick}
          selectedDays={this.state.selectedDay}
          disabledDays={ { daysOfWeek: [0] } }
        />
        {selectedDay &&
          <p>
            You clicked {selectedDay.toLocaleDateString()}
          </p>}
      </div>
    );
  }
}
