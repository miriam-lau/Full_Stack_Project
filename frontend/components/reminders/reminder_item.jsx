import React from "react";

import { styles } from "../utils/material_ui_styles";

class ReminderItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    event.preventDefault;
    return this.props.deleteReminder(this.props.reminder.id)
      .then(() => { this.props.history.push("/pantry_items")});
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
            onClick={ this.handleDelete }>
          delete_forever
        </i>
      </div>
    );
  }
}

export default ReminderItem;
