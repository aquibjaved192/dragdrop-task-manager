import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
 content: {
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
  padding: '0 !important',
  boxShadow:
   '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)',
 },
};

Modal.setAppElement('#root');

function AddModal(props) {
 const { isOpen, closeModal, title, modalName, add, task } = props;
 const [name, setName] = useState(task ? task.name : '');
 const [description, setDesc] = useState(task ? task.description : '');

 const handleSubmitColumn = () => {
  const data = { name };
  if (name) {
   add(data);
  }
  closeModal(false);
 };

 const handleSubmitTask = (toDelete = false) => {
  const data = { name, description };
  if (task) {
   data.id = task.id;
  } else {
   data.id = Date.now();
  }
  const { columnId } = props;
  if (name && description) {
   add(data, columnId, toDelete);
  }
  closeModal(false);
 };

 return (
  <Modal
   isOpen={isOpen}
   onRequestClose={() => closeModal(false)}
   style={customStyles}
  >
   <div className="modal-container">
    <h4 className="modal-title">{title}</h4>
    {title !== 'Delete Task' && (
     <div className="modal-form">
      <input
       type="text"
       placeholder="Enter Name"
       onChange={(e) => setName(e.target.value)}
       value={name}
      />
      {modalName === 'task' && (
       <input
        type="text"
        placeholder="Enter description"
        onChange={(e) => setDesc(e.target.value)}
        value={description}
       />
      )}
     </div>
    )}
    {title !== 'Delete Task' && (
     <div className="modal-btn-container">
      <button
       className="modal-btn"
       onClick={() => {
        modalName === 'task' ? handleSubmitTask() : handleSubmitColumn();
       }}
      >
       Done
      </button>
     </div>
    )}
    {title === 'Delete Task' && (
     <>
      <div className="modal-form">Are you sure you want to delete {name}?</div>
      <div className="modal-btn-container">
       <button className="modal-btn" onClick={() => handleSubmitTask(true)}>
        Yes
       </button>
       <button className="modal-btn" onClick={() => closeModal(false)}>
        Cancel
       </button>
      </div>
     </>
    )}
   </div>
  </Modal>
 );
}

export default AddModal;
