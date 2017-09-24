import React from "react";

import { styles } from "../utils/material_ui_styles";

class ReminderItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const reminder = this.props.reminder;

    return (
      <div className="reminder-item">
        <div>
          {reminder.due_date === "" ?
              "" : <span>{ reminder.due_date } : &nbsp; &nbsp; </span>
          }
          <span>{ reminder.name }</span>
        </div>

        <i className="material-icons trash-can"
            style={ styles }
            onClick={ () => this.props.deleteReminder(reminder.id) }>
          delete_forever
        </i>
      </div>
    );
  }
}

export default ReminderItem;
