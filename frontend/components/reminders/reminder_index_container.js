import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ReminderIndex from "./reminder_index";
import { requestAllReminders, deleteReminder } from
    "../../actions/reminder_actions";
import { selectAllReminders } from "../../reducers/selectors";

const mapStateToProps = (state) => ({
  reminders: selectAllReminders(state),
  errors: state.reminder.errors
});

const mapDispatchToProps = (dispatch) => ({
  requestAllReminders: () => dispatch(requestAllReminders()),
  deleteReminder: (id) => dispatch(deleteReminder(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReminderIndex));
