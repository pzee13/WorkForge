// Modal.js
import Modal from 'react-modal';
import "./CustomModal.css";
import { CustomModalProps } from '../../../types/signup/modal/modalPropType';

Modal.setAppElement("body");

export function CustomModal(CustomModalProps:CustomModalProps){
  return (
    <Modal
      isOpen={CustomModalProps.isOpen}
      onRequestClose={CustomModalProps.onRequestClose}
      contentLabel="Example Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div>{CustomModalProps.children}</div>
    </Modal>
  );
}
