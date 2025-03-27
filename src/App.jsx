import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
})

function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('') // input
  const [editingId, setEditingId] = useState([])
  const [editText, setEditText] = useState('')

  useEffect(() => {
    instance.get('/todos?_limit=10')
      .then((res) => setTodos(res.data))
      .catch(err => console.error('Error fetching todos', err))
  }, [])

  const handlePost = () => {
    if (!text.trim()) return
    instance.post('/todos', { title: text, completed: false, userId: 1 })
      .then((res) => {
        setTodos([...todos, res.data])
        setText('')
      })
      .catch(err => console.error('Error adding todo', err))
  }

  const remove = (id) => {
    instance.delete(`/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id))
      })
      .catch(err => console.error('Error deleting todo', err))
  }

  const toggleComplete = ({ id, completed }) => {
    instance.patch(`/todos/${id}`, { completed: !completed })
      .then(() => {
        setTodos(todos.map(todo => 
          todo.id === id ? { ...todo, completed: !completed } : todo
        ))
      })
      .catch(err => console.error('Error updating todo:', err))
  }

  const startEditing = (todo) => {
    setEditingId(todo.id)
    setEditText(todo.title)
  }

  const saveEdit = (id) => {
    if (!editText.trim()) return
    instance.patch(`/todos/${id}`, { title: editText })
      .then(() => {
        setTodos(todos.map(todo => 
          todo.id === id ? { ...todo, title: editText } : todo
        ))
        setEditingId(null)
      })
      .catch(err => console.error('Error updating todo:', err))
  }

  return (
    <section className='todo-app'>
      <div className="input-container">
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder="Add new todo"
          onKeyPress={(e) => e.key === 'Enter' && handlePost()}
        />
        <button className='add-btn' onClick={handlePost}>Add</button>
      </div>
      
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo)} 
              className="todo-checkbox"
            />
            
            {editingId === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => saveEdit(todo.id)}
                onKeyPress={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                autoFocus
                className="edit-input"
              />
            ) : (
              <span  className="todo-text" onDoubleClick={() => startEditing(todo)}>
                {todo.title}
              </span>
            )}
            
            <button  onClick={() => remove(todo.id)} className="delete-btn"> Delete </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default App