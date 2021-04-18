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
    {columns.map((item) => {
     return (
      <Column
       key={item.id}
       data={item}
       columns={columns}
       setColumns={setColumns}
      />
     );
    })}
   </div>
  </div>
 );
}

export default App;
