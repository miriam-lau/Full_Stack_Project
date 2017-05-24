import React from 'react';
import SignInForm from '../session_form/sign_in_form';
import SignUpForm from '../session_form/sign_up_form';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px'
  }
};

class ModalForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {modalIsOpen: false};

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  openModal() {
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
    // const padding = 90; // adjust this to your needs
    //     let height = (this.state.contentHeight + padding);
    //     let heightPx = height + 'px';
    //     let heightOffset = height / 2;
    //     let offsetPx = heightOffset + 'px';

    const style = {
      content: {
        borderRadius: '10px',
        bottom: 'auto',
        // height: heightPx,  // set height
        left: '35%',
        padding: '2rem',
        position: 'fixed',
        right: 'auto',
        top: '20%', // start from center
        // transform: 'translate(-50%,-' + offsetPx + ')', // adjust top "up" based on height
        width: '30%',
        maxWidth: '40rem'
      }
    };

    let formType;
    if (this.props.signInForm) {
      formType = "Sign In";
    } else {
      formType = "Create Account";
    }

    return (
      <div>
        <button onClick={this.openModal}>{formType}</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={style}
        >

        {(this.props.signInForm) ?
          <SignInForm
            signin={this.props.signin}
            errors={this.props.errors}
          /> : <SignUpForm
            signin={this.props.signin}
            signup={this.props.signup}
            errors={this.props.errors}
          />
        }
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
    );
  }
}

export default ModalForm;
