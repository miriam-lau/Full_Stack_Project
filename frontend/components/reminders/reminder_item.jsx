import React from "react";

class ReminderItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const reminder = this.props.reminder;
    console.log(reminder);
    return (
      <div className="update-pantry-form-div">
        <TextField id="text-field-default"
          value={ reminder.name }
          underlineFocusStyle={ underlineFocusStyle }
          underlineStyle={ underlineStyle }
        />

        <i className="material-icons trash-can"
            style={styles}
            onClick={ () => this.props.deleteReminder(reminder.id) }>
          delete_forever
        </i>
      </div>
    );
  }
}

export default ReminderItem;
