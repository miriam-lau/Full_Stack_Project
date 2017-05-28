import React from 'react';
import Modal from 'react-modal';
import FontIcon from 'material-ui/FontIcon';

import SignInFormContainer from '../session_form/sign_in_form_container';
import SignUpFormContainer from '../session_form/sign_up_form_container';

class ModalForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {modalIsOpen: false};

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('div');
  }

  openModal() {
    this.props.clearErrors();
    this.closeModal();
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const style = {
      overlay : {
       position          : 'fixed',
       top               : 0,
       left              : 0,
       right             : 0,
       bottom            : 0,
       opactiy: '1',
       backgroundColor   : 'rgba(55, 55, 55, 0.9)'
      },
      content : {
        position                   : 'fixed',
        top                        : '20%',
        left                       : '35%',
        right                      : '40px',
        bottom                     : 'auto',
        border                     : '1px solid #ccc',
        // background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '10px',
        outline                    : 'none',
        // padding                    : '20px',
        width: '25%'
      }
    };


    const open = Boolean(this.props.modalOpen)
    const {openModal, modalOpen} = this.props;
    const form = modalOpen === 'signin' ? (<SignInFormContainer openModal={openModal}/>) :
      (<SignUpFormContainer openModal={openModal}/>);
    return (
      <div>
        <Modal
          isOpen={open}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={openModal("")}
          style={style}
          contentLabel="session-form"
        >
          <div className="modal-icon">
            <i className="material-icons"
            onClick={openModal("")}>close</i>
          </div>

          {form}
        </Modal>
      </div>
    );
  }
}

export default ModalForm;
