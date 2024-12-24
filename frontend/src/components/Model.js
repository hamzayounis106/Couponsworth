import React from 'react';
import Modal from 'react-modal';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import './Modal.css'; // For custom styling of the modal

Modal.setAppElement('#root'); // for accessibility

const CustomModal = ({ isOpen, onRequestClose, onConfirm, onCancel, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2 className="modal-title">Confirm Deletion</h2>
      </div>
      <div className="modal-body">
        <p>{message}</p>
      </div>
      <div className="modal-actions">
        <button
          className="modal-button modal-confirm"
          onClick={() => {
            onConfirm();
            onRequestClose();
          }}
        >
          <AiOutlineCheck className="icon" /> Confirm
        </button>
        <button
          className="modal-button modal-cancel"
          onClick={() => {
            onCancel();
            onRequestClose();
          }}
        >
          <AiOutlineClose className="icon" /> Cancel
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;
