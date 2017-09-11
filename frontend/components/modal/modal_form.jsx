import React from "react";

import Modal from "react-modal";
import SignInFormContainer from "../session_form/sign_in_form_container";
import SignUpFormContainer from "../session_form/sign_up_form_container";
import FontIcon from "material-ui/FontIcon";
import { sessionModalStyle } from "../utils/modal_styles";

class ModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false };
    this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement("div");
  }

  // Opens session modal
  openModal() {
    this.props.clearErrors();
    this.closeModal();
    this.setState({modalIsOpen: true});
  }

  // afterOpenModal() {
    // references are now sync"d and can be accessed.
    // this.subtitle.style.color = "#f00";
  // }

  // Closes session modal
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const open = Boolean(this.props.modalOpen)
    const { openModal, modalOpen } = this.props;
    const form = modalOpen === "signin" ?
      (<SignInFormContainer openModal={ openModal }/>) :
      (<SignUpFormContainer openModal={ openModal }/>);

    return (
      <div>
        <Modal isOpen={ open } onAfterOpen={ this.afterOpenModal }
            onRequestClose={ openModal("") } style={ sessionModalStyle } contentLabel="session-form">

          <div className="modal-icon">
            <i className="material-icons closeX"
                onClick={ openModal("") }>close</i>
          </div>

          {form}
        </Modal>
      </div>
    );
  }
}

export default ModalForm;
