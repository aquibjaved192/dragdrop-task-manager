import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-drag-and-drop';
import AddModal from './addModal';
import Task from './task';
import './App.css';

function Column(props) {
 const {
  data,
  columns,
  setColumns,
  deleteColumn,
  onDragDrop,
  colIndex,
 } = props;
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
   <div className="col-title-container">
    <div className="col-title">
     <h4>{data.name}</h4>
     <h2 onClick={() => deleteColumn(data.id)}>&times;</h2>
    </div>
    <button className="add-task-btn" onClick={() => setModalOpen(true)}>
     <span className="add">+</span>
     <span>Task</span>
    </button>
   </div>
   <div className="tasks">
    {data.tasks.map((item, index) => (
     <Droppable
      id={item.id}
      key={item.id}
      types={['task']} // <= allowed drop types
      onDrop={(dropData) => {
       const newDropData = JSON.parse(dropData.task);
       newDropData.target = { columnIndex: colIndex, taskIndex: index };
       onDragDrop(newDropData);
      }}
     >
      {' '}
      <Draggable
       type="task"
       data={JSON.stringify({
        source: {
         columnIndex: colIndex,
         taskIndex: index,
         data: item,
        },
       })}
      >
       <Task
        task={item}
        columns={columns}
        setColumns={setColumns}
        columnId={data.id}
       />
      </Draggable>
     </Droppable>
    ))}
    <Droppable
     types={['task']} // <= allowed drop types
     onDrop={(dropData) => {
      const newDropData = JSON.parse(dropData.task);
      newDropData.target = {
       columnIndex: colIndex,
       taskIndex: data.tasks.length,
      };
      onDragDrop(newDropData);
     }}
     style={{
      minHeight: '100px',
      height: `calc(66vh - ${100 * data.tasks.length}px)`,
     }}
    />
   </div>
  </div>
 );
}

export default Column;
