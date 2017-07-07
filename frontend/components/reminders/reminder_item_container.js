import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ReminderItem from "./reminder_item";
import { requestAllReminders, deleteReminder, updateReminder } from
    "../../actions/reminder_actions";
import { selectAllReminders } from "../../reducers/selectors";

const mapStateToProps = (state) => ({
  reminders: selectAllReminders(state)
});

const mapDispatchToProps = (dispatch) => ({
  requestAllReminders: () => dispatch(requestAllReminders()),
  deleteReminder: (id) => dispatch(deleteReminder(id)),
  updateReminder: (reminder) => dispatch(updateReminder(reminder))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReminderItem));
