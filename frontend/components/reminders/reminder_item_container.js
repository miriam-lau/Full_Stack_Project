import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ReminderItem from "./reminder_item";
import { deleteReminder } from "../../actions/reminder_actions";
import { selectAllReminders } from "../../reducers/selectors";

const mapStateToProps = (state) => ({
  reminders: selectAllReminders(state)
});

const mapDispatchToProps = (dispatch) => ({
  deleteReminder: (id) => dispatch(deleteReminder(id))
});

export default withRouter(connect(mapStateToProps,
    mapDispatchToProps)(ReminderItem));
