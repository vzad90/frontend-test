import React from "react"
import type { DeleteConfirmModalProps } from "../types/component.types"
import Modal from "./Modal"

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-container">
        <h2 className="modal-title danger-title">Delete Movie</h2>
        <p className="modal-description">
          Are you sure you want to delete this movie?
        </p>
        <div className="modal-actions">
          <button className="secondary" onClick={onClose}>Cancel</button>
          <button className="danger" onClick={onConfirm}>OK</button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteConfirmModal
