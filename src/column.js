import React, { useState } from 'react';
import AddModal from './addModal';
import Task from './task';
import './App.css';

function Column(props) {
 const { data, columns, setColumns } = props;
 const [modalOpen, setModalOpen] = useState(false);

 const addTask = (task, id) => {
  columns.forEach((item) => {
   if (item.id === id) {
    item.tasks.push(task);
   }
  });
  setColumns(columns);
  localStorage.setItem('columns', JSON.stringify(columns));
 };

 return (
  <div className="column">
   {modalOpen && (
    <AddModal
     isOpen={modalOpen}
     closeModal={setModalOpen}
     title="Add Task"
     modalName="task"
     columnId={data.id}
     add={addTask}
    />
   )}
   <div className="col-title">
    <h4>{data.name}</h4>
    <button className="add-task-btn" onClick={() => setModalOpen(true)}>
     <span className="add">+</span>
     <span>Task</span>
    </button>
   </div>
   <div className="tasks">
    {data.tasks.map((item) => (
     <Task
      key={item.id}
      task={item}
      columns={columns}
      setColumns={setColumns}
      columnId={data.id}
     />
    ))}
   </div>
  </div>
 );
}

export default Column;
