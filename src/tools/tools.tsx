import React from 'react'


const Tools = ({editingId, todos, editText, text, setText,     saveEdit, handleAdd, toggleComplete, startEditing, remove}) => {
  return (
    <>
    <div className="input-container">
    <input  value={text}  onChange={(e) => setText(e.target.value)} placeholder="Add new todo" onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
    />
    <button className='add-btn' onClick={handleAdd}>Add</button>
  </div>
  
  <ul className="todo-list">
    {todos.map((todo) => (
      <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
        <input  className="todo-checkbox" type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)}  />
        
        {editingId === todo.id ? (
          <input  className="edit-input" type="text" value={editText} onChange={(e) => setEditText(e.target.value)} onBlur={() => saveEdit(todo.id)} onKeyPress={(e) => e.key === 'Enter' && saveEdit(todo.id)} autoFocus/>
        ) : (
          <span className="todo-text" onDoubleClick={() => startEditing(todo)}>
            {todo.title}
          </span>
        )}
        
        <button onClick={() => remove(todo.id)} className="delete-btn">Delete</button>
      </li>
    ))}
  </ul>
  </>
  )
}

export default Tools
