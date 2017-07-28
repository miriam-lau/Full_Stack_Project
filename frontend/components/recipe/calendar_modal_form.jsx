import React from "react";

import Modal from "react-modal";
import FontIcon from "material-ui/FontIcon";

class CalendarModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalIsOpen: false};
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement("div");
  }

  openModal() {
    this.closeModal();
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync"d and can be accessed.
    // this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const style = {
      overlay : {
       position: "fixed",
       top: 0,
       left: 0,
       right: 0,
       bottom: 0,
       opactiy: "1",
       backgroundColor: "rgba(55, 55, 55, 0.9)"
      },
      content : {
        position: "fixed",
        top: "20%",
        left: "35%",
        right: "40px",
        bottom: "auto",
        border: "1px solid #ccc",
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
        borderRadius: "10px",
        outline: "none",
        width: "25%"
      }
    };

    const open = Boolean(this.props.modalOpen)
    const {modalOpen} = this.props;

    return (
      <div>
        <Modal isOpen={true} onAfterOpen={this.afterOpenModal}
          onRequestClose={ this.closeModal } style={style} contentLabel="session-form">

          <div className="modal-icon">
            <i className="material-icons closeX"
                onClick={ this.closeModal }>close</i>
          </div>

          <form>
            <input className="recipe-form-date" type="date"
              placeholder="Select a date"
              onChange={ this.handleSetDate } />
          </form>
        </Modal>
      </div>
    );
  }
}

export default CalendarModalForm;
