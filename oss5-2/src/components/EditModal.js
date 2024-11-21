import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export function EditModal({ showModal, handleCloseModal, currentParcel, handleInputChange, saveChanges }) {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>기존 택배 정보 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
            
          {['tracking_number', 'sender_name', 'recipient_name', 'recipient_address', 'cost'].map((field) => (
            <div className="mb-3" key={field}>
              <label className="form-label">{field}</label>
              <input
                type="text"
                className="form-control"
                name={field}
                value={currentParcel[field] || ''}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>취소</Button>
        <Button variant="danger" onClick={saveChanges}>저장</Button>
      </Modal.Footer>
    </Modal>
  );
}