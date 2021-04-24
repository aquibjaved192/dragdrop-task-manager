import React, { useEffect, useState } from 'react';
import Column from './column';
import AddModal from './addModal';
import './App.css';

function App() {
 const [modalOpen, setModalOpen] = useState(false);
 const [columns, setColumns] = useState([]);

 useEffect(() => {
  const columns = JSON.parse(localStorage.getItem('columns'));
  if (columns) {
   setColumns(columns);
  } else {
   localStorage.setItem('columns', JSON.stringify([]));
  }
 }, []);

 const addColumn = (column) => {
  const newColumn = { ...column, id: Date.now(), tasks: [] };
  const newColumnsArray = [...columns, newColumn];
  setColumns(newColumnsArray);
  localStorage.setItem('columns', JSON.stringify(newColumnsArray));
 };

 const deleteColumn = (id) => {
  const currentColumns = [...columns];
  const index = currentColumns.findIndex((item) => item.id === id);
  currentColumns.splice(index, 1);
  setColumns(currentColumns);
  localStorage.setItem('columns', JSON.stringify(currentColumns));
 };

 const onDragDrop = (data) => {
  const currentColumns = [...columns];
  currentColumns[data.source.columnIndex]['tasks'].splice(
   data.source.taskIndex,
   1
  );
  currentColumns[data.target.columnIndex]['tasks'].splice(
   data.target.taskIndex,
   0,
   data.source.data
  );
  setColumns(currentColumns);
  localStorage.setItem('columns', JSON.stringify(currentColumns));
 };

 return (
  <div className="App">
   {modalOpen && (
    <AddModal
     isOpen={modalOpen}
     closeModal={setModalOpen}
     title="Add Column"
     modalName="column"
     add={addColumn}
    />
   )}
   <div className="add-col-container">
    <button className="add-col-btn" onClick={() => setModalOpen(true)}>
     <span className="add">+</span>
     <span>Add Column</span>
    </button>
   </div>
   <div className="columns-container">
    {columns.map((item, index) => {
     return (
      <Column
       key={item.id}
       data={item}
       columns={columns}
       setColumns={setColumns}
       deleteColumn={deleteColumn}
       onDragDrop={onDragDrop}
       colIndex={index}
      />
     );
    })}
   </div>
  </div>
 );
}

export default App;
