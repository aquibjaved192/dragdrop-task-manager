import React, { useState } from 'react';
import AddModal from './addModal';
import './App.css';

function Task(props) {
 const { task, columns, setColumns, columnId } = props;
 const [modalTitle, setModalTitle] = useState('');
 const [modalOpen, setModalOpen] = useState(false);

 const editTask = (task, colId, toDelete) => {
  for (let i = 0; i < columns.length; i++) {
   if (columns[i].id === colId) {
    for (let j = 0; j < columns[i].tasks.length; j++) {
     if (columns[i].tasks[j].id === task.id) {
      if (toDelete) {
       columns[i].tasks.splice(j, 1);
      } else {
       columns[i].tasks[j] = task;
      }
      break;
     }
    }
   }
  }
  setColumns([...columns]);
  localStorage.setItem('columns', JSON.stringify([...columns]));
 };

 return (
  <div className="task-container">
   {modalOpen && (
    <AddModal
     isOpen={modalOpen}
     closeModal={setModalOpen}
     title={modalTitle}
     modalName="task"
     task={task}
     add={editTask}
     columnId={columnId}
    />
   )}
   <h5>{task.name}</h5>
   <p>{task.description}</p>
   <div>
    <button
     onClick={() => {
      setModalOpen(true);
      setModalTitle('Edit Task');
     }}
    >
     Edit
    </button>
    <button
     onClick={() => {
      setModalOpen(true);
      setModalTitle('Delete Task');
     }}
    >
     Delete
    </button>
   </div>
  </div>
 );
}

export default Task;
